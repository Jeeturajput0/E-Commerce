const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, default: "Home", trim: true },
    fullName: { type: String, trim: true },
    phone: { type: String, trim: true },
    line1: { type: String, trim: true },
    line2: { type: String, default: "", trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, default: "India", trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true, timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    mobile: { type: String, default: "", trim: true },
    password: { type: String, required: true, select: false, minlength: 6 },
    role: {
      type: String,
      enum: ["admin", "vendor", "customer"],
      default: "customer",
    },
    isActive: { type: Boolean, default: true },
    // Vendor lifecycle: pending -> approved/active, rejected, blocked
    vendorStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected", "active", "blocked"],
      default: "none",
    },
    vendorRejectionReason: { type: String, default: "" },
    // Vendor store profile
    storeName: { type: String, default: "", trim: true },
    storeDescription: { type: String, default: "" },
    storeLogo: { type: String, default: "" },
    storeLogoFileId: { type: String, default: "" },
    storeBanner: { type: String, default: "" },
    storeBannerFileId: { type: String, default: "" },
    storeAddress: { type: String, default: "" },
    storePhone: { type: String, default: "" },
    avatar: { type: String, default: "" },
    avatarFileId: { type: String, default: "" },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
