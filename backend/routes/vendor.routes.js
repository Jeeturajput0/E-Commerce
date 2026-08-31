const router = require("express").Router();
const { protect, role } = require("../middleware/authMiddleware");
const product = require("../controller/productController");
const { vendorDashboard } = require("../controller/adminController");
const auth = require("../controller/authController");
const Category = require("../model/categorymodel");
const Brand = require("../model/brandmodel");
const Size = require("../model/sizemodel");
const Color = require("../model/colormodel");
const upload = require("../middleware/uploadMiddleware");

router.use(protect, role("vendor"));
router.get("/dashboard", vendorDashboard);
router.get("/categories", async (req, res) => res.json({ success: true, data: await Category.find({ isActive: true }) }));
router.get("/brands", async (req, res) => res.json({ success: true, data: await Brand.find(req.query.category ? { categories: req.query.category } : {}) }));
router.get("/sizes", async (req, res) => res.json({ success: true, data: await Size.find(req.query.category ? { categories: req.query.category } : {}) }));
router.get("/colors", async (req, res) => res.json({ success: true, data: await Color.find({ isActive: true }) }));
router.route("/products").get(product.listVendor).post(upload.single("image"), product.createVendor);
router.route("/products/:id").get(product.vendorProduct).put(upload.single("image"), product.updateVendor).delete(product.removeVendor);
router.get("/profile", auth.profile);
router.put("/profile", auth.updateProfile);
router.get("/orders", (req, res) => res.json({ success: true, data: [] }));

module.exports = router;

