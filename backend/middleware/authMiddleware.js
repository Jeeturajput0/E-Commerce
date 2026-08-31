const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET || "development-secret",
    );
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
const role =
  (...roles) =>
  (req, res, next) =>
    roles.includes(req.user.role)
      ? next()
      : res.status(403).json({ success: false, message: "Access denied" });
module.exports = { protect, role };
