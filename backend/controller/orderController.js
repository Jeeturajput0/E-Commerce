const Order = require("../model/ordermodel");

exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerMobile, shippingAddress, items, totalAmount, paymentMethod } = req.body;

    if (!customerName || !customerMobile || !shippingAddress || !items || !items.length) {
      return res.status(400).json({ success: false, message: "Required order fields missing" });
    }

    const order = await Order.create({
      user: req.user ? req.user.userId : null,
      customerName,
      customerEmail: customerEmail || "",
      customerMobile,
      shippingAddress,
      items,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "Pending",
      status: "Pending",
    });

    res.status(201).json({ success: true, message: "Order placed successfully", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not place order", error: error.message });
  }
};

exports.getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("user", "name email mobile");
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch orders", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update order", error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch user orders", error: error.message });
  }
};

