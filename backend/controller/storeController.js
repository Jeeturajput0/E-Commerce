const mongoose = require("mongoose");
const Product = require("../model/productmodel");
const Order = require("../model/ordermodel");
const { Review, Coupon, Wishlist } = require("../model/mastermodels");
const { applyCoupon } = require("./orderController");
const { getPagination, paginatedResponse } = require("../utils/helpers");

// ---------- Coupons ----------
exports.validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Coupon code is required" });
    const { discount, coupon } = await applyCoupon(code, Number(subtotal) || 0);
    res.json({ success: true, message: "Coupon applied", data: { code: coupon.code, discount, discountType: coupon.discountType, discountValue: coupon.discountValue } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ---------- Reviews ----------
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ success: false, message: "Invalid product" });
    const r = Number(rating);
    if (!r || r < 1 || r > 5) return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    // Only customers who purchased the product can review
    const purchased = await Order.exists({ user: req.user.userId, "items.product": productId, status: { $in: ["Delivered", "Shipped", "Processing", "Confirmed"] } });
    if (!purchased) {
      return res.status(403).json({ success: false, message: "You can only review products you have purchased" });
    }
    const review = await Review.findOneAndUpdate(
      { product: productId, customer: req.user.userId },
      { rating: r, comment: comment || "", isActive: true },
      { new: true, upsert: true, runValidators: true }
    );
    // Recompute product aggregate
    const agg = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId), isActive: true } },
      { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    await Product.findByIdAndUpdate(productId, {
      rating: agg[0] ? Math.round(agg[0].avg * 10) / 10 : 0,
      reviewCount: agg[0] ? agg[0].count : 0,
    });
    res.status(201).json({ success: true, message: "Review submitted", data: review });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: "You have already reviewed this product" });
    res.status(500).json({ success: false, message: "Could not submit review", error: error.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query, { page: 1, limit: 10 });
    const [total, reviews] = await Promise.all([
      Review.countDocuments({ product: req.params.productId, isActive: true }),
      Review.find({ product: req.params.productId, isActive: true })
        .sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate("customer", "name avatar"),
    ]);
    res.json({ success: true, data: reviews, ...paginatedResponse(reviews, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load reviews", error: error.message });
  }
};

exports.getVendorReviews = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.userId }).select("_id");
    const ids = products.map((p) => p._id);
    const { page, limit, skip } = getPagination(req.query, { page: 1, limit: 20 });
    const [total, reviews] = await Promise.all([
      Review.countDocuments({ product: { $in: ids } }),
      Review.find({ product: { $in: ids } }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate("product", "name images image").populate("customer", "name"),
    ]);
    res.json({ success: true, data: reviews, ...paginatedResponse(reviews, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load reviews", error: error.message });
  }
};

// ---------- Wishlist (backend-persisted) ----------
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.userId }).populate({
      path: "products",
      match: { isActive: true },
      populate: { path: "category", select: "name slug" },
    });
    res.json({ success: true, data: wishlist?.products || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load wishlist", error: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const productId = req.params.productId || req.body.productId;
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ success: false, message: "Invalid product" });
    const exists = await Product.exists({ _id: productId });
    if (!exists) return res.status(404).json({ success: false, message: "Product not found" });
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true }
    ).populate("products");
    res.json({ success: true, message: "Added to wishlist", data: wishlist.products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update wishlist", error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.userId },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");
    res.json({ success: true, message: "Removed from wishlist", data: wishlist?.products || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update wishlist", error: error.message });
  }
};

exports.checkWishlist = async (req, res) => {
  try {
    const wishlisted = await Wishlist.exists({ user: req.user.userId, products: req.params.productId });
    res.json({ success: true, data: { wishlisted: Boolean(wishlisted) } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not check wishlist", error: error.message });
  }
};
