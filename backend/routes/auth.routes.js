const router = require("express").Router();
const auth = require("../controller/authController");
const { protect, validateObjectId } = require("../middleware/authMiddleware");

router.post("/register", auth.register);
router.post("/admin/register", auth.registerAdmin);
router.post("/login", auth.login);

router.get("/me", protect, auth.me);
router.get("/profile", protect, auth.profile);
router.put("/profile", protect, auth.updateProfile);
router.put("/change-password", protect, auth.changePassword);

router.route("/addresses").get(protect, auth.getAddresses).post(protect, auth.addAddress);
router
  .route("/addresses/:addressId")
  .put(protect, validateObjectId("addressId"), auth.updateAddress)
  .delete(protect, validateObjectId("addressId"), auth.deleteAddress);

module.exports = router;
