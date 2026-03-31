import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { initialBlogs, initialCoupons, initialCustomers, initialMessages, initialOrders, initialProducts, initialReviews, } from "@/features/admin/data/mockData";
const AdminDashboardContext = createContext(null);
export function AdminDashboardProvider({ children }) {
    const [products, setProducts] = useState(initialProducts);
    const [orders, setOrders] = useState(initialOrders);
    const [reviews, setReviews] = useState(initialReviews);
    const [coupons, setCoupons] = useState(initialCoupons);
    const [messages, setMessages] = useState(initialMessages);
    const [selectedThreadId, setSelectedThreadId] = useState(initialMessages[0]?.id ?? 0);
    const [gridView, setGridView] = useState(true);
    const addProduct = (product) => {
        const nextId = Math.max(...products.map((item) => item.id), 0) + 1;
        const sku = `TH-${product.category.slice(0, 3).toUpperCase()}-${String(7000 + nextId)}`;
        setProducts((current) => [{ ...product, id: nextId, sku }, ...current]);
        toast.success(`${product.name} added to inventory`);
    };
    const deleteProduct = (id) => {
        setProducts((current) => current.filter((item) => item.id !== id));
        toast.success("Product removed");
    };
    const updateOrderDelivery = (id, delivery) => {
        setOrders((current) => current.map((item) => (item.id === id ? { ...item, delivery } : item)));
        toast.success(`Delivery status updated to ${delivery}`);
    };
    const approveReview = (id) => {
        setReviews((current) => current.map((item) => (item.id === id ? { ...item, status: "Approved" } : item)));
        toast.success("Review approved");
    };
    const deleteReview = (id) => {
        setReviews((current) => current.filter((item) => item.id !== id));
        toast.success("Review deleted");
    };
    const toggleCoupon = (id) => {
        setCoupons((current) => current.map((item) => item.id === id
            ? { ...item, enabled: !item.enabled, status: item.enabled ? "Paused" : "Active" }
            : item));
    };
    const selectThread = (id) => setSelectedThreadId(id);
    const sendMessage = (text) => {
        if (!text.trim())
            return;
        setMessages((current) => current.map((thread) => thread.id === selectedThreadId
            ? {
                ...thread,
                messages: [
                    ...thread.messages,
                    {
                        id: thread.messages.length + 1,
                        sender: "admin",
                        text,
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                ],
            }
            : thread));
    };
    const value = {
        products,
        orders,
        customers: initialCustomers,
        reviews,
        blogs: initialBlogs,
        coupons,
        messages,
        selectedThreadId,
        gridView,
        setGridView,
        addProduct,
        deleteProduct,
        updateOrderDelivery,
        approveReview,
        deleteReview,
        toggleCoupon,
        selectThread,
        sendMessage,
    };
    return <AdminDashboardContext.Provider value={value}>{children}</AdminDashboardContext.Provider>;
}
export function useAdminDashboard() {
    const context = useContext(AdminDashboardContext);
    if (!context) {
        throw new Error("useAdminDashboard must be used within AdminDashboardProvider");
    }
    return context;
}

