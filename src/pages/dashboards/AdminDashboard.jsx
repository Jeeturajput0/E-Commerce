import {
  BadgePercent,
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
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
  Sun,
  Star,
  Tags,
  Users,
  UserSquare2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Table from "../../components/common/Table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useApp } from "../../context/AppContext";

const adminLinks = [
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

const panelClass =
  "rounded-2xl border border-slate-300/80 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900";

const headerIconButton =
  "rounded-xl border border-slate-300/80 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800";

const StatusBadge = ({ value }) => { 
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

const MetricCard = ({ title, value, delta, icon: Icon }) => (
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

const SalesTrendChart = ({ data }) => {
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

const CategoryShareChart = ({ data }) => {
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

const OrdersPerformanceChart = ({ data }) => {
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

const AdminHeaderContent = () => {
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
          title="Toggle black theme"
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

export const AdminDashboardLayout = () => {
  const { setRole } = useApp();
  useEffect(() => setRole("admin"), [setRole]);
  return (
    <DashboardLayout
      title="Admin Dashboard"
      role="Admin Panel"
      links={adminLinks}
      headerContent={<AdminHeaderContent />}
    />
  );
};

export const AdminOverview = () => {
  const { earnings, orders, users, products, categories } = useApp();

  const salesTotal = useMemo(
    () => earnings.reduce((acc, item) => acc + item.total, 0),
    [earnings],
  );
  const latestRevenue = earnings[earnings.length - 1]?.total || 0;
  const prevRevenue =
    earnings[earnings.length - 2]?.total || latestRevenue || 1;
  const revenueGrowth =
    prevRevenue > 0 ? ((latestRevenue - prevRevenue) / prevRevenue) * 100 : 0;

  const monthlyOrderVelocity = useMemo(
    () =>
      earnings.map((item, index) => ({
        month: item.month,
        value: Math.max(120, Math.round(item.total / 65) + index * 18),
      })),
    [earnings],
  );

  const orderVelocityTotal = monthlyOrderVelocity.reduce(
    (acc, item) => acc + item.value,
    0,
  );
  const customerReach = Math.round(orderVelocityTotal * 3.6);
  const catalogScale = products.length * 40 + 4;

  const metrics = [
    {
      title: "Revenue",
      value: `$${(salesTotal / 1000).toFixed(1)}K`,
      delta: `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(1)}% vs last month`,
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: orderVelocityTotal.toLocaleString(),
      delta: "+8.2% vs last month",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: customerReach.toLocaleString(),
      delta: "+5.6% vs last month",
      icon: Users,
    },
    {
      title: "Products",
      value: catalogScale.toLocaleString(),
      delta: "+1.4% vs last month",
      icon: Package,
    },
  ];

  const topCategories = categories.slice(0, 4);
  const recentOrders = [...orders]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);
  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);
  const orderTone = {
    Pending: "bg-primary-100 text-primary-700",
    Shipped: "bg-primary-100 text-primary-700",
    Delivered: "bg-slate-100 text-slate-700",
    Processing: "bg-slate-100 text-slate-700",
    Cancelled: "bg-slate-200 text-slate-600",
  };

  return (
    <div className="space-y-6">
        


<div className="space-y-4"> 
        <div className="flex items-center justify-between">   
                <h2 className="font-display text-2xl font-semibold text-primary-600">Performance</h2>

</div>
</div>

      <div className="">

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <SalesTrendChart data={earnings} />
        <CategoryShareChart data={topCategories} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <OrdersPerformanceChart data={monthlyOrderVelocity} />
        <div className="space-y-4">
          <div className={panelClass}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Recent orders
                </h3>
                <p className="text-xs text-slate-500">
                  Latest customer activity
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Live
              </span>
            </div>
            <div className="space-y-2.5">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{order.id}</p>
                      <p className="text-xs text-slate-500">
                        {users.find((user) => user.id === order.customerId)
                          ?.name || "Customer"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${orderTone[order.status] || "bg-slate-100 text-slate-700"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{order.date}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      ${order.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={panelClass}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Products list
                </h3>
                <p className="text-xs text-slate-500">
                  Quick view of top inventory items
                </p>
              </div>
              <span className="rounded-full bg-primary-100 px-2 py-1 text-[10px] font-semibold text-primary-700">
                {topProducts.length} items
              </span>
            </div>
            <div className="space-y-2.5">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-9 w-9 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold leading-tight">
                        {product.title}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Stock {product.stock}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductForm = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial || {
      title: "",
      category: "Electronics",
      price: 99,
      stock: 20,
      description: "",
      images: "",
      vendorId: 2,
    },
  );

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          images: form.images
            ? form.images.split(",").map((value) => value.trim())
            : [],
        });
      }}
    >
      <input
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        placeholder="Product title"
        value={form.title}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, title: event.target.value }))
        }
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="number"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          placeholder="Price"
          value={form.price}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, price: event.target.value }))
          }
        />
        <input
          type="number"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          placeholder="Stock"
          value={form.stock}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, stock: event.target.value }))
          }
        />
      </div>
      <select
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        value={form.category}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, category: event.target.value }))
        }
      >
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Home Decor</option>
        <option>Beauty</option>
        <option>Sports</option>
        <option>Books</option>
      </select>
      <textarea
        rows={3}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        placeholder="Description"
        value={form.description}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, description: event.target.value }))
        }
      />
      <input
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        placeholder="Image URLs separated by comma"
        value={form.images}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, images: event.target.value }))
        }
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);
        const matchesCategory =
          categoryFilter === "all" || product.category === categoryFilter;
        const matchesStock =
          stockFilter === "all" ||
          (stockFilter === "in-stock" && product.stock > 0) ||
          (stockFilter === "low-stock" && product.stock > 0 && product.stock <= 20) ||
          (stockFilter === "out-of-stock" && product.stock === 0);
        return matchesSearch && matchesCategory && matchesStock;
      }),
    [products, searchTerm, categoryFilter, stockFilter],
  );

  const rows = filteredProducts.map((product) => [
    <div key={`title-${product.id}`}>
      <p className="font-semibold">{product.title}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">
        {product.category}
      </p>
    </div>,
    `$${product.price}`,
    product.stock,
    <div key={`action-${product.id}`} className="flex gap-2">
      <Button
        variant="secondary"
        className="px-3 py-1.5 text-xs"
        onClick={() => {
          setEditing({ ...product, images: product.images.join(", ") });
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        variant="ghost"
        className="px-3 py-1.5 text-xs text-primary-600"
        onClick={() => deleteProduct(product.id)}
      >
        Delete
      </Button>
    </div>,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-primary-600">
          Manage Products
        </h2>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <div
        className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]`}
      >
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search product or category..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(event) => setStockFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All stock levels</option>
          <option value="in-stock">In stock</option>
          <option value="low-stock">Low stock (&lt;=20)</option>
          <option value="out-of-stock">Out of stock</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter("all");
            setStockFilter("all");
          }}
        >
          Reset
        </Button>
      </div>
      <Table
        headers={["Product", "Price", "Stock", "Actions"]}
        rows={rows}
        emptyMessage="No products found."
      />
      <Modal
        open={open}
        title={editing ? "Edit Product" : "Add Product"}
        onClose={() => setOpen(false)}
      >
        <ProductForm
          initial={editing}
          onCancel={() => setOpen(false)}
          onSubmit={(form) => {
            if (editing) updateProduct(editing.id, form);
            else addProduct(form);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export const AdminCategories = () => {
  const { categories, products } = useApp();
  const counts = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        total: products.filter((product) => product.category === category.name)
          .length,
      })),
    [categories, products],
  );

  return (
    <div className="space-y-4">
      <h2 className="mb-4 font-display text-2xl font-semibold text-primary-600">
        Categories
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((category) => (
          <Card key={category.id}>
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">
              Active products
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              {category.name}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {category.total}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const AdminOrders = () => {
  const { orders, users, payments, updateOrderStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const customer = users.find((user) => user.id === order.customerId);
        const vendor = users.find((user) => user.id === order.vendorId);
        const payment = payments.find((entry) => entry.orderId === order.id);
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          order.id.toLowerCase().includes(query) ||
          order.tracking.toLowerCase().includes(query) ||
          customer?.name?.toLowerCase().includes(query) ||
          vendor?.name?.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;
        const matchesPayment =
          paymentFilter === "all" ||
          (paymentFilter === "unpaid" && !payment) ||
          payment?.status === paymentFilter;
        return matchesSearch && matchesStatus && matchesPayment;
      }),
    [orders, users, payments, searchTerm, statusFilter, paymentFilter],
  );

  const orderStats = useMemo(() => {
    const total = filteredOrders.length;
    const delivered = filteredOrders.filter((order) => order.status === "Delivered").length;
    const shipped = filteredOrders.filter((order) => order.status === "Shipped").length;
    const processing = filteredOrders.filter((order) => order.status === "Processing").length;
    const cancelled = filteredOrders.filter((order) => order.status === "Cancelled").length;
    const revenue = filteredOrders.reduce((acc, order) => acc + order.amount, 0);
    const avgValue = total > 0 ? revenue / total : 0;
    return { total, delivered, shipped, processing, cancelled, revenue, avgValue };
  }, [filteredOrders]);

  const rows = [...filteredOrders]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((order) => {
      const customer = users.find((user) => user.id === order.customerId);
      const vendor = users.find((user) => user.id === order.vendorId);
      const payment = payments.find((entry) => entry.orderId === order.id);
      return [
        <div key={`order-${order.id}`}>
          <p className="font-semibold">{order.id}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {order.date} � {order.tracking}
          </p>
        </div>,
        <div key={`customer-${order.id}`}>
          <p className="font-semibold">{customer?.name || "Customer"}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {customer?.mobile || customer?.email || "N/A"}
          </p>
        </div>,
        <div key={`vendor-${order.id}`}>
          <p className="font-semibold">{vendor?.name || "Vendor"}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {vendor?.email || "N/A"}
          </p>
        </div>,
        <p key={`amount-${order.id}`} className="font-semibold">${order.amount}</p>,
        <StatusBadge
          key={`payment-${order.id}`}
          value={payment?.status || "Pending"}
        />,
        <select
          key={`status-${order.id}`}
          value={order.status}
          onChange={(event) => updateOrderStatus(order.id, event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>,
      ];
    });

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Orders Management
      </h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search order, customer, vendor..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          value={paymentFilter}
          onChange={(event) => setPaymentFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
          <option value="unpaid">Unlinked payment</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setPaymentFilter("all");
          }}
        >
          Reset
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Total Orders</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.total}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Delivered</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.delivered}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">In Transit</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.shipped + orderStats.processing}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Cancelled</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.cancelled}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Avg Value</p>
          <p className="mt-2 text-2xl font-bold">${orderStats.avgValue.toFixed(0)}</p>
        </Card>
      </div>
      <Table
        headers={["Order", "Customer", "Vendor", "Amount", "Payment", "Fulfillment"]}
        rows={rows}
        emptyMessage="No orders found."
      />
    </div>
  );
};

export const AdminPayments = () => {
  const { payments, orders, users, addPayment, updatePaymentStatus } = useApp();
  const [form, setForm] = useState(() => ({
    orderId: orders[0]?.id || "",
    method: "Card",
    gateway: "Stripe",
    amount: orders[0]?.amount || 100,
    status: "Pending",
  }));
  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === form.orderId) || null,
    [orders, form.orderId],
  );

  const totals = useMemo(() => {
    const paid = payments
      .filter((payment) => payment.status === "Paid")
      .reduce((acc, payment) => acc + payment.amount, 0);
    const pending = payments
      .filter(
        (payment) =>
          payment.status === "Pending" || payment.status === "Processing",
      )
      .reduce((acc, payment) => acc + payment.amount, 0);
    const failed = payments.filter(
      (payment) => payment.status === "Failed",
    ).length;
    return { paid, pending, failed };
  }, [payments]);

  const rows = payments.map((payment) => [
    payment.id,
    payment.orderId,
    users.find((user) => user.id === payment.customerId)?.name || "Customer",
    payment.method,
    `$${payment.amount}`,
    payment.gateway,
    <select
      key={`payment-status-${payment.id}`}
      value={payment.status}
      onChange={(event) => updatePaymentStatus(payment.id, event.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
    >
      <option>Pending</option>
      <option>Processing</option>
      <option>Paid</option>
      <option>Failed</option>
      <option>Refunded</option>
    </select>,
    payment.paidOn,
  ]);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Payment Management
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Collected
          </p>
          <p className="mt-2 text-3xl font-bold">
            ${totals.paid.toLocaleString()}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold">
            ${totals.pending.toLocaleString()}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Failed
          </p>
          <p className="mt-2 text-3xl font-bold">{totals.failed}</p>
        </Card>
      </div>

      <form
        className="grid gap-3 rounded-2xl border border-slate-200/70 p-4 dark:border-slate-700/60 lg:grid-cols-[1.2fr_1fr_1fr_120px_120px_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          const fallbackCustomer = users.find(
            (user) => user.role === "customer",
          );
          const fallbackVendor = users.find((user) => user.role === "vendor");
          addPayment({
            orderId:
              form.orderId || `ORD-MANUAL-${Date.now().toString().slice(-4)}`,
            customerId: selectedOrder?.customerId || fallbackCustomer?.id || 0,
            vendorId: selectedOrder?.vendorId || fallbackVendor?.id || 0,
            amount: Number(form.amount),
            method: form.method,
            gateway: form.gateway,
            status: form.status,
          });
        }}
      >
        <select
          value={form.orderId}
          onChange={(event) => {
            const nextOrder = orders.find(
              (order) => order.id === event.target.value,
            );
            setForm((prev) => ({
              ...prev,
              orderId: event.target.value,
              amount: nextOrder ? nextOrder.amount : prev.amount,
            }));
          }}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id}
            </option>
          ))}
        </select>
        <select
          value={form.method}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, method: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Card</option>
          <option>UPI</option>
          <option>NetBanking</option>
          <option>Wallet</option>
        </select>
        <select
          value={form.gateway}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, gateway: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Stripe</option>
          <option>Razorpay</option>
          <option>PayPal</option>
        </select>
        <input
          type="number"
          min={1}
          value={form.amount}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, amount: Number(event.target.value) }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <select
          value={form.status}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, status: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Pending</option>
          <option>Processing</option>
          <option>Paid</option>
          <option>Failed</option>
          <option>Refunded</option>
        </select>
        <Button type="submit">Add Payment</Button>
      </form>

      <Table
        headers={[
          "Payment ID",
          "Order",
          "Customer",
          "Method",
          "Amount",
          "Gateway",
          "Status",
          "Date",
        ]}
        rows={rows}
      />
    </div>
  );
};

export const AdminCustomers = () => {
  const { users, orders, updateUserStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [spendFilter, setSpendFilter] = useState("all");
  const customers = users.filter((user) => user.role === "customer");
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) => {
        const query = searchTerm.trim().toLowerCase();
        const totalSpend = orders
          .filter((order) => order.customerId === customer.id)
          .reduce((acc, order) => acc + order.amount, 0);
        const matchesSearch =
          query.length === 0 ||
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          (customer.mobile || "").toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "all" || customer.status === statusFilter;
        const matchesSpend =
          spendFilter === "all" ||
          (spendFilter === "high" && totalSpend >= 500) ||
          (spendFilter === "medium" && totalSpend >= 200 && totalSpend < 500) ||
          (spendFilter === "low" && totalSpend < 200);
        return matchesSearch && matchesStatus && matchesSpend;
      }),
    [customers, orders, searchTerm, statusFilter, spendFilter],
  );

  const rows = filteredCustomers.map((customer) => [
    <div key={`customer-name-${customer.id}`}>
      <p className="font-semibold">{customer.name}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">#{customer.id}</p>
    </div>,
    <div key={`customer-contact-${customer.id}`}>
      <p>{customer.email}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">
        {customer.mobile || "N/A"}
      </p>
    </div>,
    (() => {
      const customerOrders = orders.filter((order) => order.customerId === customer.id);
      const latestOrder = [...customerOrders].sort((a, b) => b.date.localeCompare(a.date))[0];
      return (
        <div key={`customer-orders-${customer.id}`}>
          <p className="font-semibold">{customerOrders.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {latestOrder ? `Latest ${latestOrder.id}` : "No orders yet"}
          </p>
        </div>
      );
    })(),
    (() => {
      const totalSpend = orders
        .filter((order) => order.customerId === customer.id)
        .reduce((acc, order) => acc + order.amount, 0);
      return <p key={`customer-spend-${customer.id}`} className="font-semibold">{currencyFormatter.format(totalSpend)}</p>;
    })(),
    <select
      key={`customer-status-${customer.id}`}
      value={customer.status}
      onChange={(event) => updateUserStatus(customer.id, event.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="blocked">Blocked</option>
    </select>,
  ]);
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Customers
      </h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search customer, email, mobile..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>
        <select
          value={spendFilter}
          onChange={(event) => setSpendFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All spend levels</option>
          <option value="high">High spend (88=500)</option>
          <option value="medium">Medium spend (200-499)</option>
          <option value="low">Low spend (&lt;200)</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setSpendFilter("all");
          }}
        >
          Reset
        </Button>
      </div>
      <Table
        headers={["Name", "Contact", "Orders", "Spend", "Status"]}
        rows={rows}
        emptyMessage="No customers found."
      />
    </div>
  );
};

export const AdminMessages = () => {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, from: "customer", text: "Hi, my order ORD-2102 is delayed. Any update?", time: "10:12 AM" },
    { id: 2, from: "admin", text: "We have escalated it to the vendor. Expected dispatch by tonight.", time: "10:15 AM" },
    { id: 3, from: "customer", text: "Thanks, please share tracking once available.", time: "10:16 AM" },
  ]);

  const sendReply = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "admin", text: draft.trim(), time: "Now" },
    ]);
    setDraft("");
  };

  return (
    <div className="space-y-4">
      <PageLead
        label="Inbox"
        title="Messages"
        description="A chat-style support panel with live-feel bubbles and a lightweight reply composer."
      />

      <div className={`${panelClass} p-0`}>
        <div className="border-b border-slate-300/80 px-4 py-3 dark:border-slate-700/80">
          <p className="font-semibold text-primary-600">Support Thread</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Live customer communication
          </p>
        </div>

        <div className="max-h-[420px] space-y-3 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.from === "admin" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  message.from === "admin"
                    ? "bg-primary-600 text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    message.from === "admin"
                      ? "text-primary-100"
                      : "text-slate-500 dark:text-slate-300"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-300/80 p-3 dark:border-slate-700/80">
          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write a reply..."
              className="flex-1 rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
              onKeyDown={(event) => {
                if (event.key === "Enter") sendReply();
              }}
            />
            <Button className="px-3 py-2.5" onClick={sendReply}>
              <SendHorizontal className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminVendors = () => {
  const { users, products, orders, payments, toggleVendorApproval } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [revenueFilter, setRevenueFilter] = useState("all");
  const vendors = users.filter((user) => user.role === "vendor");
  const filteredVendors = useMemo(
    () =>
      vendors.filter((vendor) => {
        const query = searchTerm.trim().toLowerCase();
        const vendorRevenue = payments
          .filter(
            (payment) =>
              payment.vendorId === vendor.id && payment.status === "Paid",
          )
          .reduce((acc, payment) => acc + payment.amount, 0);
        const matchesSearch =
          query.length === 0 ||
          vendor.name.toLowerCase().includes(query) ||
          vendor.email.toLowerCase().includes(query) ||
          (vendor.mobile || "").toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "all" || vendor.status === statusFilter;
        const matchesRevenue =
          revenueFilter === "all" ||
          (revenueFilter === "high" && vendorRevenue >= 300) ||
          (revenueFilter === "low" && vendorRevenue < 300);
        return matchesSearch && matchesStatus && matchesRevenue;
      }),
    [vendors, payments, searchTerm, statusFilter, revenueFilter],
  );

  const vendorStats = useMemo(() => {
    const approved = filteredVendors.filter((vendor) => vendor.status === "approved").length;
    const pending = filteredVendors.filter((vendor) => vendor.status === "pending").length;
    const totalRevenue = payments
      .filter(
        (payment) =>
          payment.status === "Paid" &&
          filteredVendors.some((vendor) => vendor.id === payment.vendorId),
      )
      .reduce((acc, payment) => acc + payment.amount, 0);
    return { approved, pending, totalRevenue };
  }, [filteredVendors, payments]);

  const rows = filteredVendors.map((vendor) => {
    const vendorProducts = products.filter((product) => product.vendorId === vendor.id);
    const vendorOrders = orders.filter((order) => order.vendorId === vendor.id);
    const vendorRevenue = payments
      .filter((payment) => payment.vendorId === vendor.id && payment.status === "Paid")
      .reduce((acc, payment) => acc + payment.amount, 0);

    return [
      <div key={`vendor-name-${vendor.id}`}>
        <p className="font-semibold">{vendor.name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">Vendor #{vendor.id}</p>
      </div>,
      <div key={`vendor-contact-${vendor.id}`}>
        <p>{vendor.email}</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          {vendor.mobile || "N/A"}
        </p>
      </div>,
      <div key={`vendor-catalog-${vendor.id}`}>
        <p className="font-semibold">{vendorProducts.length} products</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          {vendorOrders.length} orders
        </p>
      </div>,
      <div key={`vendor-revenue-${vendor.id}`}>
        <p className="font-semibold">${vendorRevenue.toLocaleString()}</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          Avg ticket $
          {vendorOrders.length > 0
            ? (vendorOrders.reduce((acc, order) => acc + order.amount, 0) / vendorOrders.length).toFixed(0)
            : 0}
        </p>
      </div>,
      <div key={vendor.id} className="flex items-center gap-2">
        <StatusBadge value={vendor.status} />
        <Button
          variant="secondary"
          className="px-2 py-1 text-xs"
          onClick={() => toggleVendorApproval(vendor.id)}
        >
          {vendor.status === "approved" ? "Set Pending" : "Approve"}
        </Button>
      </div>,
    ];
  });
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Vendor Approvals
      </h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search vendor, email, mobile..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={revenueFilter}
          onChange={(event) => setRevenueFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All revenue bands</option>
          <option value="high">High revenue (&lt;=300)</option>
          <option value="low">Low revenue (&lt;300)</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setRevenueFilter("all");
          }}
        >
          Reset
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Approved Vendors</p>
          <p className="mt-2 text-2xl font-bold">{vendorStats.approved}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Pending Vendors</p>
          <p className="mt-2 text-2xl font-bold">{vendorStats.pending}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Paid Revenue</p>
          <p className="mt-2 text-2xl font-bold">${vendorStats.totalRevenue.toLocaleString()}</p>
        </Card>
      </div>
      <Table
        headers={["Vendor", "Contact", "Catalog", "Revenue", "Approval"]}
        rows={rows}
        emptyMessage="No vendors found."
      />
    </div>
  );
};

export const AdminReviews = () => {
  const { reviews, products, users } = useApp();
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Reviews
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Total Reviews</p>
          <p className="mt-2 text-2xl font-bold">{reviews.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Average Rating</p>
          <p className="mt-2 text-2xl font-bold">{averageRating.toFixed(1)} / 5</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Five Star</p>
          <p className="mt-2 text-2xl font-bold">{reviews.filter((review) => review.rating === 5).length}</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <Card key={review.id} className="border border-slate-300/80 dark:border-slate-700/80">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={products.find((product) => product.id === review.productId)?.images?.[0]}
                  alt={products.find((product) => product.id === review.productId)?.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {products.find((product) => product.id === review.productId)?.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    by {review.user} � Vendor {users.find((user) => user.id === review.vendorId)?.name || "N/A"}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-700">
                {review.rating}.0
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {review.message}
            </p>
            <div className="mt-3 flex items-center gap-1 text-primary-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={`${review.id}-${index}`}
                  className={`h-4 w-4 ${index < review.rating ? "fill-primary-500" : "text-slate-300 dark:text-slate-600"}`}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const AdminCoupons = () => {
  const { coupons, addCoupon, updateCouponStatus } = useApp();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(10);
  const rows = coupons.map((coupon) => [
    coupon.code,
    `${coupon.discount}%`,
    <StatusBadge key={`coupon-${coupon.id}`} value={coupon.status} />,
    <Button
      key={`coupon-action-${coupon.id}`}
      variant={coupon.status === "active" ? "secondary" : "primary"}
      className="px-3 py-1.5 text-xs"
      onClick={() =>
        updateCouponStatus(
          coupon.id,
          coupon.status === "active" ? "inactive" : "active",
        )
      }
    >
      {coupon.status === "active" ? "Deactivate" : "Activate"}
    </Button>,
  ]);
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Coupons
      </h2>
      <form
        className="grid gap-3 rounded-2xl border border-slate-200/70 p-4 dark:border-slate-700/60 sm:grid-cols-[1fr_130px_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          addCoupon({ code, discount: Number(discount), status: "active" });
          setCode("");
          setDiscount(10);
        }}
      >
        <input
          required
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="Coupon code"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          type="number"
          min={1}
          max={90}
          value={discount}
          onChange={(event) => setDiscount(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <Button type="submit">Create</Button>
      </form>
      <Table headers={["Code", "Discount", "Status", "Action"]} rows={rows} />
    </div>
  );
};

export const AdminBlog = () => {
  const { blogs } = useApp();
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Blog Management
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <Card key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              className="h-36 w-full rounded-xl object-cover"
            />
            <h3 className="mt-3 font-semibold">{post.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {post.date}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const AdminColors = () => {
  const colorRows = [
    { name: "Primary Blue", hex: "#2563EB", usage: "Buttons / Active states" },
    { name: "Slate", hex: "#64748B", usage: "Secondary text" },
    { name: "Success", hex: "#22C55E", usage: "Paid / Active badges" },
    { name: "Warning", hex: "#F59E0B", usage: "Pending states" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Colors
      </h2>
      <Table
        headers={["Color", "Hex", "Usage"]}
        rows={colorRows.map((item) => [
          <div key={`color-${item.hex}`} className="flex items-center gap-3">
            <span
              className="h-5 w-5 rounded-full border border-slate-300"
              style={{ backgroundColor: item.hex }}
            />
            <span className="font-semibold">{item.name}</span>
          </div>,
          item.hex,
          item.usage,
        ])}
      />
    </div>
  );
};

export const AdminSizes = () => {
  const sizeRows = [
    { size: "Small (S)", products: 18, status: "active" },
    { size: "Medium (M)", products: 29, status: "active" },
    { size: "Large (L)", products: 24, status: "active" },
    { size: "XL", products: 9, status: "inactive" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Sizes
      </h2>
      <Table
        headers={["Size", "Products", "Status"]}
        rows={sizeRows.map((item) => [
          item.size,
          item.products,
          <StatusBadge key={`size-${item.size}`} value={item.status} />,
        ])}
      />
    </div>
  );
};

export const AdminBanners = () => {
  const { blogs } = useApp();

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Banners
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {blogs.map((banner) => (
          <Card key={`banner-${banner.id}`} className="p-3">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-40 w-full rounded-xl object-cover"
            />
            <h3 className="mt-3 font-semibold">{banner.title}</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
              Campaign date: {banner.date}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const AdminProfile = () => {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+91 98765 43210",
    designation: currentUser?.designation || "Super Manager",
    department: currentUser?.department || "Operations",
    location: currentUser?.location || "Mumbai, India",
    accessLevel: currentUser?.accessLevel || "Full Admin Access",
    bio: currentUser?.bio || "Managing platform operations, users, payments, and vendor growth.",
  });

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Profile
      </h2>
      <div className={panelClass}>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateCurrentUserProfile(form);
          }}
        >
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Full name" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder="Phone" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.designation} onChange={(event) => setForm((prev) => ({ ...prev, designation: event.target.value }))} placeholder="Designation" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.department} onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))} placeholder="Department" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.location} onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} placeholder="Location" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.accessLevel} onChange={(event) => setForm((prev) => ({ ...prev, accessLevel: event.target.value }))} placeholder="Access level" className="sm:col-span-2 rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <textarea rows={4} value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} placeholder="Short bio" className="sm:col-span-2 rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AdminSettings = () => {
  const [storeName, setStoreName] = useState("E-Commerces Admin");
  const [supportEmail, setSupportEmail] = useState("support@ecommerces.io");
  const [supportPhone, setSupportPhone] = useState("+91 98765 43210");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [taxRate, setTaxRate] = useState(18);
  const [shippingFee, setShippingFee] = useState(49);
  const [allowCOD, setAllowCOD] = useState(true);
  const [autoApproveVendors, setAutoApproveVendors] = useState(false);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAdmin, setTwoFactorAdmin] = useState(true);

  const fieldClass =
    "rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900";
  const recentActivity = [
    "Payment gateway switched to Stripe (2 hrs ago)",
    "New banner campaign published (Today)",
    "Tax rate updated from 16% to 18% (Yesterday)",
    "Vendor approval policy changed (2 days ago)",
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Settings
      </h2>
      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-4">
          <div className={`${panelClass} space-y-4`}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Store Profile
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Store name
                </span>
                <input
                  value={storeName}
                  onChange={(event) => setStoreName(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Support email
                </span>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(event) => setSupportEmail(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Support mobile
                </span>
                <input
                  value={supportPhone}
                  onChange={(event) => setSupportPhone(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Timezone
                </span>
                <select
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className={fieldClass}
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </label>
            </div>
          </div>

          <div className={`${panelClass} space-y-4`}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Commerce Rules
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Currency
                </span>
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className={fieldClass}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Tax rate (%)
                </span>
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={taxRate}
                  onChange={(event) => setTaxRate(Number(event.target.value))}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Shipping fee
                </span>
                <input
                  type="number"
                  min={0}
                  value={shippingFee}
                  onChange={(event) =>
                    setShippingFee(Number(event.target.value))
                  }
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Allow cash on delivery</span>
              <input
                type="checkbox"
                checked={allowCOD}
                onChange={(event) => setAllowCOD(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Auto approve vendors</span>
              <input
                type="checkbox"
                checked={autoApproveVendors}
                onChange={(event) =>
                  setAutoApproveVendors(event.target.checked)
                }
                className="h-4 w-4 accent-primary-600"
              />
            </label>
          </div>

          <div className={`${panelClass} space-y-3`}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Alerts & Security
            </h3>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Low stock alerts</span>
              <input
                type="checkbox"
                checked={lowStockAlert}
                onChange={(event) => setLowStockAlert(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Order activity alerts</span>
              <input
                type="checkbox"
                checked={orderAlerts}
                onChange={(event) => setOrderAlerts(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Admin 2FA required</span>
              <input
                type="checkbox"
                checked={twoFactorAdmin}
                onChange={(event) => setTwoFactorAdmin(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Maintenance mode</span>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(event) => setMaintenanceMode(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className={panelClass}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Configuration Snapshot
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">Currency</span>
                <span className="font-semibold">{currency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">Tax</span>
                <span className="font-semibold">{taxRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">
                  Shipping fee
                </span>
                <span className="font-semibold">${shippingFee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">
                  Vendor policy
                </span>
                <span className="font-semibold">
                  {autoApproveVendors ? "Auto" : "Manual"}
                </span>
              </div>
            </div>
          </div>

          <div className={panelClass}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Recent Activity
            </h3>
            <div className="mt-3 space-y-2">
              {recentActivity.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700/80 dark:bg-slate-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};


