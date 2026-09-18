const mongoose = require("mongoose");
const Order = require("../model/ordermodel");
const Product = require("../model/productmodel");
const { Coupon } = require("../model/mastermodels");
const { getPagination, paginatedResponse } = require("../utils/helpers");

const VALID_TRANSITIONS = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Processing", "Cancelled"],
  Processing: ["Shipped", "Cancelled"],
  Shipped: ["Delivered", "Returned"],
  Delivered: ["Returned"],
  Cancelled: [],
  Returned: [],
};

const CUSTOMER_CANCELLABLE = ["Pending", "Confirmed"];

// Server-side coupon calculation (never trust frontend totals)
async function applyCoupon(code, subtotal) {
  if (!code) return { discount: 0, coupon: null };
  const coupon = await Coupon.findOne({ code: String(code).toUpperCase().trim() });
  if (!coupon || !coupon.isActive) throw new Error("Invalid coupon code");
  if (coupon.expiryDate && coupon.expiryDate < new Date()) throw new Error("Coupon has expired");
  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) throw new Error("Coupon usage limit reached");
  if (coupon.minimumAmount > 0 && subtotal < coupon.minimumAmount) {
    throw new Error(`Minimum order amount for this coupon is ${coupon.minimumAmount}`);
  }
  let discount = coupon.discountType === "percentage" ? (subtotal * coupon.discountValue) / 100 : coupon.discountValue;
  if (coupon.maximumDiscount > 0) discount = Math.min(discount, coupon.maximumDiscount);
  discount = Math.min(discount, subtotal);
  return { discount: Math.round(discount * 100) / 100, coupon };
}

exports.applyCoupon = applyCoupon;

// POST /api/orders (authenticated customers; guest checkout also allowed)
exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerMobile, shippingAddress, items, paymentMethod, couponCode } = req.body;
    if (!customerName || !customerMobile || !shippingAddress || !items || !items.length) {
      return res.status(400).json({ success: false, message: "Required order fields missing" });
    }
    if (items.length > 50) return res.status(400).json({ success: false, message: "Too many items in order" });

    // Verify every product from DB: price, stock, vendor — never trust client
    let subtotal = 0;
    const orderItems = [];
    const vendorIds = new Set();
    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({ success: false, message: "Invalid product in order" });
      }
      const product = await Product.findOne({ _id: item.product, approvalStatus: "approved", isActive: true });
      if (!product) return res.status(400).json({ success: false, message: `Product not available: ${item.name || item.product}` });
      const qty = Math.max(1, Math.min(100, parseInt(item.quantity, 10) || 1));
      if (product.stock < qty) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name} (only ${product.stock} left)` });
      }
      const price = product.saleprice;
      subtotal += price * qty;
      vendorIds.add(String(product.vendor));
      orderItems.push({
        product: product._id,
        vendor: product.vendor,
        name: product.name,
        image: product.image || (product.images[0] && product.images[0].url) || "",
        price,
        quantity: qty,
        size: item.size || "",
        color: item.color || "",
        variant: item.variant || null,
      });
    }

    let discount = 0;
    let coupon = null;
    try {
      const result = await applyCoupon(couponCode, subtotal);
      discount = result.discount;
      coupon = result.coupon;
    } catch (e) {
      if (couponCode) return res.status(400).json({ success: false, message: e.message });
    }

    const shippingCharge = subtotal - discount >= 999 || subtotal - discount <= 0 ? 0 : 49;
    const total = Math.max(0, Math.round((subtotal - discount + shippingCharge) * 100) / 100);

    const order = await Order.create({
      user: req.user ? req.user.userId : null,
      customerName,
      customerEmail: customerEmail || "",
      customerMobile,
      shippingAddress,
      items: orderItems,
      vendors: [...vendorIds],
      subtotal,
      discount,
      shippingCharge,
      total,
      totalAmount: total,
      coupon: coupon ? coupon.code : "",
      paymentMethod: ["COD", "UPI", "Card", "NetBanking", "Wallet"].includes(paymentMethod) ? paymentMethod : "COD",
      paymentStatus: "Pending",
      status: "Pending",
      statusHistory: [{ status: "Pending", at: new Date() }],
    });

    // Decrement stock + increment sold
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity, quantity: -item.quantity, sold: item.quantity } });
    }
    if (coupon) await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });

    res.status(201).json({ success: true, message: "Order placed successfully", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not place order", error: error.message });
  }
};

const orderPopulate = [
  { path: "items.product", select: "name slug images image saleprice" },
  { path: "user", select: "name email mobile" },
  { path: "vendors", select: "name storeName email" },
];

exports.getAdminOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const { page, limit, skip } = getPagination(req.query, { page: 1, limit: 20 });
    const [total, orders] = await Promise.all([
      Order.countDocuments(filter),
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate(orderPopulate),
    ]);
    res.json({ success: true, data: orders, ...paginatedResponse(orders, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch orders", error: error.message });
  }
};

exports.getAdminOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(orderPopulate);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid order", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (status) {
      if (!VALID_TRANSITIONS[order.status]?.includes(status)) {
        return res.status(400).json({ success: false, message: `Cannot change status from ${order.status} to ${status}` });
      }
      order.status = status;
      order.statusHistory.push({ status, at: new Date(), note: req.body.note || "" });
      if (status === "Cancelled") {
        for (const item of order.items) {
          if (item.product) await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity, quantity: item.quantity, sold: -item.quantity } });
        }
      }
    }
    if (paymentStatus) {
      if (!["Pending", "Paid", "Failed"].includes(paymentStatus)) {
        return res.status(400).json({ success: false, message: "Invalid payment status" });
      }
      order.paymentStatus = paymentStatus;
    }
    await order.save();
    res.json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update order", error: error.message });
  }
};

// Vendor: only orders containing their products
exports.getVendorOrders = async (req, res) => {
  try {
    const filter = { vendors: req.user.userId };
    if (req.query.status) filter.status = req.query.status;
    const { page, limit, skip } = getPagination(req.query, { page: 1, limit: 20 });
    const [total, orders] = await Promise.all([
      Order.countDocuments(filter),
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate(orderPopulate),
    ]);
    // Shape vendor view: only their items + their subtotal
    const shaped = orders.map((o) => {
      const obj = o.toObject();
      obj.items = obj.items.filter((i) => String(i.vendor) === String(req.user.userId));
      obj.vendorSubtotal = obj.items.reduce((s, i) => s + i.price * i.quantity, 0);
      return obj;
    });
    res.json({ success: true, data: shaped, ...paginatedResponse(shaped, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch orders", error: error.message });
  }
};

exports.updateVendorOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOne({ _id: req.params.id, vendors: req.user.userId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (!VALID_TRANSITIONS[order.status]?.includes(status)) {
      return res.status(400).json({ success: false, message: `Cannot change status from ${order.status} to ${status}` });
    }
    order.status = status;
    order.statusHistory.push({ status, at: new Date(), note: req.body.note || "" });
    await order.save();
    res.json({ success: true, message: "Order status updated", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update order", error: error.message });
  }
};

// Customer: own orders only
exports.getUserOrders = async (req, res) => {
  try {
    const filter = { user: req.user.userId };
    if (req.query.status) filter.status = req.query.status;
    const { page, limit, skip } = getPagination(req.query, { page: 1, limit: 20 });
    const [total, orders] = await Promise.all([
      Order.countDocuments(filter),
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("items.product", "name slug images image saleprice"),
    ]);
    res.json({ success: true, data: orders, ...paginatedResponse(orders, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch orders", error: error.message });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.userId }).populate("items.product", "name slug images image saleprice");
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid order", error: error.message });
  }
};

exports.cancelUserOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.userId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (!CUSTOMER_CANCELLABLE.includes(order.status)) {
      return res.status(400).json({ success: false, message: `Order cannot be cancelled in ${order.status} status` });
    }
    order.status = "Cancelled";
    order.statusHistory.push({ status: "Cancelled", at: new Date(), note: "Cancelled by customer" });
    await order.save();
    for (const item of order.items) {
      if (item.product) await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity, quantity: item.quantity, sold: -item.quantity } });
    }
    res.json({ success: true, message: "Order cancelled", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not cancel order", error: error.message });
  }
};
