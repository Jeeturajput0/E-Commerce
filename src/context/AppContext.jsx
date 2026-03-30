import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  blogs as blogsData,
  categories as categoriesData,
  coupons as couponsData,
  earnings as earningsData,
  orders as ordersData,
  payments as paymentsData,
  products as productsData,
  reviews as reviewsData,
  team as teamData,
  testimonials as testimonialsData,
  users as usersData,
} from "../data/dummyData";

const AppContext = createContext(null);

const dashboardMap = {
  admin: "/admin/dashboard",
  vendor: "/vendor/dashboard",
  customer: "/user/dashboard",
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [users, setUsers] = useState(usersData);
  const [orders, setOrders] = useState(ordersData);
  const [payments, setPayments] = useState(paymentsData);
  const [reviews] = useState(reviewsData);
  const [blogs] = useState(blogsData);
  const [categories] = useState(categoriesData);
  const [coupons, setCoupons] = useState(couponsData);
  const [earnings] = useState(earningsData);
  const [testimonials] = useState(testimonialsData);
  const [team] = useState(teamData);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [activeRole, setActiveRole] = useState("customer");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("ec-theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("ec-theme", theme);
  }, [theme]);

  const currentUser = useMemo(() => {
    if (activeRole === "admin") return users.find((user) => user.role === "admin");
    if (activeRole === "vendor") {
      return (
        users.find((user) => user.role === "vendor" && user.status === "approved") ||
        users.find((user) => user.role === "vendor")
      );
    }
    return users.find((user) => user.role === "customer");
  }, [activeRole, users]);

  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2800);
  };

  const setRole = (role) => {
    setActiveRole(role);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const addProduct = (payload) => {
    const nextId =
      products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;
    setProducts((prev) => [
      ...prev,
      {
        ...payload,
        id: nextId,
        rating: payload.rating || 4.5,
        sold: payload.sold || 0,
        images:
          payload.images?.length > 0
            ? payload.images
            : [
                "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=1200&q=80",
              ],
      },
    ]);
    addToast("Product created successfully");
  };

  const updateProduct = (id, payload) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, ...payload } : product))
    );
    addToast("Product updated");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    addToast("Product removed", "warning");
  };

  const addToCart = (productId, quantity = 1) => {
    setCart((prev) => {
      const item = prev.find((entry) => entry.productId === productId);
      if (item) {
        return prev.map((entry) =>
          entry.productId === productId
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }
      return [...prev, { productId, quantity }];
    });
    addToast("Added to cart");
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const removeCartItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    addToast("Item removed from cart", "warning");
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast("Removed from wishlist", "warning");
        return prev.filter((id) => id !== productId);
      }
      addToast("Saved to wishlist");
      return [...prev, productId];
    });
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    addToast("Order status updated");
  };

  const toggleVendorApproval = (vendorId) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== vendorId) return user;
        const status = user.status === "approved" ? "pending" : "approved";
        return { ...user, status };
      })
    );
    addToast("Vendor status changed");
  };

  const updateUserStatus = (userId, status) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status } : user))
    );
    addToast("User status updated");
  };

  const addCoupon = (coupon) => {
    const id = Date.now();
    setCoupons((prev) => [...prev, { id, ...coupon }]);
    addToast("Coupon created");
  };

  const updateCouponStatus = (couponId, status) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === couponId ? { ...coupon, status } : coupon
      )
    );
    addToast("Coupon status updated");
  };

  const addPayment = (payload) => {
    const id = `PAY-${Math.floor(1000 + Math.random() * 9000)}`;
    const paidOn = payload.paidOn || new Date().toISOString().slice(0, 10);
    setPayments((prev) => [{ id, paidOn, ...payload }, ...prev]);
    addToast("Payment added");
  };

  const updatePaymentStatus = (paymentId, status) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId ? { ...payment, status } : payment
      )
    );
    addToast("Payment status updated");
  };

  const cartDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) return null;
          return { ...item, product, subtotal: product.price * item.quantity };
        })
        .filter(Boolean),
    [cart, products]
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartDetails.reduce((acc, item) => acc + item.subtotal, 0);

  const value = {
    dashboardMap,
    products,
    users,
    orders,
    payments,
    reviews,
    blogs,
    categories,
    coupons,
    earnings,
    testimonials,
    team,
    cart,
    cartDetails,
    wishlist,
    cartCount,
    cartTotal,
    activeRole,
    setRole,
    currentUser,
    toasts,
    addToast,
    theme,
    toggleTheme,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    updateCartQty,
    removeCartItem,
    toggleWishlist,
    updateOrderStatus,
    toggleVendorApproval,
    updateUserStatus,
    addCoupon,
    updateCouponStatus,
    addPayment,
    updatePaymentStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
};
