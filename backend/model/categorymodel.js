const mongoose = require("mongoose");
module.exports = mongoose.model("Category", new mongoose.Schema({ name: { type: String, required: true, unique: true, trim: true }, image: { type: String, default: "" }, isActive: { type: Boolean, default: true } }, { timestamps: true }));
