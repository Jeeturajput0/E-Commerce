const mongoose = require("mongoose");
const Product = require("../model/productmodel");
const { removeImageKitFile } = require("./uploadController");
const { slugify, getPagination, paginatedResponse, parseStringArray } = require("../utils/helpers");

const POPULATE = "category brand vendor";
const PUBLIC_FILTER = { approvalStatus: "approved", isActive: true };

// ---- helpers ----
const toImageObjects = (body) => {
  // Accepts images as JSON array [{url,fileId,filePath}] or parallel arrays, or legacy single image
  let images = [];
  if (body.images) {
    try {
      images = typeof body.images === "string" ? JSON.parse(body.images) : body.images;
    } catch {
      images = [];
    }
  }
  if (!Array.isArray(images)) images = [];
  images = images
    .map((img) => {
      if (typeof img === "string") return { url: img };
      return { url: img.url, fileId: img.fileId || "", filePath: img.filePath || "" };
    })
    .filter((img) => img.url);
  if (!images.length && body.image) {
    images = [{ url: body.image, fileId: body.imageFileId || "", filePath: "" }];
  }
  return images;
};

const pickDefined = (obj) => {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) out[k] = v;
  });
  return out;
};

const numericOrUndefined = (v) => {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

const buildFields = (body, { allowStatus = false } = {}) => {
  const images = toImageObjects(body);
  const refOrNull = (v) => {
    if (v === undefined || v === null || v === "") return undefined; // don't wipe on partial update
    return mongoose.Types.ObjectId.isValid(v) ? v : null;
  };
  const fields = pickDefined({
    name: body.name,
    slug: body.slug ? slugify(body.slug) : body.name ? slugify(body.name) : undefined,
    description: body.description,
    shortDescription: body.shortDescription,
    details: body.details ?? body.description,
    category: body.category && mongoose.Types.ObjectId.isValid(body.category) ? body.category : undefined,
    subcategory: body.subcategory,
    brand: refOrNull(body.brand),
    size: refOrNull(body.size),
    color: refOrNull(body.color),
    price: numericOrUndefined(body.price ?? body.saleprice),
    mrp: numericOrUndefined(body.mrp),
    saleprice: numericOrUndefined(body.saleprice),
    discountPrice: numericOrUndefined(body.discountPrice),
    sku: body.sku,
    stock: numericOrUndefined(body.stock ?? body.quantity),
    quantity: numericOrUndefined(body.quantity ?? body.stock),
    sizes: body.sizes !== undefined ? parseStringArray(body.sizes) : undefined,
    colors: body.colors !== undefined ? parseStringArray(body.colors) : undefined,
    tags: body.tags !== undefined ? parseStringArray(body.tags) : undefined,
    specifications:
      body.specifications !== undefined
        ? typeof body.specifications === "string"
          ? (() => { try { return JSON.parse(body.specifications); } catch { return {}; } })()
          : body.specifications
        : undefined,
    isActive: body.isActive !== undefined ? body.isActive === true || body.isActive === "true" : undefined,
    featured: body.featured !== undefined ? body.featured === true || body.featured === "true" : undefined,
    thumbnail: body.thumbnail,
  });
  if (images.length) {
    fields.images = images;
    fields.image = images[0].url;
    fields.imageFileId = images[0].fileId || "";
    fields.thumbnail = body.thumbnail || images[0].url;
  } else if (body.image !== undefined && body.image !== "") {
    fields.image = body.image;
    fields.thumbnail = body.thumbnail || body.image;
  }
  if (body.variants !== undefined) {
    try {
      fields.variants = typeof body.variants === "string" ? JSON.parse(body.variants) : body.variants;
    } catch {
      fields.variants = [];
    }
  }
  if (allowStatus) {
    if (body.approvalStatus) fields.approvalStatus = body.approvalStatus;
    if (body.isActive !== undefined) fields.isActive = fields.isActive;
  }
  return fields;
};

const buildListQuery = (query, base = {}) => {
  const filter = { ...base };
  if (query.category) filter.category = query.category;
  if (query.vendor) filter.vendor = query.vendor;
  if (query.brand) filter.brand = query.brand;
  if (query.status) filter.approvalStatus = query.status;
  if (query.featured === "true") filter.featured = true;
  if (query.inStock === "true") filter.stock = { $gt: 0 };
  if (query.minPrice || query.maxPrice) {
    filter.saleprice = {};
    if (query.minPrice) filter.saleprice.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.saleprice.$lte = Number(query.maxPrice);
  }
  if (query.minRating) filter.rating = { $gte: Number(query.minRating) };
  if (query.size) filter.sizes = query.size;
  if (query.color) filter.colors = query.color;
  if (query.search) {
    const rx = new RegExp(String(query.search).trim().slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: rx }, { tags: rx }, { sku: rx }, { brand: rx }];
  }
  return filter;
};

const sortFor = (sort) => {
  switch (sort) {
    case "price-asc": return { saleprice: 1 };
    case "price-desc": return { saleprice: -1 };
    case "rating": return { rating: -1 };
    case "popular": return { sold: -1 };
    case "oldest": return { createdAt: 1 };
    default: return { createdAt: -1 };
  }
};

const paginatedList = async (filter, query) => {
  const { page, limit, skip } = getPagination(query);
  const [total, items] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).populate(POPULATE).sort(sortFor(query.sort)).skip(skip).limit(limit),
  ]);
  return { items, ...paginatedResponse(items, total, page, limit).pagination && { pagination: paginatedResponse(items, total, page, limit).pagination } };
};

// ---- public ----
exports.publicList = async (req, res) => {
  try {
    const filter = buildListQuery(req.query, { ...PUBLIC_FILTER });
    const { page, limit, skip } = getPagination(req.query);
    const [total, items] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).populate(POPULATE).sort(sortFor(req.query.sort)).skip(skip).limit(limit),
    ]);
    res.json({ success: true, data: items, ...paginatedResponse(items, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load products", error: error.message });
  }
};

exports.publicOne = async (req, res) => {
  try {
    const bySlug = req.query.slug === "true" || !mongoose.Types.ObjectId.isValid(req.params.id);
    const filter = bySlug
      ? { slug: req.params.id, ...PUBLIC_FILTER }
      : { _id: req.params.id, ...PUBLIC_FILTER };
    const data = await Product.findOne(filter).populate(POPULATE);
    if (!data) return res.status(404).json({ success: false, message: "Product not available" });
    res.json({ success: true, data });
  } catch {
    res.status(404).json({ success: false, message: "Product not available" });
  }
};

// ---- admin ----
exports.listAdmin = async (req, res) => {
  try {
    const filter = buildListQuery(req.query, {});
    const { page, limit, skip } = getPagination(req.query);
    const [total, items] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).populate(POPULATE).sort(sortFor(req.query.sort)).skip(skip).limit(limit),
    ]);
    res.json({ success: true, data: items, ...paginatedResponse(items, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load products", error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const fields = buildFields(req.body, { allowStatus: true });
    if (!fields.name || !fields.category || fields.mrp === undefined || fields.saleprice === undefined) {
      return res.status(400).json({ success: false, message: "Name, category, MRP and sale price are required" });
    }
    const data = await Product.create({
      ...fields,
      vendor: req.body.vendor && mongoose.Types.ObjectId.isValid(req.body.vendor) ? req.body.vendor : req.user.userId,
      approvalStatus: "approved",
      approvedAt: new Date(),
    });
    res.status(201).json({ success: true, message: "Product created", data: await data.populate(POPULATE) });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not create product", error: error.message });
  }
};

exports.adminProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate(POPULATE);
    if (!data) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid product", error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const payload = buildFields(req.body, { allowStatus: true });
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Product not found" });
    // Delete replaced ImageKit files
    if (payload.images) {
      const kept = new Set(payload.images.map((i) => i.fileId).filter(Boolean));
      for (const img of existing.images || []) {
        if (img.fileId && !kept.has(img.fileId)) await removeImageKitFile(img.fileId);
      }
    }
    Object.assign(existing, payload);
    await existing.save();
    res.json({ success: true, message: "Product updated", data: await existing.populate(POPULATE) });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not update product", error: error.message });
  }
};

exports.toggleActiveAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    product.isActive = !product.isActive;
    await product.save();
    res.json({ success: true, message: `Product ${product.isActive ? "activated" : "deactivated"}`, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not update product", error: error.message });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Product not found" });
    for (const img of data.images || []) await removeImageKitFile(img.fileId);
    if (data.imageFileId) await removeImageKitFile(data.imageFileId);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not delete product", error: error.message });
  }
};

exports.approve = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "approved", approvedAt: new Date(), rejectionReason: "" },
      { new: true }
    ).populate(POPULATE);
    if (!data) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product approved", data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not approve product", error: error.message });
  }
};

exports.reject = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "rejected", approvedAt: null, rejectionReason: req.body.reason || "No reason provided" },
      { new: true }
    ).populate(POPULATE);
    if (!data) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product rejected", data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not reject product", error: error.message });
  }
};

// ---- vendor (scoped to own products only) ----
const vendorFilter = (req, extra = {}) => ({ vendor: req.user.userId, ...extra });

exports.listVendor = async (req, res) => {
  try {
    const filter = buildListQuery(req.query, vendorFilter(req));
    const { page, limit, skip } = getPagination(req.query);
    const [total, items] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).populate(POPULATE).sort(sortFor(req.query.sort)).skip(skip).limit(limit),
    ]);
    res.json({ success: true, data: items, ...paginatedResponse(items, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load products", error: error.message });
  }
};

exports.vendorProduct = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id, vendor: req.user.userId }).populate(POPULATE);
    if (!data) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid product", error: error.message });
  }
};

exports.createVendor = async (req, res) => {
  try {
    const fields = buildFields(req.body);
    delete fields.isActive; // vendors cannot self-activate; keep default true
    if (!fields.name || !fields.category || fields.mrp === undefined || fields.saleprice === undefined) {
      return res.status(400).json({ success: false, message: "Name, category, MRP and sale price are required" });
    }
    const data = await Product.create({ ...fields, vendor: req.user.userId, approvalStatus: "pending" });
    res.status(201).json({ success: true, message: "Product submitted for approval", data: await data.populate(POPULATE) });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not create product", error: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendor: req.user.userId });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    const payload = buildFields(req.body);
    delete payload.isActive;
    delete payload.featured;
    if (payload.images) {
      const kept = new Set(payload.images.map((i) => i.fileId).filter(Boolean));
      for (const img of product.images || []) {
        if (img.fileId && !kept.has(img.fileId)) await removeImageKitFile(img.fileId);
      }
    }
    Object.assign(product, payload);
    if (product.approvalStatus === "approved") {
      product.approvalStatus = "pending";
      product.approvedAt = null;
    }
    await product.save();
    res.json({ success: true, message: "Product updated and submitted for approval", data: await product.populate(POPULATE) });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not update product", error: error.message });
  }
};

exports.removeVendor = async (req, res) => {
  try {
    const data = await Product.findOneAndDelete({ _id: req.params.id, vendor: req.user.userId });
    if (!data) return res.status(404).json({ success: false, message: "Product not found" });
    for (const img of data.images || []) await removeImageKitFile(img.fileId);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not delete product", error: error.message });
  }
};

exports.updateVendorStock = async (req, res) => {
  try {
    const stock = numericOrUndefined(req.body.stock ?? req.body.quantity);
    if (stock === undefined || stock < 0) {
      return res.status(400).json({ success: false, message: "Valid non-negative stock is required" });
    }
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, vendor: req.user.userId },
      { stock, quantity: stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Stock updated", data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not update stock", error: error.message });
  }
};

module.exports.paginatedList = paginatedList;
