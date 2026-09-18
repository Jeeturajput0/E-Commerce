const router = require("express").Router();
const { protect, role, activeVendor, validateObjectId } = require("../middleware/authMiddleware");
const product = require("../controller/productController");
const { vendorDashboard, vendorAnalytics, updateVendorProfile } = require("../controller/adminController");
const auth = require("../controller/authController");
const order = require("../controller/orderController");
const store = require("../controller/storeController");
const Category = require("../model/categorymodel");
const Brand = require("../model/brandmodel");
const Size = require("../model/sizemodel");
const Color = require("../model/colormodel");

router.use(protect, role("vendor"));

router.get("/dashboard", vendorDashboard);
router.get("/analytics", vendorAnalytics);

// Reference data for product forms
router.get("/categories", async (req, res) => {
  try {
    res.json({ success: true, data: await Category.find({ isActive: true }).sort({ name: 1 }) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load categories", error: error.message });
  }
});
router.get("/brands", async (req, res) => {
  try {
    const filter = req.query.category ? { categories: req.query.category } : {};
    res.json({ success: true, data: await Brand.find(filter).sort({ name: 1 }) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load brands", error: error.message });
  }
});
router.get("/sizes", async (req, res) => {
  try {
    const filter = req.query.category ? { categories: req.query.category } : {};
    res.json({ success: true, data: await Size.find(filter).sort({ name: 1 }) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load sizes", error: error.message });
  }
});
router.get("/colors", async (req, res) => {
  try {
    res.json({ success: true, data: await Color.find({ isActive: true }).sort({ name: 1 }) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load colors", error: error.message });
  }
});

// Products (active vendors only for writes)
router.get("/products", product.listVendor);
router.post("/products", activeVendor, product.createVendor);
router.get("/products/:id", validateObjectId("id"), product.vendorProduct);
router.put("/products/:id", validateObjectId("id"), activeVendor, product.updateVendor);
router.delete("/products/:id", validateObjectId("id"), activeVendor, product.removeVendor);
router.patch("/products/:id/stock", validateObjectId("id"), activeVendor, product.updateVendorStock);

// Orders (vendor's own orders only)
router.get("/orders", order.getVendorOrders);
router.put("/orders/:id/status", validateObjectId("id"), order.updateVendorOrderStatus);

// Reviews for vendor's products
router.get("/reviews", store.getVendorReviews);

// Profile
router.get("/profile", auth.profile);
router.put("/profile", updateVendorProfile);

module.exports = router;
