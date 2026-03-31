import {
  BadgePercent,
  Bell,
  ChevronDown,
  CreditCard,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Moon,
  Package,
  Palette,
  Ruler,
  Search,
  Settings,
  Settings2,
  ShoppingCart,
  Star,
  Sun,
  Tags,
  Users,
  UserSquare2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useApp } from "../../../context/AppContext";

export const adminLinks = [
  {
    path: "/admin/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  { path: "/admin/dashboard/products", label: "Products", icon: Package },
  { path: "/admin/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { path: "/admin/dashboard/payments", label: "Payments", icon: CreditCard },
  { path: "/admin/dashboard/profile", label: "Profile", icon: UserSquare2 },
  { path: "/admin/dashboard/customers", label: "Users", icon: Users },
  {
    path: "/admin/dashboard/categories",
    label: "Categories",
    icon: Tags,
    group: "master",
  },
  { path: "/admin/dashboard/vendors", label: "Vendors", icon: UserSquare2 },
  {
    path: "/admin/dashboard/reviews",
    label: "Reviews",
    icon: Star,
    group: "master",
  },
  {
    path: "/admin/dashboard/coupons",
    label: "Coupons",
    icon: BadgePercent,
    group: "master",
  },
  {
    path: "/admin/dashboard/blog",
    label: "Offers",
    icon: FileText,
    group: "master",
  },
  {
    path: "/admin/dashboard/colors",
    label: "Colors",
    icon: Palette,
    group: "master",
  },
  {
    path: "/admin/dashboard/sizes",
    label: "Sizes",
    icon: Ruler,
    group: "master",
  },
  {
    path: "/admin/dashboard/banners",
    label: "Banners",
    icon: ImageIcon,
    group: "master",
  },
  { path: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

const statusStyles = {
  paid: "bg-primary-100 text-primary-700",
  delivered: "bg-primary-100 text-primary-700",
  active: "bg-primary-100 text-primary-700",
  approved: "bg-primary-100 text-primary-700",
  pending: "bg-primary-100 text-primary-700",
  processing: "bg-primary-100 text-primary-700",
  shipped: "bg-primary-100 text-primary-700",
  failed: "bg-slate-200 text-slate-700",
  cancelled: "bg-slate-200 text-slate-700",
  expired: "bg-slate-200 text-slate-700",
  inactive: "bg-slate-200 text-slate-700",
  refunded: "bg-slate-200 text-slate-700",
};

export const panelClass =
  "rounded-2xl border border-slate-300/80 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900";

export const headerIconButton =
  "rounded-xl border border-slate-300/80 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800";

export const StatusBadge = ({ value }) => {
  const style =
    statusStyles[String(value || "").toLowerCase()] ||
    "bg-slate-100 text-slate-700";
  return (
    <span
      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${style}`}
    >
      {value}
    </span>
  );
};

export const MetricCard = ({ title, value, delta, icon: Icon }) => (
  <div className={`${panelClass} p-5`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-primary-500">
          {title}
        </p>
        <p className="mt-2 text-2xl font-bold text-primary-700 dark:text-primary-300">
          {value}
        </p>
        <p className="mt-2 text-[11px] text-primary-600 dark:text-primary-300">
          {delta}
        </p>
      </div>
      <span className="rounded-xl bg-primary-100 p-2 text-primary-600">
        <Icon className="h-4 w-4" />
      </span>
    </div>
  </div>
);

export const SalesTrendChart = ({ data }) => {
  const width = 520;
  const height = 180;
  const safeMax = Math.max(...data.map((item) => item.total), 1);
  const step = width / Math.max(data.length - 1, 1);
  const points = data
    .map((item, index) => {
      const x = Math.round(index * step);
      const y = Math.round(height - (item.total / safeMax) * (height - 24));
      return `${x},${y}`;
    })
    .join(" ");
  const areaPath = `${points} ${width},${height} 0,${height}`;

  return (
    <div className={panelClass}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Sales trend</h3>
          <p className="text-xs text-slate-500">
            Monthly GMV growth across the last 6 months
          </p>
        </div>
        <span className="rounded-full bg-primary-100 px-2 py-1 text-[10px] font-semibold text-primary-700">
          +19.4%
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full">
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1={0}
            y1={(height / 3) * line}
            x2={width}
            y2={(height / 3) * line}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeDasharray="4 6"
          />
        ))}
        <polyline points={areaPath} fill="rgba(37,99,235,0.14)" stroke="none" />
        <polyline
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-1 grid grid-cols-6 text-xs text-slate-500">
        {data.map((item) => (
          <span key={item.month} className="text-center">
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
};

export const CategoryShareChart = ({ data }) => {
  const total = Math.max(
    data.reduce((acc, item) => acc + item.count, 0),
    1,
  );
  const colors = ["#2563eb", "#111827", "#64748b", "#dbeafe"];
  let start = 0;
  const parts = data.map((item, index) => {
    const percent = (item.count / total) * 100;
    const part = {
      ...item,
      from: start,
      to: start + percent,
      color: colors[index % colors.length],
    };
    start += percent;
    return part;
  });
  const gradient = `conic-gradient(${parts
    .map((part) => `${part.color} ${part.from}% ${part.to}%`)
    .join(", ")})`;

  return (
    <div className={panelClass}>
      <h3 className="font-display text-lg font-semibold">Category share</h3>
      <p className="text-xs text-slate-500">
        Breakdown of revenue by core catalog
      </p>
      <div className="mt-5 flex items-center justify-center">
        <div
          className="relative h-40 w-40 rounded-full"
          style={{ background: gradient }}
        >
          <div className="absolute inset-7 rounded-full bg-white dark:bg-slate-900" />
        </div>
      </div>
      <div className="mt-5 grid gap-2 text-xs">
        {parts.map((part) => (
          <div key={part.id} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-600">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: part.color }}
              />
              {part.name}
            </span>
            <span className="font-semibold">
              {Math.round((part.count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OrdersPerformanceChart = ({ data }) => {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className={panelClass}>
      <h3 className="font-display text-lg font-semibold">Orders performance</h3>
      <p className="text-xs text-slate-500">Review of monthly order velocity</p>
      <div className="mt-4 grid grid-cols-6 items-end gap-3">
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center gap-2">
            <div className="flex h-52 w-full items-end rounded-xl bg-slate-100 px-1.5 pb-1.5 dark:bg-slate-800">
              <div
                className="w-full rounded-lg bg-primary-500"
                style={{ height: `${Math.max(10, (item.value / max) * 100)}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminHeaderContent = () => {
  const { currentUser, theme, toggleTheme, logout } = useApp();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
          Admin Overview
        </p>
        <h2 className="font-display text-2xl font-semibold">Dashboard</h2>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
        <label className="flex min-w-[230px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search products, orders, customers..."
          />
        </label>
        <button className={headerIconButton}>
          <Settings2 className="h-4 w-4" />
        </button>
        <button className={headerIconButton}>
          <Bell className="h-4 w-4" />
        </button>
        <button
          className={headerIconButton}
          onClick={toggleTheme}
          title="Toggle admin theme"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left dark:border-slate-700 dark:bg-slate-800"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
              {currentUser?.name?.[0] || "A"}
            </span>
            <div className="text-xs">
              <p className="font-semibold leading-none">
                {currentUser?.name || "Admin"}
              </p>
              <p className="mt-1 text-slate-500 dark:text-slate-300">
                Super Manager
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          {profileOpen ? (
            <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <button
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/admin/dashboard/profile");
                }}
              >
                <UserSquare2 className="h-4 w-4" />
                Profile
              </button>
              <button
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                onClick={() => {
                  setProfileOpen(false);
                  logout();
                  navigate("/");
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const AdminDashboardShell = () => (
  <DashboardLayout
    title="Admin Dashboard"
    role="Admin Panel"
    links={adminLinks}
    headerContent={<AdminHeaderContent />}
  />
);
