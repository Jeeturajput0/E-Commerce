const router = require("express").Router();
const { protect, role, validateObjectId } = require("../middleware/authMiddleware");
const product = require("../controller/productController");
const admin = require("../controller/adminController");
const order = require("../controller/orderController");
const auth = require("../controller/authController");

router.use(protect, role("admin"));

// Dashboard + analytics
router.get("/dashboard", admin.dashboard);
router.get("/analytics/revenue", admin.analytics);
router.get("/analytics/orders", admin.analytics);
router.get("/analytics", admin.analytics);
router.get("/orders/recent", admin.recentOrders);

// Products
router.route("/products").get(product.listAdmin).post(product.createAdmin);
router
  .route("/products/:id")
  .get(validateObjectId("id"), product.adminProduct)
  .put(validateObjectId("id"), product.updateAdmin)
  .delete(validateObjectId("id"), product.removeAdmin);
router.put("/products/:id/approve", validateObjectId("id"), product.approve);
router.put("/products/:id/reject", validateObjectId("id"), product.reject);
router.patch("/products/:id/toggle-active", validateObjectId("id"), product.toggleActiveAdmin);

// Orders
router.get("/orders", order.getAdminOrders);
router.get("/orders/:id", validateObjectId("id"), order.getAdminOrder);
router.put("/orders/:id/status", validateObjectId("id"), order.updateOrderStatus);

// Users / vendors / customers
router.get("/users", admin.users);
router.post("/users", auth.createUserByAdmin);
router.get("/vendors", (req, res, next) => {
  req.query.role = "vendor";
  next();
}, admin.users);
router.get("/customers", (req, res, next) => {
  req.query.role = "customer";
  next();
}, admin.users);
router.get("/users/:id", validateObjectId("id"), admin.getUser);
router.put("/users/:id", validateObjectId("id"), admin.updateUser);
router.delete("/users/:id", validateObjectId("id"), admin.deleteUser);

// Master data (category/brand/size/color/review/coupon/offer/banner — JSON + ImageKit URLs)
["category", "brand", "size", "color", "review", "coupon", "offer", "banner"].forEach((resource) => {
  router
    .route(`/${resource}`)
    .get((req, res, next) => {
      req.params.resource = resource;
      next();
    }, admin.masterList)
    .post((req, res, next) => {
      req.params.resource = resource;
      next();
    }, admin.masterCreate);
  router
    .route(`/${resource}/:id`)
    .get(
      (req, res, next) => {
        req.params.resource = resource;
        next();
      },
      validateObjectId("id"),
      admin.masterOne
    )
    .put(
      (req, res, next) => {
        req.params.resource = resource;
        next();
      },
      validateObjectId("id"),
      admin.masterUpdate
    )
    .delete(
      (req, res, next) => {
        req.params.resource = resource;
        next();
      },
      validateObjectId("id"),
      admin.masterDelete
    );
});

module.exports = router;
