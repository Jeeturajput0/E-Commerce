import { api, IMAGEKIT_URL_ENDPOINT, IMAGEKIT_PUBLIC_KEY } from "../lib/api";

// Direct-to-ImageKit upload using the secure backend signature flow.
// 1. GET /api/upload/imagekit-auth (backend signs with private key)
// 2. POST file directly to https://upload.imagekit.io/api/v1/files/upload
// 3. Returns { url, fileId, filePath } to store in MongoDB
export const getImageKitAuth = () => api("/upload/imagekit-auth");

export const uploadToImageKit = async (file, folder = "/ecommerce/products", onProgress) => {
  const auth = await getImageKitAuth();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("folder", folder);
  formData.append("token", auth.token);
  formData.append("expire", String(auth.expire));
  formData.append("signature", auth.signature);
  formData.append("publicKey", auth.publicKey || IMAGEKIT_PUBLIC_KEY);

  const url = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(body);
        else reject(new Error(body.message || "ImageKit upload failed"));
      } catch {
        reject(new Error("ImageKit upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("ImageKit upload failed"));
    xhr.send(formData);
  });

  return { url: url.url, fileId: url.fileId, filePath: url.filePath };
};

export const deleteFromImageKit = (fileId) =>
  api(`/upload/imagekit?fileId=${encodeURIComponent(fileId)}`, { method: "DELETE" });

export const FOLDERS = {
  products: "/ecommerce/products",
  categories: "/ecommerce/categories",
  vendors: "/ecommerce/vendors",
  users: "/ecommerce/users",
  banners: "/ecommerce/banners",
  blogs: "/ecommerce/blogs",
  brands: "/ecommerce/brands",
};
