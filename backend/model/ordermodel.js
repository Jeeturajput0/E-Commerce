const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    name: { type: String, required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    size: { type: String, default: "" },
    color: { type: String, default: "" },
    variant: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false }
);

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, trim: true, default: "" },
    customerMobile: { type: String, required: true, trim: true },
    shippingAddress: { type: mongoose.Schema.Types.Mixed, required: true },
    items: { type: [orderItemSchema], required: true, validate: [(v) => v.length > 0, "Order must have items"] },
    // Vendors involved (for fast vendor filtering)
    vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }],
    subtotal: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    shippingCharge: { type: Number, default: 0, min: 0 },
    total: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    coupon: { type: String, default: "", uppercase: true, trim: true },
    paymentMethod: { type: String, enum: ["COD", "UPI", "Card", "NetBanking", "Wallet"], default: "COD" },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    status: { type: String, enum: ORDER_STATUSES, default: "Pending", index: true },
    statusHistory: [
      {
        status: { type: String, enum: ORDER_STATUSES },
        at: { type: Date, default: Date.now },
        note: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.ORDER_STATUSES = ORDER_STATUSES;

module.exports = mongoose.model("Order", orderSchema);
