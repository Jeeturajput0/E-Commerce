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
import logo from "../../../public/logo.jpg";

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

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname, location.search]);

  const handleDashboardAccess = (role) => {
    setRole(role);
    navigate(dashboardMap[role]);
  };

  const navItemStyle = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-primary-600 text-white dark:bg-primary-500"
        : "text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-8">
      <div className="container-custom">
        <div className="relative z-50 flex items-center justify-between gap-3 rounded-[1.75rem] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/70">
          <Link to="/" className="">
         <img
  src={logo}
  alt="E-Commerce logo"
  className="h-10 w-auto sm:h-12 lg:h-14 object-contain"
/>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-900 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navItemStyle}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <label className="flex w-64 items-center rounded-full border border-slate-200/80 bg-white/90 px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search essentials..."
                className="w-full bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
              />
            </label>

            <Link
              to="/user/dashboard/wishlist"
              className="relative rounded-full border border-slate-200/80 bg-white/90 p-2.5 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative rounded-full border border-slate-200/80 bg-white/90 p-2.5 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-primary-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200/80 bg-white/90 p-2.5 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <div className="relative z-[80]">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                  <User className="h-4 w-4" />
                </span>
                <span className="max-w-28 truncate">{currentUser?.name || "Account"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                  >
                    {profileLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-2xl border border-secondary-200 bg-white/90 p-2.5 text-secondary-700 dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-200 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-custom relative z-50 mt-3 rounded-[1.75rem] border border-secondary-200/70 bg-white/95 p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-secondary-700 dark:bg-secondary-900/95 lg:hidden"
          >
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-semibold ${
                      isActive
                        ? "bg-primary-600 text-white dark:bg-primary-500"
                        : "bg-slate-100/80 text-secondary-700 dark:bg-slate-800 dark:text-secondary-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <label className="mt-4 flex items-center rounded-full border border-slate-200/80 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search essentials..."
                className="w-full bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
              />
            </label>

            <div className="mt-4 grid gap-2">
              {dashboardLinks.map((item) => (
                <button
                  key={item.role}
                  onClick={() => handleDashboardAccess(item.role)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
                    activeRole === item.role
                      ? "border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500"
                      : "border-secondary-200 text-secondary-700 dark:border-secondary-700 dark:text-secondary-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {profileLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-2xl border border-secondary-200 px-4 py-3 text-center text-sm font-semibold dark:border-secondary-700"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/cart"
                className="rounded-2xl border border-secondary-200 px-4 py-3 text-center text-sm font-semibold dark:border-secondary-700"
              >
                Cart ({cartCount})
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex-1 rounded-2xl border border-secondary-200 px-4 py-3 text-sm font-semibold dark:border-secondary-700"
              >
                {theme === "light" ? "Dark" : "Light"} Mode
              </button>
              <button
                onClick={logout}
                className="flex-1 rounded-2xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 dark:border-red-500/30"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CategoriesBar />
    </header>
  );
};

export default Navbar;
