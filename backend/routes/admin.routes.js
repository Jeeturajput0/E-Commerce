const router = require("express").Router(); const { protect, role } = require("../middleware/authMiddleware"); const product = require("../controller/productController"); const admin = require("../controller/adminController");
router.use(protect, role("admin"));
router.get("/dashboard", admin.dashboard); router.route("/products").get(product.listAdmin).post(product.createAdmin); router.route("/products/:id").get(product.adminProduct).put(product.updateAdmin).delete(product.removeAdmin); router.put("/products/:id/approve", product.approve); router.put("/products/:id/reject", product.reject);
router.get("/users", admin.users); router.get("/vendors", (req, res, next) => { req.query.role = "vendor"; next(); }, admin.users); router.route("/users/:id").put(admin.updateUser).delete(admin.deleteUser);
["category", "brand", "size", "color", "review", "coupon", "offer", "banner"].forEach((resource) => {
  router.route(`/${resource}`).get((req, res, next) => { req.params.resource = resource; next(); }, admin.masterList).post((req, res, next) => { req.params.resource = resource; next(); }, admin.masterCreate);
  router.route(`/${resource}/:id`).get((req, res, next) => { req.params.resource = resource; next(); }, admin.masterOne).put((req, res, next) => { req.params.resource = resource; next(); }, admin.masterUpdate).delete((req, res, next) => { req.params.resource = resource; next(); }, admin.masterDelete);
});
module.exports = router;
