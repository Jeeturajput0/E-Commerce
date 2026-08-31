const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const tokenFor = (user) =>
  jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "development-secret",
    { expiresIn: "7d" },
  );
const cleanUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  mobile: user.mobile,
  role: user.role,
  isActive: user.isActive,
});
exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, email and password are required",
        });
    if (await User.exists({ email }))
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: role === "vendor" ? "vendor" : "customer",
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Account created",
        data: { user: cleanUser(user), token: tokenFor(user) },
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not register",
        error: error.message,
      });
  }
};
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, email and password are required",
        });
    if (await User.exists({ role: "admin" }))
      return res
        .status(403)
        .json({
          success: false,
          message:
            "An admin already exists. Create additional admins only from a protected admin management page.",
        });
    if (await User.exists({ email }))
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: "admin",
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Admin account created",
        data: { user: cleanUser(user), token: tokenFor(user) },
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not create admin",
        error: error.message,
      });
  }
};
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email?.toLowerCase(),
    }).select("+password");
    if (!user || !(await user.comparePassword(req.body.password || "")))
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    if (!user.isActive)
      return res
        .status(403)
        .json({ success: false, message: "Account is inactive" });
    res.json({
      success: true,
      message: "Login successful",
      data: { user: cleanUser(user), token: tokenFor(user) },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not login",
        error: error.message,
      });
  }
};
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ success: true, data: cleanUser(user) });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not load profile",
        error: error.message,
      });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const allowed = (({ name, mobile }) => ({ name, mobile }))(req.body);
    const user = await User.findByIdAndUpdate(req.user.userId, allowed, {
      new: true,
      runValidators: true,
    });
    res.json({
      success: true,
      message: "Profile updated",
      data: cleanUser(user),
    });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not update profile",
        error: error.message,
      });
  }
};
