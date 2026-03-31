import { BarChart3, BookOpenText, Boxes, LayoutDashboard, MessageSquareText, TicketPercent, Settings, ShoppingBag, ShoppingCart, Star, Users, } from "lucide-react";
import laptopImage from "@/assets/products/laptop.jpg";
import cameraImage from "@/assets/products/camera.jpg";
import smartphoneImage from "@/assets/products/smartphone.jpg";
import smartwatchImage from "@/assets/products/smartwatch.jpg";
import tabletImage from "@/assets/products/tablet.jpg";
import headphonesImage from "@/assets/products/headphones.jpg";
import blogOne from "@/assets/blog-1.jpg";
import blogTwo from "@/assets/blog-2.jpg";
import blogThree from "@/assets/blog-3.jpg";
export const adminNavItems = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, end: true },
    { label: "Products", to: "/dashboard/products", icon: ShoppingBag },
    { label: "Categories", to: "/dashboard/categories", icon: Boxes },
    { label: "Orders", to: "/dashboard/orders", icon: ShoppingCart },
    { label: "Customers", to: "/dashboard/customers", icon: Users },
    { label: "Reviews", to: "/dashboard/reviews", icon: Star },
    { label: "Blog", to: "/dashboard/blog", icon: BookOpenText },
    { label: "Coupons", to: "/dashboard/coupons", icon: TicketPercent },
    { label: "Messages", to: "/dashboard/messages", icon: MessageSquareText },
    { label: "Settings", to: "/dashboard/settings", icon: Settings },
];
export const salesData = [
    { month: "Jan", sales: 4000, orders: 160, accessories: 1200, mobiles: 1500, laptops: 1300 },
    { month: "Feb", sales: 6000, orders: 220, accessories: 1600, mobiles: 2200, laptops: 2200 },
    { month: "Mar", sales: 8000, orders: 310, accessories: 1800, mobiles: 2900, laptops: 3300 },
    { month: "Apr", sales: 7200, orders: 280, accessories: 1700, mobiles: 2600, laptops: 2900 },
    { month: "May", sales: 9100, orders: 360, accessories: 2200, mobiles: 3100, laptops: 3800 },
    { month: "Jun", sales: 9800, orders: 410, accessories: 2500, mobiles: 3400, laptops: 3900 },
];
export const categoryDistribution = [
    { name: "Laptops", value: 34, fill: "hsl(var(--primary))" },
    { name: "Mobiles", value: 28, fill: "#111111" },
    { name: "Audio", value: 18, fill: "#525252" },
    { name: "Accessories", value: 20, fill: "#d4d4d4" },
];
export const statsCards = [
    {
        title: "Revenue",
        value: "$148.4K",
        change: "+12.8%",
        trend: "up",
        icon: BarChart3,
        gradient: "from-[#111111] via-[#1f1f1f] to-[#facc15]",
    },
    {
        title: "Orders",
        value: "2,486",
        change: "+8.2%",
        trend: "up",
        icon: ShoppingCart,
        gradient: "from-[#0f0f0f] via-[#2a2a2a] to-[#eab308]",
    },
    {
        title: "Customers",
        value: "8,921",
        change: "+5.6%",
        trend: "up",
        icon: Users,
        gradient: "from-[#171717] via-[#404040] to-[#fde047]",
    },
    {
        title: "Products",
        value: "324",
        change: "-1.4%",
        trend: "down",
        icon: Boxes,
        gradient: "from-[#090909] via-[#262626] to-[#ca8a04]",
    },
];
export const initialProducts = [
    { id: 1, name: "Gaming Laptop", price: 1200, stock: 10, category: "Laptop", image: laptopImage, sku: "TH-LAP-1001" },
    { id: 2, name: "Mirrorless Camera", price: 950, stock: 7, category: "Camera", image: cameraImage, sku: "TH-CAM-2004" },
    { id: 3, name: "Flagship Smartphone", price: 890, stock: 18, category: "Mobile", image: smartphoneImage, sku: "TH-MOB-3021" },
    { id: 4, name: "Luxury Smartwatch", price: 340, stock: 22, category: "Wearables", image: smartwatchImage, sku: "TH-WAT-4082" },
    { id: 5, name: "Ultra Tablet", price: 520, stock: 14, category: "Tablet", image: tabletImage, sku: "TH-TAB-5103" },
    { id: 6, name: "Noise-Cancel Headphones", price: 280, stock: 30, category: "Audio", image: headphonesImage, sku: "TH-AUD-6190" },
];
export const initialCategories = [
    { id: 1, title: "Laptops", count: 28, image: laptopImage },
    { id: 2, title: "Cameras", count: 16, image: cameraImage },
    { id: 3, title: "Mobiles", count: 46, image: smartphoneImage },
    { id: 4, title: "Wearables", count: 19, image: smartwatchImage },
    { id: 5, title: "Tablets", count: 12, image: tabletImage },
    { id: 6, title: "Audio", count: 33, image: headphonesImage },
];
export const initialOrders = [
    { id: "#ORD-1001", customer: "Ayesha Khan", total: "$1,240", status: "Pending", payment: "Paid", delivery: "Processing", date: "Mar 18, 2026" },
    { id: "#ORD-1002", customer: "Ali Raza", total: "$890", status: "Shipped", payment: "Paid", delivery: "In Transit", date: "Mar 17, 2026" },
    { id: "#ORD-1003", customer: "Sara Ahmed", total: "$299", status: "Delivered", payment: "Paid", delivery: "Delivered", date: "Mar 16, 2026" },
    { id: "#ORD-1004", customer: "Usman Tariq", total: "$1,540", status: "Pending", payment: "Pending", delivery: "Pending", date: "Mar 16, 2026" },
    { id: "#ORD-1005", customer: "Noor Fatima", total: "$460", status: "Shipped", payment: "Refunded", delivery: "In Transit", date: "Mar 15, 2026" },
];
export const initialCustomers = [
    { id: 1, name: "Ayesha Khan", email: "ayesha@example.com", orders: 14, spend: "$4,280", status: "Active" },
    { id: 2, name: "Ali Raza", email: "ali@example.com", orders: 9, spend: "$2,910", status: "Active" },
    { id: 3, name: "Sara Ahmed", email: "sara@example.com", orders: 5, spend: "$1,180", status: "Blocked" },
    { id: 4, name: "Noor Fatima", email: "noor@example.com", orders: 12, spend: "$3,660", status: "Active" },
];
export const initialReviews = [
    { id: 1, author: "Hamza", product: "Gaming Laptop", rating: 5, text: "Amazing premium build and crazy fast performance for editing and gaming.", status: "Pending" },
    { id: 2, author: "Mahnoor", product: "Luxury Smartwatch", rating: 4, text: "Stylish design, smooth display, and the battery lasted longer than expected.", status: "Approved" },
    { id: 3, author: "Bilal", product: "Ultra Tablet", rating: 3, text: "Good for media use, but I would love to see more accessories bundled.", status: "Pending" },
];
export const initialBlogs = [
    { id: 1, title: "Top 7 Gadgets For Your Smart Workspace", description: "A curated guide to building a premium desk setup with productivity-first hardware.", image: blogOne, status: "Published" },
    { id: 2, title: "How To Choose A Camera For Content Creation", description: "Compare sensor size, autofocus, stabilization, and creator-friendly features.", image: blogTwo, status: "Draft" },
    { id: 3, title: "Best Wearables To Track Fitness In 2026", description: "A modern shortlist of stylish wearables with useful wellness features.", image: blogThree, status: "Published" },
];
export const initialCoupons = [
    { id: 1, code: "WELCOME15", discount: "15%", expiry: "Apr 15, 2026", status: "Active", enabled: true },
    { id: 2, code: "FLASH25", discount: "25%", expiry: "Mar 28, 2026", status: "Scheduled", enabled: false },
    { id: 3, code: "VIP30", discount: "30%", expiry: "May 01, 2026", status: "Active", enabled: true },
];
export const initialMessages = [
    {
        id: 1,
        customer: "Ayesha Khan",
        avatar: "AK",
        status: "Online",
        messages: [
            { id: 1, sender: "customer", text: "Hi, can I get the gaming laptop in silver?", time: "10:12 AM" },
            { id: 2, sender: "admin", text: "Yes, silver stock arrives tomorrow and I can reserve one for you.", time: "10:14 AM" },
            { id: 3, sender: "customer", text: "Perfect, please keep one on hold for me.", time: "10:15 AM" },
        ],
    },
    {
        id: 2,
        customer: "Ali Raza",
        avatar: "AR",
        status: "Away",
        messages: [
            { id: 1, sender: "customer", text: "My order shows shipped. Can you share ETA?", time: "09:40 AM" },
            { id: 2, sender: "admin", text: "It should reach Lahore within 2 business days.", time: "09:46 AM" },
        ],
    },
];
export const recentOrders = initialOrders.slice(0, 4);
