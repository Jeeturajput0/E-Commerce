import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CategoriesBar from "../../pages/store/CategoriesBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Offers" },
  { to: "/customer", label: "Customer Care" },
];

const dashboardLinks = [
  { role: "admin", label: "Admin Dashboard" },
  { role: "vendor", label: "Vendor Dashboard" },
  { role: "customer", label: "Customer Dashboard" },
];

const profileLinks = [
  { to: "/profile", label: "Profile", icon: User },
  { to: "/orders", label: "Orders", icon: ShoppingBag },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Navbar = () => {
  const {
    cartCount,
    activeRole,
    currentUser,
    dashboardMap,
    logout,
    setRole,
    theme,
    toggleTheme,
    wishlist,
  } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname, location.search]);

  const handleDashboardAccess = (role) => {
    setRole(role);
    navigate(dashboardMap[role]);
  };

  const navItemStyle = ({ isActive }) =>
    `relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-primary-600 text-white shadow-md dark:bg-primary-500"
        : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-8">
      <div className="container-custom">
        {/* Main Navbar Container */}
        <div className="relative z-50 flex items-center justify-between gap-4 rounded-[2rem] border border-white/60 bg-white/70 px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 dark:border-slate-700/60 dark:bg-slate-950/70 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          
          {/* New Attractive E-commerce Logo (PrimeHut) */}
          <Link to="/" className="group flex items-center gap-3">
            {/* Logo Icon */}
            <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
              <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
            </div>
            {/* Brand Text */}
            <div className="flex-col sm:flex hidden">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-xl font-extrabold tracking-tighter text-transparent dark:from-blue-400 dark:to-emerald-400">
                PrimeHut
              </span>
              <span className="text-[0.7rem] font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Online Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 justify-center lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200/50 bg-slate-100/50 p-1.5 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/50">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navItemStyle}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Search Bar */}
            <label className="flex w-64 items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 shadow-sm ring-primary-500/50 transition-all focus-within:ring-2 dark:border-slate-700 dark:bg-slate-900">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search resources..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
              />
            </label>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-700">
              {/* Wishlist */}
              <Link
                to="/user/dashboard/wishlist"
                className="relative rounded-full border border-slate-200/80 bg-white p-2.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
              >
                <Heart className="h-5 w-5" />
                {wishlist?.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative rounded-full border border-slate-200/80 bg-white p-2.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-primary-500/10 dark:hover:text-primary-400"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="rounded-full border border-slate-200/80 bg-white p-2.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-50 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Profile Dropdown */}
              <div className="relative z-[80]">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white py-1.5 pl-1.5 pr-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary-600 to-indigo-500 text-white shadow-inner">
                    <User className="h-4 w-4" />
                  </span>
                  <span className="max-w-[6rem] truncate">{currentUser?.name || "Account"}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                    >
                      {profileLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                      <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />
                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="container-custom relative z-40 lg:hidden overflow-hidden"
          >
            <div className="mt-2 rounded-[2rem] border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/95">
              
              <label className="mb-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search resources..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
                />
              </label>

              <nav className="grid gap-2 mb-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-primary-600 text-white shadow-md dark:bg-primary-500"
                          : "bg-slate-100/50 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mb-4 h-px bg-slate-100 dark:bg-slate-800" />

              <div className="grid gap-2 mb-4">
                <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400">Dashboards</p>
                {dashboardLinks.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleDashboardAccess(item.role)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      activeRole === item.role
                        ? "border-primary-600 bg-primary-600 text-white shadow-md dark:border-primary-500 dark:bg-primary-500"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {profileLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({cartCount})
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  {theme === "light" ? "Dark" : "Light"}
                </button>
                <button
                  onClick={logout}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CategoriesBar />
    </header>
  );
};

export default Navbar;