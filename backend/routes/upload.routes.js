const router = require("express").Router();
const upload = require("../controller/uploadController");
const { protect, role } = require("../middleware/authMiddleware");

// Any authenticated user can get an ImageKit signature (scoped folders enforced client-side by convention)
router.get("/imagekit-auth", protect, upload.getImageKitAuth);
// Admin + vendor can delete files they own
router.delete("/imagekit", protect, role("admin", "vendor"), upload.deleteFromImageKit);

module.exports = router;
