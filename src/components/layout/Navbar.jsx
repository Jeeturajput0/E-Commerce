import { motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/auth", label: "Login / Sign Up" },
];

const dashboardLinks = [
  { role: "admin", label: "Admin Dashboard" },
  { role: "vendor", label: "Vendor Dashboard" },
  { role: "customer", label: "Customer Dashboard" },
];

const Navbar = () => {
  const {
    cartCount,
    activeRole,
    setRole,
    dashboardMap,
    theme,
    toggleTheme,
    currentUser,
  } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardAccess = (role) => {
    setRole(role);
    navigate(dashboardMap[role]);
    setDashboardOpen(false);
    setMobileOpen(false);
  };

  const navItemStyle = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive
        ? "text-slate-900 dark:text-slate-100"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          E-Commerces
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navItemStyle}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-primary-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/auth"
            className="rounded-full border border-secondary-200 px-4 py-2 text-sm font-semibold text-secondary-700 transition hover:bg-slate-100 dark:border-secondary-700 dark:text-secondary-200 dark:hover:bg-slate-800"
          >
            Login / Sign Up
          </Link>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setDashboardOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-2xl border border-secondary-200 px-3 py-2 text-sm font-semibold text-secondary-700 transition hover:bg-secondary-100 dark:border-secondary-700 dark:text-secondary-200 dark:hover:bg-secondary-800"
            >
              Dashboard Access
              <ChevronDown className="h-4 w-4" />
            </button>
            {dashboardOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl border border-secondary-200 bg-white p-2 shadow-xl dark:border-secondary-700 dark:bg-secondary-900"
              >
                {dashboardLinks.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleDashboardAccess(item.role)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                      activeRole === item.role
                        ? "bg-primary-600 text-white dark:bg-primary-500 dark:text-white"
                        : "text-secondary-700 hover:bg-secondary-100 dark:text-secondary-200 dark:hover:bg-secondary-800"
                    }`}
                  >
                    {item.label}
                    {activeRole === item.role && (
                      <span className="text-[10px] uppercase">Active</span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <span className="rounded-xl bg-secondary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-600 dark:bg-secondary-800 dark:text-secondary-200">
            {currentUser?.role || "user"}
          </span>
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-xl border border-secondary-200 p-2 text-secondary-700 dark:border-secondary-700 dark:text-secondary-200 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-secondary-200/40 bg-white p-4 dark:border-secondary-700 dark:bg-secondary-900 lg:hidden">
          <nav className="mb-4 grid gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-semibold ${
                    isActive
                      ? "bg-primary-600 text-white dark:bg-primary-500 dark:text-white"
                      : "text-secondary-700 dark:text-secondary-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="grid gap-2">
            {dashboardLinks.map((item) => (
              <button
                key={item.role}
                onClick={() => handleDashboardAccess(item.role)}
                className="rounded-xl border border-secondary-200 px-3 py-2 text-left text-sm font-semibold text-secondary-700 dark:border-secondary-700 dark:text-secondary-200"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-secondary-200 px-3 py-2 text-sm dark:border-secondary-700"
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-secondary-200 px-3 py-2 text-sm dark:border-secondary-700"
              >
                Login / Sign Up
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-xl border border-secondary-200 px-3 py-2 text-sm dark:border-secondary-700"
              >
                {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
