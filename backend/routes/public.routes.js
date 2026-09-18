const router = require("express").Router();
const product = require("../controller/productController");
const order = require("../controller/orderController");
const store = require("../controller/storeController");
const { protect, optionalAuth, validateObjectId } = require("../middleware/authMiddleware");
const Category = require("../model/categorymodel");
const Brand = require("../model/brandmodel");
const { Banner, Offer, Coupon } = require("../model/mastermodels");

// Products (search/filter/sort/pagination via query params)
router.get("/products", product.publicList);
router.get("/products/:id", product.publicOne);

// Catalog data
router.get("/categories", async (req, res) => {
  try {
    const filter = req.query.activeOnly === "false" ? {} : { isActive: true };
    const categories = await Category.find(filter).sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load categories", error: error.message });
  }
});
router.get("/categories/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load category", error: error.message });
  }
});
router.get("/brands", async (req, res) => {
  try {
    res.json({ success: true, data: await Brand.find({ isActive: true }).sort({ name: 1 }) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load brands", error: error.message });
  }
});
router.get("/banners", async (req, res) => {
  try {
    res.json({ success: true, data: await Banner.find({ isActive: true }).sort({ createdAt: -1 }) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load banners", error: error.message });
  }
});
router.get("/offers", async (req, res) => {
  try {
    res.json({ success: true, data: await Offer.find({ isActive: true }).sort({ createdAt: -1 }) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load offers", error: error.message });
  }
});
router.get("/coupons/active", async (req, res) => {
  try {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      $or: [{ expiryDate: { $gte: now } }, { expiryDate: { $exists: false } }, { expiryDate: null }],
    }).select("code description discountType discountValue minimumAmount maximumDiscount expiryDate");
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load coupons", error: error.message });
  }
});

// Checkout (order verified server-side; optional auth links order to user)
router.post("/orders", optionalAuth, order.createOrder);
router.post("/coupons/validate", store.validateCoupon);

// Reviews
router.get("/products/:productId/reviews", store.getProductReviews);
router.post("/reviews", protect, store.createReview);

// Customer order history (authenticated)
router.get("/user/orders", protect, order.getUserOrders);
router.get("/user/orders/:id", protect, validateObjectId("id"), order.getUserOrder);
router.put("/user/orders/:id/cancel", protect, validateObjectId("id"), order.cancelUserOrder);

// Wishlist (authenticated, backend-persisted)
router.get("/wishlist", protect, store.getWishlist);
router.post("/wishlist", protect, store.addToWishlist);
router.get("/wishlist/check/:productId", protect, store.checkWishlist);
router.delete("/wishlist/:productId", protect, store.removeFromWishlist);

module.exports = router;
