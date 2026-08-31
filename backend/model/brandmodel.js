const mongoose = require("mongoose");
module.exports = mongoose.model("Brand", new mongoose.Schema({ name: { type: String, required: true, unique: true, trim: true }, categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] }, { timestamps: true }));
