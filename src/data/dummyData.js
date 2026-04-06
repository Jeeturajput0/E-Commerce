export const categories = [
  { id: 1, name: "Electronics", icon: "Laptop", count: 42 },
  { id: 2, name: "Fashion", icon: "Shirt", count: 63 },
  { id: 3, name: "Home Decor", icon: "Lamp", count: 28 },
  { id: 4, name: "Beauty", icon: "Sparkles", count: 35 },
  { id: 5, name: "Sports", icon: "Dumbbell", count: 19 },
  { id: 6, name: "Books", icon: "BookOpen", count: 17 },
];

export const products = [
  {
    id: 101,
    title: "Nova X Pro Wireless Headphones",
    price: 249,
    category: "Electronics",
    vendorId: 2,
    rating: 4.8,
    stock: 30,
    sold: 421,
    description:
      "Immersive active-noise cancellation with premium studio tuning and all-day battery life.",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 102,
    title: "Aurelia Smart Watch S7",
    price: 189,
    category: "Electronics",
    vendorId: 3,
    rating: 4.6,
    stock: 42,
    sold: 348,
    description:
      "Health sensors, precision GPS, and an elegant titanium frame built for active lifestyles.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 103,
    title: "Lume Linen Overshirt",
    price: 79,
    category: "Fashion",
    vendorId: 2,
    rating: 4.4,
    stock: 64,
    sold: 210,
    description:
      "Breathable premium linen overshirt designed for versatile layering and effortless style.",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 104,
    title: "Verde Ceramic Vase Set",
    price: 54,
    category: "Home Decor",
    vendorId: 3,
    rating: 4.7,
    stock: 50,
    sold: 189,
    description:
      "Minimal ceramic vase duo with textured matte finish that elevates modern interiors.",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 105,
    title: "Hydra Glow Skin Serum",
    price: 42,
    category: "Beauty",
    vendorId: 2,
    rating: 4.9,
    stock: 72,
    sold: 530,
    description:
      "Dermatologist-tested vitamin complex serum for hydrated, smooth, and radiant skin.",
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 106,
    title: "AeroFlex Running Shoes",
    price: 129,
    category: "Sports",
    vendorId: 3,
    rating: 4.5,
    stock: 47,
    sold: 275,
    description:
      "Engineered cushioning and breathable mesh for speed sessions and daily training.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 107,
    title: "Velvet Hardcover Journal",
    price: 24,
    category: "Books",
    vendorId: 2,
    rating: 4.3,
    stock: 90,
    sold: 142,
    description:
      "Premium textured journal with stitched spine, archival pages, and elastic closure.",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 108,
    title: "ZenBrew Espresso Machine",
    price: 329,
    category: "Home Decor",
    vendorId: 3,
    rating: 4.8,
    stock: 22,
    sold: 198,
    description:
      "Compact espresso machine with precision extraction and cafe-grade pressure control.",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
  id: 109,
  title: "Orion Bluetooth Speaker",
  price: 99,
  category: "Electronics",
  vendorId: 2,
  rating: 4.6,
  stock: 38,
  sold: 260,
  description:
    "Portable wireless speaker with deep bass, waterproof build, and 12-hour playtime.",
  images: [
    "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80",
  ],
},
{
  id: 110,
  title: "Urban Classic Sunglasses",
  price: 59,
  category: "Fashion",
  vendorId: 3,
  rating: 4.5,
  stock: 55,
  sold: 190,
  description:
    "Stylish UV-protected sunglasses with lightweight frame for everyday wear.",
  images: [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1200&q=80",
  ],
},
{
  id: 111,
  title: "Smart LED Desk Lamp",
  price: 45,
  category: "Home Decor",
  vendorId: 2,
  rating: 4.4,
  stock: 60,
  sold: 175,
  description:
    "Adjustable brightness desk lamp with touch control and eye-care lighting mode.",
  images: [
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
  ],
},
{
  id: 112,
  title: "PureGlow Face Cleanser",
  price: 28,
  category: "Beauty",
  vendorId: 3,
  rating: 4.7,
  stock: 80,
  sold: 310,
  description:
    "Gentle foaming cleanser enriched with natural extracts for fresh and clear skin.",
  images: [
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1b3?auto=format&fit=crop&w=1200&q=80",
  ],
},

{
  id: 114,
  title: "Minimalist Wall Clock",
  price: 39,
  category: "Home Decor",
  vendorId: 3,
  rating: 4.5,
  stock: 45,
  sold: 150,
  description:
    "Silent sweep wall clock with modern minimalist design for home and office.",
  images: [
    "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1200&q=80",
  ],
},
];

export const users = [
  {
    id: 1,
    name: "Ava Reynolds",
    role: "admin",
    email: "admin@ecommerces.io",
    mobile: "+1 415 555 0142",
    status: "active",
  },
  {
    id: 2,
    name: "Noah Carter",
    role: "vendor",
    email: "noah@aurastore.com",
    mobile: "+1 415 555 0189",
    status: "approved",
  },
  {
    id: 3,
    name: "Mia Lewis",
    role: "vendor",
    email: "mia@lumenhub.com",
    mobile: "+1 415 555 0116",
    status: "pending",
  },
  {
    id: 4,
    name: "Liam Brooks",
    role: "customer",
    email: "liam@example.com",
    mobile: "+91 98765 43210",
    status: "active",
  },
  {
    id: 5,
    name: "Sophia Clark",
    role: "customer",
    email: "sophia@example.com",
    mobile: "+91 91234 56789",
    status: "active",
  },
];

export const orders = [
  {
    id: "ORD-2101",
    customerId: 4,
    vendorId: 2,
    date: "2026-03-19",
    amount: 328,
    status: "Delivered",
    items: [101, 107],
    tracking: "Out for delivery",
  },
  {
    id: "ORD-2102",
    customerId: 5,
    vendorId: 3,
    date: "2026-03-22",
    amount: 129,
    status: "Shipped",
    items: [106],
    tracking: "In transit",
  },
  {
    id: "ORD-2103",
    customerId: 4,
    vendorId: 3,
    date: "2026-03-24",
    amount: 383,
    status: "Processing",
    items: [108, 104],
    tracking: "Packing",
  },
];

export const payments = [
  {
    id: "PAY-4401",
    orderId: "ORD-2101",
    customerId: 4,
    vendorId: 2,
    amount: 328,
    method: "Card",
    gateway: "Stripe",
    status: "Paid",
    paidOn: "2026-03-19",
  },
  {
    id: "PAY-4402",
    orderId: "ORD-2102",
    customerId: 5,
    vendorId: 3,
    amount: 129,
    method: "UPI",
    gateway: "Razorpay",
    status: "Pending",
    paidOn: "2026-03-22",
  },
  {
    id: "PAY-4403",
    orderId: "ORD-2103",
    customerId: 4,
    vendorId: 3,
    amount: 383,
    method: "NetBanking",
    gateway: "PayPal",
    status: "Processing",
    paidOn: "2026-03-24",
  },
  {
    id: "PAY-4404",
    orderId: "ORD-2100",
    customerId: 5,
    vendorId: 2,
    amount: 89,
    method: "Wallet",
    gateway: "Stripe",
    status: "Failed",
    paidOn: "2026-03-18",
  },
];

export const reviews = [
  {
    id: 1,
    productId: 101,
    user: "Sophia Clark",
    vendorId: 2,
    rating: 5,
    message: "Superb sound quality and battery life.",
  },
  {
    id: 2,
    productId: 106,
    user: "Liam Brooks",
    vendorId: 3,
    rating: 4,
    message: "Comfortable for long runs, very responsive cushioning.",
  },
  {
    id: 3,
    productId: 105,
    user: "Olivia James",
    vendorId: 2,
    rating: 5,
    message: "Visible glow in a week, lightweight formula.",
  },
];

export const blogs = [
  {
    id: 1,
    title: "How to Build a Winning Multi-Vendor Storefront",
    excerpt:
      "Design principles and growth levers used by top marketplaces to improve conversion.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-12",
  },
  {
    id: 2,
    title: "Premium Product Photography Tips for Sellers",
    excerpt:
      "Lighting, backdrop, and composition techniques to make product listings stand out.",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-15",
  },
  {
    id: 3,
    title: "Customer Retention Playbook for E-commerce Teams",
    excerpt:
      "Lifecycle campaigns and experience upgrades that increase repeat purchases.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-20",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Charlotte Hall",
    role: "Operations Manager, Northline",
    quote:
      "The platform quality feels enterprise-grade. Our vendors onboarded in days, not weeks.",
  },
  {
    id: 2,
    name: "Ethan Scott",
    role: "Founder, Grain & Co.",
    quote:
      "It gives us a polished customer journey and a powerful vendor system in one product.",
  },
  {
    id: 3,
    name: "Aria Hughes",
    role: "Head of Growth, Urban Nest",
    quote:
      "Fast dashboards, clear analytics, and premium storefront design helped us convert better.",
  },
];

export const team = [
  { id: 1, name: "Ava Reynolds", title: "CEO", image: "AR" },
  { id: 2, name: "Noah Carter", title: "Marketplace Lead", image: "NC" },
  { id: 3, name: "Mia Lewis", title: "Design Director", image: "ML" },
];

export const coupons = [
  { id: 1, code: "PREMIUM20", discount: 20, status: "active" },
  { id: 2, code: "WELCOME10", discount: 10, status: "active" },
  { id: 3, code: "FLASH15", discount: 15, status: "expired" },
];

export const earnings = [
  { month: "Jan", total: 12000 },
  { month: "Feb", total: 14500 },
  { month: "Mar", total: 18900 },
  { month: "Apr", total: 16200 },
  { month: "May", total: 21800 },
  { month: "Jun", total: 24400 },
];
