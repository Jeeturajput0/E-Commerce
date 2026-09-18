const mongoose = require("mongoose");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    imageFileId: { type: String, default: "" },
    imageFilePath: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.pre("validate", function () {
  if (!this.slug && this.name) this.slug = slugify(this.name);
});

module.exports = mongoose.model("Category", categorySchema);
