import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import {
  AdminBanners,
  AdminBlog,
  AdminCategories,
  AdminColors,
  AdminCoupons,
  AdminCustomers,
  AdminDashboardLayout,
  AdminOrders,
  AdminOverview,
  AdminPayments,
  AdminProducts,
  AdminReviews,
  AdminSettings,
  AdminSizes,
  AdminVendors,
} from "./pages/dashboards/AdminDashboard";
import {
  CustomerAddress,
  CustomerCart,
  CustomerDashboardLayout,
  CustomerOrders,
  CustomerOverview,
  CustomerProfile,
  CustomerWishlist,
} from "./pages/dashboards/CustomerDashboard";
import {
  VendorAddProduct,
  VendorDashboardLayout,
  VendorEarnings,
  VendorOrders,
  VendorOverview,
  VendorProducts,
  VendorReviews,
} from "./pages/dashboards/VendorDashboard";
import AboutPage from "./pages/store/AboutPage";
import BlogPage from "./pages/store/BlogPage";
import CartPage from "./pages/store/CartPage";
import CategoriesPage from "./pages/store/CategoriesPage";
import ContactPage from "./pages/store/ContactPage";
import HomePage from "./pages/store/HomePage";
import ProductDetailsPage from "./pages/store/ProductDetailsPage";
import ShopPage from "./pages/store/ShopPage";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/:productId" element={<ProductDetailsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="colors" element={<AdminColors />} />
          <Route path="sizes" element={<AdminSizes />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        <Route path="/vendor/dashboard" element={<VendorDashboardLayout />}>
          <Route index element={<VendorOverview />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="add-product" element={<VendorAddProduct />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="earnings" element={<VendorEarnings />} />
          <Route path="reviews" element={<VendorReviews />} />
          <Route path="*" element={<Navigate to="/vendor/dashboard" replace />} />
        </Route>

        <Route path="/user/dashboard" element={<CustomerDashboardLayout />}>
          <Route index element={<CustomerOverview />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="wishlist" element={<CustomerWishlist />} />
          <Route path="cart" element={<CustomerCart />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="address" element={<CustomerAddress />} />
          <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
