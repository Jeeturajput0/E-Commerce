const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  details: { type: String, default: "" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", default: null },
  size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", default: null },
  color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", default: null },
  mrp: { type: Number, required: true, min: 0 }, saleprice: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 }, image: { type: String, default: "" }, isActive: { type: Boolean, default: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  approvalStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  rejectionReason: { type: String, default: "" }, approvedAt: { type: Date, default: null },
}, { timestamps: true });
module.exports = mongoose.model("Product", productSchema);
