require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const vendorRoutes = require("./routes/vendor.routes");
const publicRoutes = require("./routes/public.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();

const DEFAULT_ALLOWED_ORIGINS = [
  "https://e-commerce-nu-eight-79.vercel.app",
  "http://localhost:5173",
];

const CLIENT_URLS = (
  process.env.CLIENT_URL || DEFAULT_ALLOWED_ORIGINS.join(",")
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// CORS MUST be registered BEFORE express.json() and API routes.
// `cors` middleware automatically handles preflight OPTIONS requests.
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || CLIENT_URLS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ success: true, message: "E-Commerce API" }));
app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "OK", imagekit: Boolean(process.env.IMAGEKIT_PUBLIC_KEY) })
);

app.use("/api/user", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", publicRoutes);

// JSON 404 (fixes "API returning HTML instead of JSON")
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler — always JSON
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err && err.message === "Not allowed by CORS") {
    return res.status(403).json({ success: false, message: "Origin not allowed by CORS" });
  }
  if (err && err.message === "Only image files are allowed") {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err && err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ success: false, message: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is not set. Refusing to start.");
  process.exit(1);
}

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
});

module.exports = app;
