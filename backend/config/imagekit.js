const ImageKit = require("imagekit");

let imagekit = null;

function getImageKit() {
  if (imagekit) return imagekit;
  const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;
  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    return null;
  }
  imagekit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });
  return imagekit;
}

function isImageKitConfigured() {
  return Boolean(
    process.env.IMAGEKIT_PUBLIC_KEY &&
      process.env.IMAGEKIT_PRIVATE_KEY &&
      process.env.IMAGEKIT_URL_ENDPOINT
  );
}

const FOLDERS = {
  products: "/ecommerce/products",
  categories: "/ecommerce/categories",
  vendors: "/ecommerce/vendors",
  users: "/ecommerce/users",
  banners: "/ecommerce/banners",
  blogs: "/ecommerce/blogs",
  brands: "/ecommerce/brands",
};

module.exports = { getImageKit, isImageKitConfigured, FOLDERS };
