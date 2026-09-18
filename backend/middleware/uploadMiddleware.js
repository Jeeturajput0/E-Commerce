const multer = require("multer");

// Memory storage: files are forwarded to ImageKit, never written to disk.
// (Legacy disk-based /uploads flow removed; static /uploads serving removed in server.js.)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 8 },
  fileFilter: (req, file, done) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) return done(null, true);
    done(new Error("Only image files are allowed"), false);
  },
});

module.exports = upload;
