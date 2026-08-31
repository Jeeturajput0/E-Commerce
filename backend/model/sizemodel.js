const mongoose = require("mongoose");
module.exports = mongoose.model("Size", new mongoose.Schema({ name: { type: String, required: true, trim: true }, categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] }, { timestamps: true }));
