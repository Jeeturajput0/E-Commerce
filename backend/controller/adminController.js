const User = require("../model/usermodel");
const Product = require("../model/productmodel");
const Category = require("../model/categorymodel");
const Brand = require("../model/brandmodel");
const Size = require("../model/sizemodel");
const Color = require("../model/colormodel");
const { Review, Coupon, Offer, Banner } = require("../model/mastermodels");
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
exports.dashboard = async (req, res) => {
  try {
    const [
      totalProducts,
      pendingProducts,
      approvedProducts,
      rejectedProducts,
      totalUsers,
      totalVendors,
      totalCategories,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ approvalStatus: "pending" }),
      Product.countDocuments({ approvalStatus: "approved" }),
      Product.countDocuments({ approvalStatus: "rejected" }),
      User.countDocuments(),
      User.countDocuments({ role: "vendor" }),
      Category.countDocuments(),
    ]);
    res.json({
      success: true,
      data: {
        totalProducts,
        pendingProducts,
        approvedProducts,
        rejectedProducts,
        totalOrders: 0,
        pendingOrders: 0,
        totalUsers,
        totalVendors,
        totalCategories,
        totalRevenue: 0,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not load dashboard",
        error: error.message,
      });
  }
};
exports.vendorDashboard = async (req, res) => {
  try {
    const filter = { vendor: req.user.userId };
    const [totalProducts, pendingProducts, approvedProducts, rejectedProducts] =
      await Promise.all([
        Product.countDocuments(filter),
        Product.countDocuments({ ...filter, approvalStatus: "pending" }),
        Product.countDocuments({ ...filter, approvalStatus: "approved" }),
        Product.countDocuments({ ...filter, approvalStatus: "rejected" }),
      ]);
    res.json({
      success: true,
      data: {
        totalProducts,
        pendingProducts,
        approvedProducts,
        rejectedProducts,
        totalOrders: 0,
        totalSales: 0,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not load dashboard",
        error: error.message,
      });
  }
};
exports.masterList = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    if (!Model)
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });
    const query =
      req.query.category && ["brand", "size"].includes(req.params.resource)
        ? { categories: req.query.category }
        : {};
    res.json({
      success: true,
      data: await Model.find(query).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not load data",
        error: error.message,
      });
  }
};
exports.masterCreate = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    if (!Model)
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });
    res
      .status(201)
      .json({
        success: true,
        message: "Created",
        data: await Model.create(req.body),
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not create",
        error: error.message,
      });
  }
};
exports.masterOne = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    const data = Model && (await Model.findById(req.params.id));
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid item", error: error.message });
  }
};
exports.masterUpdate = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    const data =
      Model &&
      (await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }));
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Updated", data });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not update",
        error: error.message,
      });
  }
};
exports.masterDelete = async (req, res) => {
  try {
    const Model = modelMap[req.params.resource];
    const data = Model && (await Model.findByIdAndDelete(req.params.id));
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not delete",
        error: error.message,
      });
  }
};
exports.users = async (req, res) => {
  try {
    const query = req.query.role ? { role: req.query.role } : {};
    res.json({
      success: true,
      data: await User.find(query).select("-password").sort({ createdAt: -1 }),
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not load users",
        error: error.message,
      });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, email, mobile, isActive } = req.body;
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile, isActive },
      { new: true, runValidators: true },
    ).select("-password");
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User updated", data });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not update user",
        error: error.message,
      });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === String(req.user.userId))
      return res
        .status(400)
        .json({
          success: false,
          message: "You cannot delete your own account",
        });
    const data = await User.findByIdAndDelete(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not delete user",
        error: error.message,
      });
  }
};
