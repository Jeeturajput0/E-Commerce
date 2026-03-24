import headphonesImg from "@/assets/products/headphones.jpg";
import smartwatchImg from "@/assets/products/smartwatch.jpg";
import laptopImg from "@/assets/products/laptop.jpg";
import cameraImg from "@/assets/products/camera.jpg";
import smartphoneImg from "@/assets/products/smartphone.jpg";
import controllerImg from "@/assets/products/controller.jpg";
import powerbankImg from "@/assets/products/powerbank.jpg";
import tabletImg from "@/assets/products/tablet.jpg";
import earbudsImg from "@/assets/products/earbuds.jpg";
import vrHeadsetImg from "@/assets/products/vr-headset.jpg";
export const products = [
    { id: 1, name: "Pro Wireless Headphones", price: 225, originalPrice: 299, image: headphonesImg, rating: 4.5, reviews: 128, category: "Headphones", badge: "Sale", description: "Premium noise-cancelling wireless headphones with 40-hour battery life and Hi-Res audio support.", inStock: true },
    { id: 2, name: "Smart Watch Ultra", price: 519.95, image: smartwatchImg, rating: 4.8, reviews: 256, category: "Smart Watches", badge: "New", description: "Advanced smartwatch with LTE, GPS, health monitoring, and titanium case.", inStock: true },
    { id: 3, name: "ProBook Laptop 15", price: 1299, originalPrice: 1499, image: laptopImg, rating: 4.7, reviews: 89, category: "Computers & Laptops", badge: "-13%", description: "Powerful laptop with 12th Gen processor, 16GB RAM, and 512GB SSD.", inStock: true },
    { id: 4, name: "Camera C430W 4K", price: 425.95, image: cameraImg, rating: 4.6, reviews: 67, category: "Cameras", description: "Waterproof 4K camera with optical image stabilization and 20x zoom.", inStock: true },
    { id: 5, name: "Smartphone 8s 64GB", price: 334.95, originalPrice: 399, image: smartphoneImg, rating: 4.4, reviews: 312, category: "Smartphones", badge: "Sale", description: "Flagship smartphone with AMOLED display, triple camera, and 5G connectivity.", inStock: true },
    { id: 6, name: "GamePad Pro Controller", price: 59.99, image: controllerImg, rating: 4.3, reviews: 198, category: "Accessories", description: "Wireless gaming controller with haptic feedback and adaptive triggers.", inStock: true },
    { id: 7, name: "PowerBank 11300 mAh", price: 249.5, image: powerbankImg, rating: 4.2, reviews: 445, category: "Accessories", description: "High-capacity portable charger with USB-C PD and dual USB-A ports.", inStock: true },
    { id: 8, name: "Tablet White Elitebook", price: 292.95, originalPrice: 349, image: tabletImg, rating: 4.5, reviews: 156, category: "Computers & Laptops", badge: "-16%", description: "Lightweight tablet with retina display, stylus support, and all-day battery.", inStock: true },
    { id: 9, name: "Wireless Earbuds Pro", price: 189, originalPrice: 229, image: earbudsImg, rating: 4.6, reviews: 534, category: "Headphones", badge: "Hot", description: "True wireless earbuds with active noise cancellation and spatial audio.", inStock: true },
    { id: 10, name: "Gear VR Headset", price: 119.95, image: vrHeadsetImg, rating: 4.1, reviews: 87, category: "Accessories", description: "Immersive virtual reality headset with 110° field of view and 4K display.", inStock: false },
];
export const categories = [
    { name: "Smart Watches", icon: "Watch", count: 24 },
    { name: "Headphones", icon: "Headphones", count: 36 },
    { name: "Computers & Laptops", icon: "Laptop", count: 18 },
    { name: "Cameras", icon: "Camera", count: 12 },
    { name: "Smartphones", icon: "Smartphone", count: 42 },
    { name: "Accessories", icon: "Cable", count: 65 },
];
export const blogPosts = [
    { id: 1, title: "The Future of Wearable Technology in 2026", excerpt: "Explore how smartwatches and fitness trackers are revolutionizing health monitoring with AI-powered insights.", author: "Peter", date: "Mar 10, 2026", image: "blog-1" },
    { id: 2, title: "Best Smart Watches for Fitness Enthusiasts", excerpt: "Our curated list of the top smartwatches that combine style with advanced health tracking features.", author: "Sarah", date: "Mar 8, 2026", image: "blog-2" },
    { id: 3, title: "Essential Tech Accessories for Your Home Office", excerpt: "Transform your workspace with these must-have gadgets that boost productivity and comfort.", author: "Mike", date: "Mar 5, 2026", image: "blog-3" },
];
