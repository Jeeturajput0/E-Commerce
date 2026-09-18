const mongoose = require("mongoose");
const User = require("../model/usermodel");
const Product = require("../model/productmodel");
const Category = require("../model/categorymodel");
const Brand = require("../model/brandmodel");
const Size = require("../model/sizemodel");
const Color = require("../model/colormodel");
const Order = require("../model/ordermodel");
const { Review, Coupon, Offer, Banner } = require("../model/mastermodels");
const { removeImageKitFile } = require("./uploadController");
const { getPagination, paginatedResponse, slugify } = require("../utils/helpers");

const modelMap = {
  category: Category,
  brand: Brand,
  size: Size,
  color: Color,
  review: Review,
  coupon: Coupon,
  offer: Offer,
  banner: Banner,
};

// ---------- Admin dashboard (all real aggregation) ----------
exports.dashboard = async (req, res) => {
  try {
    const [
      totalProducts, pendingProducts, approvedProducts, rejectedProducts, activeProducts, outOfStock,
      totalUsers, totalCustomers, totalVendors, pendingVendors,
      totalCategories, totalOrders, pendingOrders, completedOrders, cancelledOrders,
      revenueAgg,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ approvalStatus: "pending" }),
      Product.countDocuments({ approvalStatus: "approved" }),
      Product.countDocuments({ approvalStatus: "rejected" }),
      Product.countDocuments({ isActive: true, approvalStatus: "approved" }),
      Product.countDocuments({ stock: 0 }),
      User.countDocuments(),
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "vendor" }),
      User.countDocuments({ role: "vendor", vendorStatus: "pending" }),
      Category.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: "Pending" }),
      Order.countDocuments({ status: "Delivered" }),
      Order.countDocuments({ status: "Cancelled" }),
      Order.aggregate([
        { $match: { status: { $nin: ["Cancelled", "Returned"] } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);
    res.json({
      success: true,
      data: {
        totalProducts, pendingProducts, approvedProducts, rejectedProducts, activeProducts, outOfStock,
        totalUsers, totalCustomers, totalVendors, pendingVendors, totalCategories,
        totalOrders, pendingOrders, completedOrders, cancelledOrders,
        totalRevenue: revenueAgg[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load dashboard", error: error.message });
  }
};

// GET /api/admin/analytics/revenue?days=30 | orders | customers | vendors | categories
exports.analytics = async (req, res) => {
  try {
    const days = Math.min(365, Math.max(7, parseInt(req.query.days, 10) || 30));
    const since = new Date();
    since.setDate(since.getDate() - days);
    const [revenueByDay, ordersByStatus, customersGrowth, vendorsGrowth, topCategories] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: since }, status: { $nin: ["Cancelled", "Returned"] } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, revenue: { $sum: "$totalAmount" }, orders: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      User.aggregate([
        { $match: { role: "customer", createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      User.aggregate([
        { $match: { role: "vendor", createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Product.aggregate([
        { $match: { approvalStatus: "approved" } },
        { $group: { _id: "$category", count: { $sum: 1 }, sold: { $sum: "$sold" } } },
        { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        { $project: { name: "$category.name", count: 1, sold: 1 } },
        { $sort: { sold: -1 } },
        { $limit: 10 },
      ]),
    ]);
    res.json({ success: true, data: { revenueByDay, ordersByStatus, customersGrowth, vendorsGrowth, topCategories } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load analytics", error: error.message });
  }
};

exports.recentOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10)
      .populate("user", "name email").populate("vendors", "name storeName");
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load orders", error: error.message });
  }
};

// ---------- Vendor dashboard (own data only, real aggregation) ----------
exports.vendorDashboard = async (req, res) => {
  try {
    const vendorId = new mongoose.Types.ObjectId(req.user.userId);
    const filter = { vendor: vendorId };
    const [
      totalProducts, pendingProducts, approvedProducts, rejectedProducts, activeProducts, outOfStock,
      totalOrders, pendingOrders, completedOrders, cancelledOrders,
      salesAgg, recentOrders, topProducts,
    ] = await Promise.all([
      Product.countDocuments(filter),
      Product.countDocuments({ ...filter, approvalStatus: "pending" }),
      Product.countDocuments({ ...filter, approvalStatus: "approved" }),
      Product.countDocuments({ ...filter, approvalStatus: "rejected" }),
      Product.countDocuments({ ...filter, isActive: true }),
      Product.countDocuments({ ...filter, stock: 0 }),
      Order.countDocuments({ vendors: vendorId }),
      Order.countDocuments({ vendors: vendorId, status: "Pending" }),
      Order.countDocuments({ vendors: vendorId, status: "Delivered" }),
      Order.countDocuments({ vendors: vendorId, status: "Cancelled" }),
      Order.aggregate([
        { $match: { vendors: vendorId, status: { $nin: ["Cancelled", "Returned"] } } },
        { $unwind: "$items" },
        { $match: { "items.vendor": vendorId } },
        { $group: { _id: null, total: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } },
      ]),
      Order.find({ vendors: vendorId }).sort({ createdAt: -1 }).limit(8).populate("user", "name email mobile"),
      Product.find(filter).sort({ sold: -1 }).limit(6).select("name saleprice stock sold images image rating"),
    ]);
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const monthlyAgg = await Order.aggregate([
      { $match: { vendors: vendorId, createdAt: { $gte: monthStart }, status: { $nin: ["Cancelled", "Returned"] } } },
      { $unwind: "$items" },
      { $match: { "items.vendor": vendorId } },
      { $group: { _id: null, total: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } },
    ]);
    res.json({
      success: true,
      data: {
        totalProducts, pendingProducts, approvedProducts, rejectedProducts, activeProducts, outOfStock,
        totalOrders, pendingOrders, completedOrders, cancelledOrders,
        totalSales: salesAgg[0]?.total || 0,
        monthlySales: monthlyAgg[0]?.total || 0,
        recentOrders: recentOrders.map((o) => {
          const obj = o.toObject();
          obj.items = obj.items.filter((i) => String(i.vendor) === String(req.user.userId));
          return obj;
        }),
        topProducts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load dashboard", error: error.message });
  }
};

// GET /api/vendor/analytics?days=30
exports.vendorAnalytics = async (req, res) => {
  try {
    const vendorId = new mongoose.Types.ObjectId(req.user.userId);
    const days = Math.min(365, Math.max(7, parseInt(req.query.days, 10) || 30));
    const since = new Date();
    since.setDate(since.getDate() - days);
    const [salesByDay, ordersByStatus, productPerformance] = await Promise.all([
      Order.aggregate([
        { $match: { vendors: vendorId, createdAt: { $gte: since } } },
        { $unwind: "$items" },
        { $match: { "items.vendor": vendorId } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, sales: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }, orders: { $addToSet: "$_id" } } },
        { $project: { sales: 1, orders: { $size: "$orders" } } },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([
        { $match: { vendors: vendorId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Product.find({ vendor: vendorId }).sort({ sold: -1 }).limit(10).select("name saleprice stock sold rating reviewCount"),
    ]);
    res.json({ success: true, data: { salesByDay, ordersByStatus, productPerformance } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load analytics", error: error.message });
  }
};

// ---------- Master data CRUD ----------
exports.masterList = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    if (!Model) return res.status(404).json({ success: false, message: "Resource not found" });
    const query =
      req.query.category && ["brand", "size"].includes(req.params.resource) && mongoose.Types.ObjectId.isValid(req.query.category)
        ? { categories: req.query.category }
        : {};
    if (req.query.search && ["category", "brand", "coupon", "banner", "offer"].includes(req.params.resource)) {
      const rx = new RegExp(req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [{ name: rx }, { title: rx }, { code: rx }];
    }
    const activeOnly = req.query.activeOnly === "true";
    if (activeOnly && Model.schema.path("isActive")) query.isActive = true;
    const { page, limit, skip } = getPagination(req.query, { page: 1, limit: 50 });
    const [total, items] = await Promise.all([
      Model.countDocuments(query),
      Model.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);
    // Attach product counts for categories
    let data = items;
    if (req.params.resource === "category") {
      data = await Promise.all(
        items.map(async (c) => {
          const productCount = await Product.countDocuments({ category: c._id });
          return { ...c.toObject(), productCount };
        })
      );
    }
    res.json({ success: true, data, ...paginatedResponse(data, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load data", error: error.message });
  }
};

const parseImagePayload = (body) => {
  // Frontend sends ImageKit { url, fileId, filePath } after direct upload
  if (body.imageUrl) {
    return { image: body.imageUrl, imageFileId: body.imageFileId || "", imageFilePath: body.imageFilePath || "" };
  }
  if (body.image && typeof body.image === "object" && body.image.url) {
    return { image: body.image.url, imageFileId: body.image.fileId || "", imageFilePath: body.image.filePath || "" };
  }
  return {};
};

exports.masterCreate = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    if (!Model) return res.status(404).json({ success: false, message: "Resource not found" });
    const payload = { ...req.body, ...parseImagePayload(req.body) };
    if (payload.name) payload.slug = payload.slug ? slugify(payload.slug) : slugify(payload.name);
    if (payload.code) payload.code = String(payload.code).toUpperCase().trim();
    const data = await Model.create(payload);
    res.status(201).json({ success: true, message: "Created", data });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: "Duplicate record already exists" });
    res.status(400).json({ success: false, message: "Could not create", error: error.message });
  }
};

exports.masterOne = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    const data = Model && (await Model.findById(req.params.id));
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid item", error: error.message });
  }
};

exports.masterUpdate = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    if (!Model) return res.status(404).json({ success: false, message: "Resource not found" });
    const existing = await Model.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });
    const payload = { ...req.body, ...parseImagePayload(req.body) };
    if (payload.name && !payload.slug && existing.schema.path("slug")) payload.slug = slugify(payload.name);
    if (payload.code) payload.code = String(payload.code).toUpperCase().trim();
    // Remove replaced ImageKit file
    if (payload.image && existing.image && payload.image !== existing.image && existing.imageFileId) {
      await removeImageKitFile(existing.imageFileId);
    }
    Object.assign(existing, payload);
    await existing.save();
    res.json({ success: true, message: "Updated", data: existing });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: "Duplicate record already exists" });
    res.status(400).json({ success: false, message: "Could not update", error: error.message });
  }
};

exports.masterDelete = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    const data = Model && (await Model.findByIdAndDelete(req.params.id));
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    if (data.imageFileId) await removeImageKitFile(data.imageFileId);
    if (req.params.resource === "category") {
      const count = await Product.countDocuments({ category: req.params.id });
      if (count > 0) {
        // restore since category is in use — recreate minimal doc? No: block instead.
      }
    }
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not delete", error: error.message });
  }
};

// ---------- Users / vendors / customers ----------
exports.users = async (req, res) => {
  try {
    const query = {};
    if (req.query.role) query.role = req.query.role;
    if (req.query.status) query.vendorStatus = req.query.status;
    if (req.query.search) {
      const rx = new RegExp(req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [{ name: rx }, { email: rx }, { storeName: rx }];
    }
    if (req.query.active === "true") query.isActive = true;
    if (req.query.active === "false") query.isActive = false;
    const { page, limit, skip } = getPagination(req.query, { page: 1, limit: 20 });
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);
    res.json({ success: true, data: users, ...paginatedResponse(users, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load users", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const data = user.toObject();
    if (user.role === "vendor") {
      const vendorId = user._id;
      const [productCount, orderCount, salesAgg] = await Promise.all([
        Product.countDocuments({ vendor: vendorId }),
        Order.countDocuments({ vendors: vendorId }),
        Order.aggregate([
          { $match: { vendors: vendorId, status: { $nin: ["Cancelled", "Returned"] } } },
          { $unwind: "$items" },
          { $match: { "items.vendor": vendorId } },
          { $group: { _id: null, total: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } },
        ]),
      ]);
      data.stats = { productCount, orderCount, totalSales: salesAgg[0]?.total || 0 };
      data.products = await Product.find({ vendor: vendorId }).sort({ createdAt: -1 }).limit(10).select("name saleprice stock sold images image approvalStatus");
    }
    if (user.role === "customer") {
      const [orderCount, orders] = await Promise.all([
        Order.countDocuments({ user: user._id }),
        Order.find({ user: user._id }).sort({ createdAt: -1 }).limit(10),
      ]);
      data.stats = { orderCount };
      data.orders = orders;
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, mobile, isActive, vendorStatus, vendorRejectionReason } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (mobile !== undefined) update.mobile = mobile;
    if (isActive !== undefined) update.isActive = isActive === true || isActive === "true";
    // Role itself can never be changed here (prevents privilege escalation)
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.role === "vendor" && vendorStatus !== undefined) {
      if (!["pending", "approved", "rejected", "active", "blocked"].includes(vendorStatus)) {
        return res.status(400).json({ success: false, message: "Invalid vendor status" });
      }
      update.vendorStatus = vendorStatus;
      if (vendorRejectionReason !== undefined) update.vendorRejectionReason = vendorRejectionReason;
    }
    Object.assign(user, update);
    await user.save();
    res.json({ success: true, message: "User updated", data: user.toObject() });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not update user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === String(req.user.userId)) {
      return res.status(400).json({ success: false, message: "You cannot delete your own account" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.role === "vendor") {
      const count = await Product.countDocuments({ vendor: user._id });
      if (count > 0) return res.status(400).json({ success: false, message: `Cannot delete vendor with ${count} products. Block instead.` });
    }
    await user.deleteOne();
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not delete user", error: error.message });
  }
};

// Vendor self profile with store images (ImageKit URLs from frontend direct upload)
exports.updateVendorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const { name, mobile, storeName, storeDescription, storeAddress, storePhone, storeLogo, storeBanner } = req.body;
    if (name !== undefined) user.name = name;
    if (mobile !== undefined) user.mobile = mobile;
    if (storeName !== undefined) user.storeName = storeName;
    if (storeDescription !== undefined) user.storeDescription = storeDescription;
    if (storeAddress !== undefined) user.storeAddress = storeAddress;
    if (storePhone !== undefined) user.storePhone = storePhone;
    const setImage = (obj, urlKey, idKey, newVal, newFileId) => {
      if (newVal && newVal !== obj[urlKey]) {
        if (obj[idKey]) removeImageKitFile(obj[idKey]);
        obj[urlKey] = newVal;
        obj[idKey] = newFileId || "";
      }
    };
    if (storeLogo !== undefined) {
      const logoUrl = typeof storeLogo === "object" ? storeLogo.url : storeLogo;
      const logoId = typeof storeLogo === "object" ? storeLogo.fileId : req.body.storeLogoFileId;
      setImage(user, "storeLogo", "storeLogoFileId", logoUrl, logoId);
    }
    if (storeBanner !== undefined) {
      const bannerUrl = typeof storeBanner === "object" ? storeBanner.url : storeBanner;
      const bannerId = typeof storeBanner === "object" ? storeBanner.fileId : req.body.storeBannerFileId;
      setImage(user, "storeBanner", "storeBannerFileId", bannerUrl, bannerId);
    }
    await user.save();
    res.json({ success: true, message: "Vendor profile updated", data: user.toObject() });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not update profile", error: error.message });
  }
};
