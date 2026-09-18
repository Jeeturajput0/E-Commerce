const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "", trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, default: "" },
    discountType: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
    discountValue: { type: Number, required: true, min: 0 },
    minimumAmount: { type: Number, default: 0, min: 0 },
    maximumDiscount: { type: Number, default: 0, min: 0 },
    expiryDate: { type: Date },
    usageLimit: { type: Number, default: 0, min: 0 },
    usedCount: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    discount: { type: Number, default: 0, min: 0 },
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    imageFileId: { type: String, default: "" },
    imageFilePath: { type: String, default: "" },
    link: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = {
  Review: mongoose.models.Review || mongoose.model("Review", reviewSchema),
  Coupon: mongoose.models.Coupon || mongoose.model("Coupon", couponSchema),
  Offer: mongoose.models.Offer || mongoose.model("Offer", offerSchema),
  Banner: mongoose.models.Banner || mongoose.model("Banner", bannerSchema),
  Wishlist: mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema),
};
