import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/layout/Layout";
import AdminLayout from "@/admin/layout/AdminLayout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import DashboardHome from "@/admin/pages/DashboardHome";
import ProductsPage from "@/admin/pages/ProductsPage";
import CategoriesPage from "@/admin/pages/CategoriesPage";
import OrdersPage from "@/admin/pages/OrdersPage";
import CustomersPage from "@/admin/pages/CustomersPage";
import ReviewsPage from "@/admin/pages/ReviewsPage";
import BlogAdminPage from "@/admin/pages/BlogAdminPage";
import CouponsPage from "@/admin/pages/CouponsPage";
import MessagesPage from "@/admin/pages/MessagesPage";
import SettingsPage from "@/admin/pages/SettingsPage";
const queryClient = new QueryClient();
const App = () => (<QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="electrostore-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />}/>
              <Route path="/shop" element={<Shop />}/>
              <Route path="/product/:id" element={<ProductDetails />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/blog" element={<Blog />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/profile" element={<Profile />}/>
            </Route>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<DashboardHome />}/>
              <Route path="products" element={<ProductsPage />}/>
              <Route path="categories" element={<CategoriesPage />}/>
              <Route path="orders" element={<OrdersPage />}/>
              <Route path="customers" element={<CustomersPage />}/>
              <Route path="reviews" element={<ReviewsPage />}/>
              <Route path="blog" element={<BlogAdminPage />}/>
              <Route path="coupons" element={<CouponsPage />}/>
              <Route path="messages" element={<MessagesPage />}/>
              <Route path="settings" element={<SettingsPage />}/>
            </Route>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>);
export default App;
