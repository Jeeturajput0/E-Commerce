const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    fileId: { type: String, default: "" },
    filePath: { type: String, default: "" },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, default: "", trim: true },
    color: { type: String, default: "", trim: true },
    sku: { type: String, default: "", trim: true },
    price: { type: Number, min: 0 },
    stock: { type: Number, min: 0, default: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    details: { type: String, default: "" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: { type: String, default: "", trim: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", default: null },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    // Pricing
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    saleprice: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
    sku: { type: String, default: "", trim: true, index: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    quantity: { type: Number, min: 0, default: 0 },
    // Images (ImageKit). `image` kept for backward compatibility (thumbnail).
    images: { type: [imageSchema], default: [] },
    image: { type: String, default: "" },
    imageFileId: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    // Legacy single refs (kept optional) + flexible arrays
    size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", default: null },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", default: null },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    variants: { type: [variantSchema], default: [] },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    tags: { type: [String], default: [], index: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    sold: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    rejectionReason: { type: String, default: "" },
    approvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", tags: "text" });

productSchema.pre("validate", function () {
  if (this.saleprice > this.mrp) {
    this.invalidate("saleprice", "Sale price cannot exceed MRP");
  }
  const effective = this.discountPrice ?? this.saleprice;
  if (this.mrp > 0 && effective != null) {
    this.discountPercentage = Math.max(
      0,
      Math.min(100, Math.round(((this.mrp - effective) / this.mrp) * 100))
    );
  }
  if (this.quantity == null) this.quantity = this.stock;
  if (!this.price) this.price = this.saleprice;
  if (this.images && this.images.length) {
    this.image = this.image || this.images[0].url;
    this.thumbnail = this.thumbnail || this.images[0].url;
    if (!this.imageFileId && this.images[0].fileId) this.imageFileId = this.images[0].fileId;
  }
});

module.exports = mongoose.model("Product", productSchema);
