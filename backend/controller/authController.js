const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const getSecret = () => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return process.env.JWT_SECRET;
};

const tokenFor = (user) =>
  jwt.sign({ userId: user._id, email: user.email, role: user.role }, getSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const cleanUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  mobile: user.mobile,
  role: user.role,
  isActive: user.isActive,
  vendorStatus: user.vendorStatus,
  storeName: user.storeName,
  storeLogo: user.storeLogo,
  storeBanner: user.storeBanner,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

const normalizeEmail = (email) => String(email || "").toLowerCase().trim();

exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    const cleanEmail = normalizeEmail(email);
    if (!name || !cleanEmail || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    if (await User.exists({ email: cleanEmail })) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    const isVendor = role === "vendor";
    const user = await User.create({
      name: String(name).trim(),
      email: cleanEmail,
      mobile: mobile || "",
      password,
      role: isVendor ? "vendor" : "customer",
      vendorStatus: isVendor ? "pending" : "none",
    });
    res.status(201).json({
      success: true,
      message: isVendor ? "Vendor account created. Awaiting admin approval." : "Account created",
      data: { user: cleanUser(user), token: tokenFor(user) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not register", error: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const cleanEmail = normalizeEmail(email);
    if (!name || !cleanEmail || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }
    if (await User.exists({ role: "admin" })) {
      return res.status(403).json({
        success: false,
        message: "An admin already exists. Additional admins must be created by an existing admin.",
      });
    }
    if (await User.exists({ email: cleanEmail })) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    const user = await User.create({ name, email: cleanEmail, mobile: mobile || "", password, role: "admin" });
    res.status(201).json({
      success: true,
      message: "Admin account created",
      data: { user: cleanUser(user), token: tokenFor(user) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not create admin", error: error.message });
  }
};

// Protected: an existing admin creates more admins / vendors
exports.createUserByAdmin = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    const cleanEmail = normalizeEmail(email);
    if (!name || !cleanEmail || !password || !role) {
      return res.status(400).json({ success: false, message: "Name, email, password and role are required" });
    }
    if (!["admin", "vendor", "customer"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    if (await User.exists({ email: cleanEmail })) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    const user = await User.create({
      name,
      email: cleanEmail,
      mobile: mobile || "",
      password,
      role,
      vendorStatus: role === "vendor" ? "approved" : "none",
    });
    res.status(201).json({ success: true, message: "User created", data: cleanUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not create user", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: normalizeEmail(req.body.email) }).select("+password");
    if (!user || !(await user.comparePassword(req.body.password || ""))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "Account is blocked. Contact support." });
    }
    if (user.role === "vendor" && ["blocked", "rejected"].includes(user.vendorStatus)) {
      return res.status(403).json({ success: false, message: `Vendor account is ${user.vendorStatus}. Contact support.` });
    }
    res.json({
      success: true,
      message: "Login successful",
      data: { user: cleanUser(user), token: tokenFor(user) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not login", error: error.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: cleanUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load profile", error: error.message });
  }
};

exports.profile = exports.me;

exports.updateProfile = async (req, res) => {
  try {
    const { name, mobile, avatar, storeName, storeDescription, storeAddress, storePhone } = req.body;
    const update = {};
    if (name !== undefined) update.name = String(name).trim();
    if (mobile !== undefined) update.mobile = String(mobile).trim();
    if (avatar !== undefined) update.avatar = avatar;
    // Vendor store fields (backend ignores role escalation; role itself is never updatable here)
    if (req.user.role === "vendor") {
      if (storeName !== undefined) update.storeName = storeName;
      if (storeDescription !== undefined) update.storeDescription = storeDescription;
      if (storeAddress !== undefined) update.storeAddress = storeAddress;
      if (storePhone !== undefined) update.storePhone = storePhone;
    }
    const user = await User.findByIdAndUpdate(req.user.userId, update, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "Profile updated", data: cleanUser(user) });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not update profile", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Current and new password are required" });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
    }
    const user = await User.findById(req.user.userId).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not change password", error: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const { label, fullName, phone, line1, line2, city, state, postalCode, country, isDefault } = req.body;
    if (!line1 || !city || !postalCode) {
      return res.status(400).json({ success: false, message: "Address line, city and postal code are required" });
    }
    if (isDefault) user.addresses.forEach((a) => { a.isDefault = false; });
    user.addresses.push({
      label, fullName, phone, line1, line2, city, state, postalCode, country,
      isDefault: Boolean(isDefault) || user.addresses.length === 0,
    });
    await user.save();
    res.status(201).json({ success: true, message: "Address added", data: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not add address", error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });
    const fields = ["label", "fullName", "phone", "line1", "line2", "city", "state", "postalCode", "country"];
    fields.forEach((f) => { if (req.body[f] !== undefined) address[f] = req.body[f]; });
    if (req.body.isDefault) {
      user.addresses.forEach((a) => { a.isDefault = false; });
      address.isDefault = true;
    }
    await user.save();
    res.json({ success: true, message: "Address updated", data: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update address", error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });
    address.deleteOne();
    await user.save();
    res.json({ success: true, message: "Address deleted", data: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not delete address", error: error.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load addresses", error: error.message });
  }
};
