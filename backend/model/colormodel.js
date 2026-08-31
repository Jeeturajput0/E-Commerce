const mongoose = require("mongoose");
module.exports = mongoose.model("Color", new mongoose.Schema({ name: { type: String, required: true, trim: true }, hexCode: { type: String, default: "#000000" }, isActive: { type: Boolean, default: true } }, { timestamps: true }));
