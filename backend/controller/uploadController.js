// ImageKit integration for all image/file uploads.
// Flow: frontend calls GET /api/upload/imagekit-auth -> receives signature/token/expire
//       -> uploads file DIRECTLY to ImageKit (private key never leaves backend)
//       -> sends back { url, fileId, filePath } to store in MongoDB.
// Server-side delete: DELETE /api/upload/imagekit?fileId=... (uses private key).
const crypto = require("crypto");
const { getImageKit, isImageKitConfigured, FOLDERS } = require("../config/imagekit");

// Frontend calls this before uploading directly to ImageKit
exports.getImageKitAuth = (req, res) => {
  if (!isImageKitConfigured()) {
    return res.status(500).json({ success: false, message: "ImageKit is not configured on the server" });
  }
  const token = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const expire = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes
  const signature = crypto
    .createHmac("sha1", process.env.IMAGEKIT_PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");
  res.json({
    success: true,
    data: {
      signature,
      token,
      expire,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      folders: FOLDERS,
    },
  });
};

// Delete a file from ImageKit when it is removed/replaced (product/category/banner/etc.)
exports.deleteFromImageKit = async (req, res) => {
  try {
    const fileId = req.query.fileId || req.body.fileId;
    if (!fileId) return res.status(400).json({ success: false, message: "fileId is required" });
    const imagekit = getImageKit();
    if (!imagekit) return res.status(500).json({ success: false, message: "ImageKit is not configured" });
    await imagekit.deleteFile(fileId);
    res.json({ success: true, message: "File deleted from ImageKit" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not delete file", error: error.message });
  }
};

// Helper for controllers: best-effort delete, never throws
async function removeImageKitFile(fileId) {
  try {
    if (!fileId) return;
    const imagekit = getImageKit();
    if (!imagekit) return;
    await imagekit.deleteFile(fileId);
  } catch {
    // best effort only
  }
}

exports.removeImageKitFile = removeImageKitFile;
