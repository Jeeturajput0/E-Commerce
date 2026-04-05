import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
  LogOut,
  Settings,
  ShoppingBag,
} from "lucide-react";

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CategoriesBar from "../../pages/store/CategoriesBar";
import logo from "../../../public/logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/odernow", label: "Order Now" }, // typo fix
  { to: "/blog", label: "Blog" },
];

const dashboardLinks = [
  { role: "admin", label: "Admin Dashboard" },
  { role: "vendor", label: "Vendor Dashboard" },
  { role: "customer", label: "Customer Dashboard" },
];

const Navbar = () => {
  const { cartCount, activeRole, setRole, dashboardMap, theme, toggleTheme } =
    useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false); // ✅ yaha shift kiya
  const navigate = useNavigate();

  const handleDashboardAccess = (role) => {
    setRole(role);
    navigate(dashboardMap[role]);
    setMobileOpen(false);
  };

  const navItemStyle = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-primary-600 text-white dark:bg-primary-500 dark:text-white"
        : "text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-[1.75rem] border border-white/70 bg-white/75 px-4 py-3 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/70">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo pic"
            className="  rounded-2xl h-[55px] w-[280px]"
          />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-900 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navItemStyle}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center  gap-2 lg:flex">
          <div className="flex w-64 items-center rounded-full border border-slate-200/80 bg-white/90 px-2 py-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <Search className="ml-2 h-7 w-88 text-slate-400" />
            <input
              type="search"
              placeholder="Search essentials..."
              className="w-auto bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
            />
          </div>
          <Link
            to="/watchlist"
            className="relative rounded-full border border-slate-200/80 bg-white/90 p-2.5 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Heart className="h-5 w-5" />
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

          {/* <Link
            to="/profile"
            className="relative rounded-full border border-slate-200/80 bg-white/90 p-2.5 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <User className="h-5 w-5" />
          </Link> */}
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200/80 bg-white/90 p-2.5 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-full border p-2 hover:bg-gray-100"
            >
              <User />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl p-2 z-50"
                >
                  <Link
                    to="/profile"
                    className="flex gap-2 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <User size={18} /> My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="flex gap-2 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ShoppingBag size={18} /> Orders
                  </Link>

                  <Link
                    to="/settings"
                    className="flex gap-2 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings size={18} /> Settings
                  </Link>

                  <button className="flex gap-2 p-2 hover:bg-red-100 rounded-lg text-red-500 w-full">
                    <LogOut size={18} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            {/* <Link
            to="/auth"
            className="rounded-full border border-secondary-200/80 bg-white/90 px-4 py-2.5 text-sm font-semibold text-secondary-700 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-secondary-700 dark:bg-slate-900 dark:text-secondary-200 dark:hover:bg-slate-800"
          >
            Login / Sign Up
          </Link> */}
          </div>
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-2xl border border-secondary-200 bg-white/90 p-2.5 text-secondary-700 dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-200 lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 w-full max-w-7xl rounded-[1.75rem] border border-secondary-200/70 bg-white/90 p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-secondary-700 dark:bg-secondary-900/90 lg:hidden"
        >
          <nav className="mb-4 grid gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-primary-600 text-white dark:bg-primary-500 dark:text-white"
                      : "bg-slate-100/80 text-secondary-700 dark:bg-slate-800 dark:text-secondary-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mb-4 flex items-center rounded-full border border-slate-200/80 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-950">
            <Search className="ml-2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search essentials..."
              className="w-full bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
            />
          </div>

          <div className="grid gap-2">
            {dashboardLinks.map((item) => (
              <button
                key={item.role}
                onClick={() => handleDashboardAccess(item.role)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
                  activeRole === item.role
                    ? "border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500 dark:text-white"
                    : "border-secondary-200 text-secondary-700 dark:border-secondary-700 dark:text-secondary-200"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-secondary-200 px-4 py-3 text-sm dark:border-secondary-700"
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-secondary-200 px-4 py-3 text-sm dark:border-secondary-700"
              >
                Login / Sign Up
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-2xl border border-secondary-200 px-4 py-3 text-sm dark:border-secondary-700"
              >
                {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <CategoriesBar />
    </header>
  );
};

export default Navbar;
