const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/usermodel");

const getSecret = () => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return process.env.JWT_SECRET;
};

// Verify JWT and attach fresh user (role trusted from DB, never from client)
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: token missing" });
    }
    const decoded = jwt.verify(token, getSecret());
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: user not found" });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "Account is blocked. Contact support." });
    }
    req.user = {
      userId: String(user._id),
      email: user.email,
      role: user.role,
      vendorStatus: user.vendorStatus,
      doc: user,
    };
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Optional auth: attaches user when a valid token is present, never fails
const optionalAuth = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !process.env.JWT_SECRET) return next();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user && user.isActive) {
      req.user = {
        userId: String(user._id),
        email: user.email,
        role: user.role,
        vendorStatus: user.vendorStatus,
        doc: user,
      };
    }
  } catch {
    // ignore invalid tokens on public routes
  }
  next();
};

const role =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };

// Vendor must be approved/active (checked from DB via protect)
const activeVendor = (req, res, next) => {
  const status = req.user?.vendorStatus;
  if (!["approved", "active"].includes(status)) {
    return res.status(403).json({
      success: false,
      message: `Vendor account is ${status || "not approved"}. Please wait for admin approval.`,
    });
  }
  next();
};

const validateObjectId = (param = "id") => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ success: false, message: `Invalid ${param}` });
  }
  next();
};

module.exports = { protect, optionalAuth, role, activeVendor, validateObjectId };
