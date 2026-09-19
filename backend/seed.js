// Backend seed — real catalog data (no frontend dummy data).
// Idempotent: safe to re-run, existing records are matched by unique name/slug/email.
// Usage: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("./model/categorymodel");
const Brand = require("./model/brandmodel");
const Size = require("./model/sizemodel");
const Color = require("./model/colormodel");
const Product = require("./model/productmodel");
const User = require("./model/usermodel");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const unsplash = (id) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

const CATEGORIES = [
  { name: "Electronics", description: "Mobiles, laptops, audio devices and smart gadgets." },
  { name: "Fashion", description: "Men's and women's clothing and everyday wardrobe essentials." },
  { name: "Footwear", description: "Sports shoes, sneakers, sandals and formal footwear." },
  { name: "Beauty", description: "Skincare, haircare and personal care essentials." },
  { name: "Sports", description: "Fitness equipment, activewear and outdoor sports gear." },
];

const BRANDS = [
  { name: "NovaTech", forCategory: "Electronics" },
  { name: "UrbanThread", forCategory: "Fashion" },
  { name: "StrideX", forCategory: "Footwear" },
  { name: "GlowHerb", forCategory: "Beauty" },
  { name: "FlexFit", forCategory: "Sports" },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

const COLORS = [
  { name: "Black", hexCode: "#000000" },
  { name: "White", hexCode: "#FFFFFF" },
  { name: "Navy Blue", hexCode: "#1E40AF" },
  { name: "Red", hexCode: "#DC2626" },
  { name: "Olive Green", hexCode: "#4D7C0F" },
];

const PRODUCTS = [
  {
    name: "NovaTech Bass Pro Wireless Headphones",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "Over-ear Bluetooth headphones with deep bass and 40-hour battery.",
    details: "40mm drivers, Bluetooth 5.3, 40-hour playback, fast USB-C charging, foldable design with soft cushions.",
    mrp: 4999,
    saleprice: 2999,
    stock: 50,
    sku: "NT-HP-001",
    sizes: [],
    colors: ["Black", "Navy Blue"],
    tags: ["headphones", "wireless", "bluetooth", "audio"],
    specifications: { driver: "40mm", bluetooth: "v5.3", battery: "40 hours", warranty: "1 year" },
    featured: true,
    image: unsplash("photo-1505740420928-5e560c06d30e"),
  },
  {
    name: "NovaTech SmartFit Pro Smartwatch",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "1.85-inch HD display smartwatch with calling, SpO2 and 7-day battery.",
    details: "Bluetooth calling, heart-rate + SpO2 tracking, 100+ sport modes, IP68 water resistant, 7-day battery backup.",
    mrp: 5999,
    saleprice: 3499,
    stock: 70,
    sku: "NT-SW-006",
    sizes: [],
    colors: ["Black"],
    tags: ["smartwatch", "fitness", "calling", "wearable"],
    specifications: { display: "1.85-inch HD", battery: "7 days", rating: "IP68", warranty: "1 year" },
    featured: true,
    image: unsplash("photo-1523275335684-37898b6baf30"),
  },
  {
    name: "NovaTech UltraBook Air Laptop 14 inch",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "Thin and light 14-inch laptop with 16GB RAM and 512GB SSD.",
    details: "Intel i5 12th gen, 16GB RAM, 512GB SSD, 14-inch FHD display, backlit keyboard, 52Wh battery with fast charging.",
    mrp: 65990,
    saleprice: 54990,
    stock: 25,
    sku: "NT-LP-007",
    sizes: [],
    colors: ["Black"],
    tags: ["laptop", "notebook", "computer", "work"],
    specifications: { processor: "Intel i5 12th Gen", ram: "16GB", storage: "512GB SSD", display: "14-inch FHD" },
    featured: true,
    image: unsplash("photo-1496181133206-80ce9b88a853"),
  },
  {
    name: "NovaTech AirBuds Pro TWS Earbuds",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "True wireless earbuds with ENC calling and 45-hour case battery.",
    details: "13mm drivers, ENC clear calling, low-latency gaming mode, 45-hour total playback with charging case, USB-C fast charge.",
    mrp: 3999,
    saleprice: 1999,
    stock: 100,
    sku: "NT-EB-008",
    sizes: [],
    colors: ["White", "Black"],
    tags: ["earbuds", "tws", "wireless", "audio"],
    specifications: { driver: "13mm", playback: "45 hours", charging: "USB-C", warranty: "1 year" },
    featured: true,
    image: unsplash("photo-1590658268037-6bf12165a8df"),
  },
  {
    name: "NovaTech ThunderBolt Bluetooth Speaker",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "Portable party speaker with deep bass, RGB lights and 18-hour playtime.",
    details: "20W stereo output, deep bass radiators, RGB lights, TWS pairing, IPX6 splash proof, 18-hour battery.",
    mrp: 4999,
    saleprice: 2799,
    stock: 60,
    sku: "NT-SP-009",
    sizes: [],
    colors: ["Black", "Red"],
    tags: ["speaker", "bluetooth", "party", "audio"],
    specifications: { output: "20W", battery: "18 hours", rating: "IPX6", warranty: "1 year" },
    featured: false,
    image: unsplash("photo-1608043152269-423dbba4e7e1"),
  },
  {
    name: "NovaTech PowerShot Smartphone 5G",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "5G smartphone with 50MP camera, 120Hz display and 5000mAh battery.",
    details: "6.6-inch 120Hz display, 50MP dual camera, 8GB RAM + 128GB storage, 5000mAh battery with 33W fast charging.",
    mrp: 24999,
    saleprice: 18999,
    stock: 40,
    sku: "NT-MB-010",
    sizes: [],
    colors: ["Navy Blue", "Black"],
    tags: ["mobile", "smartphone", "5g", "camera"],
    specifications: { display: "6.6-inch 120Hz", camera: "50MP", battery: "5000mAh", warranty: "1 year" },
    featured: true,
    image: unsplash("photo-1511707171634-5f897ff02aa9"),
  },
  {
    name: "UrbanThread Men's Slim-Fit Cotton Shirt",
    category: "Fashion",
    brand: "UrbanThread",
    shortDescription: "Premium breathable cotton casual shirt with a modern slim fit.",
    details: "100% combed cotton, slim fit, full sleeves, machine washable. Perfect for office and casual outings.",
    mrp: 1999,
    saleprice: 1299,
    stock: 120,
    sku: "UT-SH-002",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Navy Blue"],
    tags: ["shirt", "cotton", "mens fashion", "casual"],
    specifications: { fabric: "100% cotton", fit: "Slim", sleeve: "Full", care: "Machine wash" },
    featured: true,
    image: unsplash("photo-1596755094514-f87e34085b2c"),
  },
  {
    name: "UrbanThread Classic White Cotton T-Shirt",
    category: "Fashion",
    brand: "UrbanThread",
    shortDescription: "Soft pure-cotton round-neck t-shirt for daily wear.",
    details: "180 GSM combed cotton, regular fit, round neck, bio-washed fabric. Pack essential basic tee.",
    mrp: 999,
    saleprice: 599,
    stock: 200,
    sku: "UT-TS-011",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black"],
    tags: ["tshirt", "cotton", "basic", "mens fashion"],
    specifications: { fabric: "100% cotton 180 GSM", fit: "Regular", neck: "Round", care: "Machine wash" },
    featured: true,
    image: unsplash("photo-1521572163474-6864f9cf17ab"),
  },
  {
    name: "UrbanThread Women's Floral Summer Dress",
    category: "Fashion",
    brand: "UrbanThread",
    shortDescription: "Lightweight floral midi dress perfect for summer outings.",
    details: "Soft rayon fabric, floral print, midi length, smocked back for comfort fit. Ideal for brunch and vacations.",
    mrp: 2499,
    saleprice: 1599,
    stock: 90,
    sku: "UT-DR-012",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "White"],
    tags: ["dress", "women", "floral", "summer"],
    specifications: { fabric: "Rayon", length: "Midi", fit: "Regular", care: "Gentle wash" },
    featured: true,
    image: unsplash("photo-1595777457583-95e059d581b8"),
  },
  {
    name: "UrbanThread Men's Winter Biker Jacket",
    category: "Fashion",
    brand: "UrbanThread",
    shortDescription: "Stylish winter jacket with warm inner lining.",
    details: "Water-resistant outer shell, warm fleece lining, zip pockets, ribbed cuffs. Best for winter and biking.",
    mrp: 3999,
    saleprice: 2599,
    stock: 75,
    sku: "UT-JK-013",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Olive Green"],
    tags: ["jacket", "winter", "mens fashion", "biker"],
    specifications: { fabric: "Polyester + fleece", fit: "Regular", pockets: "Zip", care: "Dry clean" },
    featured: false,
    image: unsplash("photo-1591047139829-d91aecb6caea"),
  },
  {
    name: "UrbanThread Slim-Fit Stretch Blue Jeans",
    category: "Fashion",
    brand: "UrbanThread",
    shortDescription: "Stretchable slim-fit denim jeans with faded look.",
    details: "Cotton-blend stretch denim, slim fit, mid rise, 5-pocket styling. All-day comfort with stylish fade.",
    mrp: 2299,
    saleprice: 1499,
    stock: 110,
    sku: "UT-JN-014",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy Blue", "Black"],
    tags: ["jeans", "denim", "mens fashion", "casual"],
    specifications: { fabric: "Cotton blend denim", fit: "Slim", rise: "Mid", care: "Machine wash" },
    featured: false,
    image: unsplash("photo-1542272604-787c3835535d"),
  },
  {
    name: "UrbanThread Women's Ethnic Kurti Set",
    category: "Fashion",
    brand: "UrbanThread",
    shortDescription: "Elegant straight-cut kurti with palazzo for festive look.",
    details: "Rayon straight kurti with printed palazzo, 3/4 sleeves, knee length. Perfect for office, daily and festive wear.",
    mrp: 1999,
    saleprice: 1199,
    stock: 85,
    sku: "UT-KU-015",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Navy Blue"],
    tags: ["kurti", "ethnic", "women", "festive"],
    specifications: { fabric: "Rayon", style: "Straight cut", sleeve: "3/4", care: "Gentle wash" },
    featured: false,
    image: unsplash("photo-1594633312681-425c7b97ccd1"),
  },
  {
    name: "StrideX AirFlex Running Shoes",
    category: "Footwear",
    brand: "StrideX",
    shortDescription: "Lightweight running shoes with extra cushioning and strong grip.",
    details: "Breathable mesh upper, EVA sole for shock absorption, anti-skid outsole. Ideal for running, gym and daily wear.",
    mrp: 3499,
    saleprice: 2499,
    stock: 80,
    sku: "SX-RS-003",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    colors: ["Black", "Red"],
    tags: ["shoes", "running", "sports", "sneakers"],
    specifications: { upper: "Mesh", sole: "EVA + rubber", use: "Running / gym", warranty: "90 days" },
    featured: true,
    image: unsplash("photo-1542291026-7eec264c27ff"),
  },
  {
    name: "GlowHerb Vitamin C Face Serum 30ml",
    category: "Beauty",
    brand: "GlowHerb",
    shortDescription: "Brightening vitamin C serum for glowing, even-toned skin.",
    details: "15% vitamin C with hyaluronic acid and aloe vera. Reduces dark spots, suits all skin types. Dermat tested.",
    mrp: 899,
    saleprice: 649,
    stock: 200,
    sku: "GH-VC-004",
    sizes: [],
    colors: [],
    tags: ["serum", "skincare", "vitamin c", "face"],
    specifications: { volume: "30ml", keyIngredient: "15% Vitamin C", skinType: "All", shelfLife: "24 months" },
    featured: false,
    image: unsplash("photo-1620916566398-39f1143ab7be"),
  },
  {
    name: "FlexFit Pro Yoga Mat 6mm Anti-Skid",
    category: "Sports",
    brand: "FlexFit",
    shortDescription: "6mm thick anti-skid yoga mat with carry strap for home workouts.",
    details: "High-density TPE material, sweat resistant, tear proof, includes carry strap. Size 183cm x 61cm x 6mm.",
    mrp: 1499,
    saleprice: 999,
    stock: 150,
    sku: "FF-YM-005",
    sizes: [],
    colors: ["Olive Green", "Navy Blue"],
    tags: ["yoga", "fitness", "gym", "mat"],
    specifications: { thickness: "6mm", material: "TPE", size: "183 x 61 cm", inBox: "Mat + carry strap" },
    featured: false,
    image: unsplash("photo-1601925260368-ae2f83cf8b7f"),
  },
  {
    name: "NovaTech TabPro 11 inch WiFi Tablet",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "11-inch 2K display tablet with quad speakers for study and entertainment.",
    details: "11-inch 2K display, octa-core processor, 8GB RAM + 128GB storage, quad speakers, 7700mAh battery with fast charging.",
    mrp: 29999,
    saleprice: 22999,
    stock: 35,
    sku: "NT-TB-016",
    sizes: [],
    colors: ["Black", "Navy Blue"],
    tags: ["tablet", "tab", "study", "entertainment"],
    specifications: { display: "11-inch 2K", ram: "8GB", storage: "128GB", battery: "7700mAh" },
    featured: true,
    image: unsplash("photo-1544244015-0df4b3ffc6b0"),
  },
  {
    name: "NovaTech Neckband Pro Wireless Earphones",
    category: "Electronics",
    brand: "NovaTech",
    shortDescription: "Neckband earphones with deep bass and 40-hour battery backup.",
    details: "10mm drivers, ENC calling, fast charging (10 min = 10 hours), IPX5 sweat proof, 40-hour total playback.",
    mrp: 2999,
    saleprice: 1499,
    stock: 120,
    sku: "NT-NB-017",
    sizes: [],
    colors: ["Black", "Navy Blue"],
    tags: ["neckband", "earphones", "wireless", "audio"],
    specifications: { driver: "10mm", playback: "40 hours", rating: "IPX5", warranty: "1 year" },
    featured: false,
    image: unsplash("photo-1583394838336-acd977736f90"),
  },
  {
    name: "UrbanThread Women's Classic Handbag",
    category: "Fashion",
    brand: "UrbanThread",
    shortDescription: "Elegant everyday handbag with premium finish and spacious compartments.",
    details: "Premium PU finish, zip closure, 2 main compartments + inner pocket, adjustable shoulder strap. Perfect for office and outings.",
    mrp: 2799,
    saleprice: 1699,
    stock: 65,
    sku: "UT-HB-018",
    sizes: [],
    colors: ["Black", "Red"],
    tags: ["handbag", "women", "bag", "fashion"],
    specifications: { material: "Premium PU", closure: "Zip", compartments: "2 + pocket", care: "Wipe clean" },
    featured: true,
    image: unsplash("photo-1584917865442-de89df76afd3"),
  },
];

const seed = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set in backend/.env");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected. Seeding...");

  // 1. Categories (5)
  const catByName = {};
  for (const c of CATEGORIES) {
    const doc = await Category.findOneAndUpdate(
      { name: c.name },
      { $set: { description: c.description, slug: slugify(c.name), isActive: true } },
      { new: true, upsert: true, runValidators: true }
    );
    catByName[c.name] = doc;
  }
  console.log(`Categories: ${Object.keys(catByName).length}`);

  // 2. Brands (5) linked to their category
  const brandByName = {};
  for (const b of BRANDS) {
    const doc = await Brand.findOneAndUpdate(
      { name: b.name },
      { $set: { categories: [catByName[b.forCategory]._id], isActive: true } },
      { new: true, upsert: true, runValidators: true }
    );
    brandByName[b.name] = doc;
  }
  console.log(`Brands: ${Object.keys(brandByName).length}`);

  // 3. Sizes (5) for apparel categories
  for (const name of SIZES) {
    await Size.findOneAndUpdate(
      { name },
      { $set: { categories: [catByName.Fashion._id, catByName.Sports._id], isActive: true } },
      { new: true, upsert: true, runValidators: true }
    );
  }
  console.log(`Sizes: ${SIZES.length}`);

  // 4. Colors (5)
  for (const c of COLORS) {
    await Color.findOneAndUpdate(
      { name: c.name },
      { $set: { hexCode: c.hexCode, isActive: true } },
      { new: true, upsert: true, runValidators: true }
    );
  }
  console.log(`Colors: ${COLORS.length}`);

  // 5. Vendor account for products (approved, so products go live)
  let vendor = await User.findOne({ email: "vendor@primehut.com" });
  if (!vendor) {
    vendor = new User({
      name: "PrimeHut Official",
      email: "vendor@primehut.com",
      mobile: "9876543210",
      password: "Vendor@123",
      role: "vendor",
      vendorStatus: "approved",
      storeName: "PrimeHut Official Store",
      storeDescription: "Official PrimeHut store — quality checked products.",
    });
    await vendor.save();
    console.log("Vendor created: vendor@primehut.com / Vendor@123");
  } else if (vendor.vendorStatus !== "approved") {
    vendor.vendorStatus = "approved";
    await vendor.save();
    console.log("Vendor approved: vendor@primehut.com");
  } else {
    console.log("Vendor exists: vendor@primehut.com");
  }

  // 6. Products (5) — approved + active so they show on the storefront
  for (const p of PRODUCTS) {
    const slug = slugify(p.name);
    const imageUrl = p.image || "";
    await Product.findOneAndUpdate(
      { slug },
      {
        $set: {
          name: p.name,
          slug,
          description: p.details,
          shortDescription: p.shortDescription,
          details: p.details,
          category: catByName[p.category]._id,
          brand: brandByName[p.brand]._id,
          vendor: vendor._id,
          price: p.saleprice,
          mrp: p.mrp,
          saleprice: p.saleprice,
          sku: p.sku,
          stock: p.stock,
          quantity: p.stock,
          images: [{ url: imageUrl }],
          image: imageUrl,
          thumbnail: imageUrl,
          sizes: p.sizes,
          colors: p.colors,
          tags: p.tags,
          specifications: p.specifications,
          featured: p.featured,
          isActive: true,
          approvalStatus: "approved",
          approvedAt: new Date(),
        },
      },
      { new: true, upsert: true, runValidators: true }
    );
  }
  console.log(`Products: ${PRODUCTS.length}`);

  await mongoose.disconnect();
  console.log("Seed complete.");
};

seed().catch(async (error) => {
  console.error("Seed failed:", error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
