import {
  BadgeDollarSign,
  Bell,
  ChevronDown,
  ChartColumnBig,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  MessageSquareMore,
  Moon,
  Package,
  PlusCircle,
  Receipt,
  Search,
  Settings2,
  ShoppingCart,
  Sun,
  TicketPercent,
  UserCircle2,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Table from "../../components/common/Table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useApp } from "../../context/AppContext";

const headerIconButton =
  "rounded-xl border border-slate-300/80 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800";

const panelClass =
  "rounded-2xl border border-slate-300/80 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900";

const sectionTitleClass = "font-display text-2xl font-semibold text-primary-600";

const VendorHeaderContent = () => {
  const { currentUser, theme, toggleTheme, logout } = useApp();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
          Vendor Overview
        </p>
        <h2 className="font-display text-2xl font-semibold">Dashboard</h2>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
        <label className="flex min-w-[230px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search products, orders, earnings..."
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
              {currentUser?.name?.[0] || "V"}
            </span>
            <div className="text-xs">
              <p className="font-semibold leading-none">
                {currentUser?.name || "Vendor"}
              </p>
              <p className="mt-1 text-slate-500 dark:text-slate-300">
                Store Manager
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
                  navigate("/vendor/dashboard/profile");
                }}
              >
                <UserCircle2 className="h-4 w-4" />
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

const vendorLinks = [
  { path: "/vendor/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/vendor/dashboard/products", label: "Products", icon: Package },
  { path: "/vendor/dashboard/add-product", label: "Add Product", icon: PlusCircle },
  { path: "/vendor/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { path: "/vendor/dashboard/earnings", label: "Earnings", icon: BadgeDollarSign },
  { path: "/vendor/dashboard/reviews", label: "Reviews", icon: MessageSquareMore },
  {
    path: "/vendor/dashboard/returns",
    label: "Returns",
    icon: Receipt,
    group: "master",
    groupIcon: ClipboardCheck,
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/payouts",
    label: "Payouts",
    icon: Wallet,
    group: "master",
    groupIcon: ClipboardCheck,
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/analytics",
    label: "Analytics",
    icon: ChartColumnBig,
    group: "master",
    groupIcon: ClipboardCheck,
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/coupons",
    label: "Coupons",
    icon: TicketPercent,
    group: "master",
    groupIcon: ClipboardCheck,
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/settings",
    label: "Settings",
    icon: Settings2,
    group: "master",
    groupIcon: ClipboardCheck,
    groupLabel: "Store tools",
  },
];

const EarningsChart = ({ items }) => {
  const max = Math.max(...items.map((item) => item.total));
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item.month} className="grid grid-cols-[38px_1fr_75px] items-center gap-2 text-sm">
          <span className="text-slate-500 dark:text-slate-300">{item.month}</span>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700"
              style={{ width: `${(item.total / max) * 100}%` }}
            />
          </div>
          <span className="text-right font-semibold">${item.total}</span>
        </div>
      ))}
    </div>
  );
};

const VendorProductForm = ({ onSubmit, initial, onCancel }) => {
  const [form, setForm] = useState(
    initial || {
      title: "",
      category: "Electronics",
      price: 99,
      stock: 20,
      description: "",
      images: "",
    }
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
        required
        placeholder="Product title"
        value={form.title}
        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="number"
          required
          placeholder="Price"
          value={form.price}
          onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          type="number"
          required
          placeholder="Stock"
          value={form.stock}
          onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <select
        value={form.category}
        onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
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
        placeholder="Description"
        value={form.description}
        onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />
      <input
        placeholder="Image URLs separated by comma"
        value={form.images}
        onChange={(event) => setForm((prev) => ({ ...prev, images: event.target.value }))}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
};

export const VendorDashboardLayout = () => {
  const { setRole } = useApp();

  useEffect(() => {
    setRole("vendor");
  }, [setRole]);

  return (
    <DashboardLayout
      title="Vendor Dashboard"
      role="Vendor Panel"
      links={vendorLinks}
      headerContent={<VendorHeaderContent />}
    />
  );
};

const VendorLineChart = ({ items }) => {
  const width = 520;
  const height = 180;
  const max = Math.max(...items.map((item) => item.total), 1);
  const step = width / Math.max(items.length - 1, 1);
  const points = items
    .map((item, index) => {
      const x = Math.round(index * step);
      const y = Math.round(height - (item.total / max) * (height - 24));
      return `${x},${y}`;
    })
    .join(" ");
  const area = `${points} ${width},${height} 0,${height}`;

  return (
    <div>
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
        <polyline points={area} fill="rgba(37,99,235,0.14)" stroke="none" />
        <polyline
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-2 grid grid-cols-6 text-center text-xs text-slate-500 dark:text-slate-300">
        {items.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
};

const VendorMetricCard = ({ label, value, hint }) => (
  <div className={panelClass}>
    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
      {label}
    </p>
    <p className="mt-2 text-3xl font-bold">{value}</p>
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">{hint}</p>
  </div>
);

export const VendorOverview = () => {
  const { products, orders, currentUser } = useApp();
  const vendorProducts = products.filter((product) => product.vendorId === currentUser?.id);
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const totalRevenue = vendorOrders.reduce((acc, order) => acc + order.amount, 0);
  const deliveredOrders = vendorOrders.filter((order) => order.status === "Delivered");
  const processingOrders = vendorOrders.filter((order) => ["Pending", "Processing", "Shipped"].includes(order.status));
  const topProducts = [...vendorProducts].sort((a, b) => b.sold - a.sold).slice(0, 4);

  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Performance </h2>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        
        <div className={`${panelClass} space-y-4`}>
          
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-primary-600">
                Store Snapshot
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Daily overview of your sales, orders, and active catalog.
              </p>
            </div>
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              Live
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Fulfillment
              </p>
              <p className="mt-2 text-lg font-semibold">{deliveredOrders.length}/{vendorOrders.length || 1}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Best Seller
              </p>
              <p className="mt-2 text-lg font-semibold">{topProducts[0]?.title || "No products"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Low Stock
              </p>
              <p className="mt-2 text-lg font-semibold">
                {vendorProducts.filter((product) => product.stock < 25).length} items
              </p>
            </div>
          </div>
        </div>

        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">
            Top Products
          </h3>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60"
              >
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    {product.category}
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary-600">
                  {product.sold} sold
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <VendorMetricCard
          label="Sales"
          value={`$${totalRevenue}`}
          hint={`${deliveredOrders.length} delivered orders`}
        />
        <VendorMetricCard
          label="Orders"
          value={vendorOrders.length}
          hint={`${processingOrders.length} active shipments`}
        />
        <VendorMetricCard
          label="Products"
          value={vendorProducts.length}
          hint={`${vendorProducts.filter((product) => product.stock < 25).length} low stock items`}
        />
        <VendorMetricCard
          label="Average Order"
          value={`$${vendorOrders.length ? Math.round(totalRevenue / vendorOrders.length) : 0}`}
          hint="Current store ticket size"
        />
      </div>

      <div className={panelClass}>
        <h3 className="mb-4 font-display text-xl font-semibold">Product Performance</h3>
        <div className="grid gap-2">
          {vendorProducts.slice(0, 5).map((product) => (
            <div key={product.id} className="grid grid-cols-[1fr_70px_70px] items-center gap-3 text-sm">
              <span>{product.title}</span>
              <span className="text-right">${product.price}</span>
              <span className="text-right text-slate-500 dark:text-slate-300">
                Sold {product.sold}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VendorProducts = () => {
  const { products, currentUser, updateProduct, deleteProduct } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const vendorProducts = products.filter((product) => product.vendorId === currentUser?.id);
  const filteredProducts = vendorProducts.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const rows = filteredProducts.map((product) => [
    product.title,
    product.category,
    `$${product.price}`,
    product.stock,
    <div key={product.id} className="flex gap-2">
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
      <h2 className={sectionTitleClass}>My Products</h2>
      <div className={`${panelClass} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`}>
        <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search by product name"
          />
        </label>
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="All">All Categories</option>
          {[...new Set(vendorProducts.map((product) => product.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Table headers={["Title", "Category", "Price", "Stock", "Action"]} rows={rows} />

      <Modal open={open} title="Edit Product" onClose={() => setOpen(false)}>
        <VendorProductForm
          initial={editing}
          onCancel={() => setOpen(false)}
          onSubmit={(form) => {
            updateProduct(editing.id, form);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export const VendorAddProduct = () => {
  const { addProduct, currentUser } = useApp();
  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Add Product</h2>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <VendorProductForm
            onSubmit={(form) => addProduct({ ...form, vendorId: currentUser?.id })}
          />
        </Card>
        <div className="space-y-4">
          <div className={panelClass}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Listing Tips
            </h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p>Use a clear title with brand + product type.</p>
              <p>Add 2-3 image URLs for better conversions.</p>
              <p>Keep stock updated to avoid cancelled orders.</p>
              <p>Write short benefit-focused descriptions.</p>
            </div>
          </div>
          <div className={panelClass}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Quick Checklist
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">Price added</div>
              <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">Stock added</div>
              <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">Category selected</div>
              <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">Images ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VendorOrders = () => {
  const { orders, currentUser, users } = useApp();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const filteredOrders = vendorOrders.filter((order) => {
    const customerName =
      users.find((user) => user.id === order.customerId)?.name || "Customer";
    const matchesQuery =
      order.id.toLowerCase().includes(query.toLowerCase()) ||
      customerName.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const rows = filteredOrders.map((order) => [
    order.id,
    users.find((user) => user.id === order.customerId)?.name || "Customer",
    `$${order.amount}`,
    order.status,
    order.date,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Orders</h2>
      <div className={`${panelClass} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`}>
        <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search by order ID or customer"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="All">All Status</option>
          {[...new Set(vendorOrders.map((order) => order.status))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <Table headers={["Order ID", "Customer", "Amount", "Status", "Date"]} rows={rows} />
    </div>
  );
};

export const VendorEarnings = () => {
  const { earnings, currentUser, orders } = useApp();
  const [query, setQuery] = useState("");
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const total = vendorOrders.reduce((acc, order) => acc + order.amount, 0);
  const paid = Math.round(total * 0.76);
  const pending = total - paid;
  const filteredEarnings = earnings.filter((item) =>
    item.month.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Earnings</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Gross Revenue" value={`$${total}`} hint="All vendor orders combined" />
        <VendorMetricCard label="Paid Out" value={`$${paid}`} hint="Transferred to your account" />
        <VendorMetricCard label="Pending" value={`$${pending}`} hint="Awaiting next payout cycle" />
      </div>

      <div className={`${panelClass} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`}>
        <div>
          <h3 className="font-display text-lg font-semibold text-primary-600">
            Earnings Search
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Filter monthly payout trend by month name.
          </p>
        </div>
        <label className="flex min-w-[240px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search month like Jan"
          />
        </label>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">
            Earnings Trend
          </h3>
          <VendorLineChart items={filteredEarnings.length ? filteredEarnings : earnings} />
        </div>
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">
            Monthly Earnings
          </h3>
          <EarningsChart items={filteredEarnings.length ? filteredEarnings : earnings} />
        </div>
      </div>
    </div>
  );
};

export const VendorReviews = () => {
  const { reviews, currentUser, products } = useApp();
  const vendorReviews = reviews.filter((review) => review.vendorId === currentUser?.id);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Customer Reviews</h2>
      <div className="grid gap-4">
        {vendorReviews.map((review) => (
          <Card key={review.id}>
            <div className="flex items-center justify-between">
              <p className="font-semibold">
                {products.find((product) => product.id === review.productId)?.title}
              </p>
              <p className="text-primary-500">{"*".repeat(review.rating)}</p>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{review.message}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">by {review.user}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const VendorReturns = () => {
  const { orders, currentUser, users } = useApp();
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const returnRequests = vendorOrders
    .filter((order) => ["Delivered", "Cancelled"].includes(order.status))
    .slice(0, 6);

  const rows = returnRequests.map((order, index) => [
    order.id,
    users.find((user) => user.id === order.customerId)?.name || "Customer",
    order.status === "Delivered" ? "Size mismatch" : "Order cancelled before dispatch",
    order.status === "Delivered" ? "Pending review" : "Closed",
    `${index + 1} day${index === 0 ? "" : "s"} ago`,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Returns</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Open Requests" value={rows.filter((row) => row[3] === "Pending review").length} hint="Needs vendor action" />
        <VendorMetricCard label="Resolved" value={rows.filter((row) => row[3] === "Closed").length} hint="Closed this cycle" />
        <VendorMetricCard label="Return Rate" value={`${returnRequests.length ? Math.round((returnRequests.length / Math.max(vendorOrders.length, 1)) * 100) : 0}%`} hint="Across recent vendor orders" />
      </div>
      <Table
        headers={["Order ID", "Customer", "Reason", "Status", "Requested"]}
        rows={rows}
        emptyMessage="No return requests found."
      />
    </div>
  );
};

export const VendorPayouts = () => {
  const { currentUser, orders } = useApp();
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const total = vendorOrders.reduce((acc, order) => acc + order.amount, 0);
  const payoutRows = [
    ["PAYOUT-1001", "Bank transfer", `$${Math.round(total * 0.42)}`, "Paid", "2026-03-08"],
    ["PAYOUT-1002", "Bank transfer", `$${Math.round(total * 0.21)}`, "Processing", "2026-03-18"],
    ["PAYOUT-1003", "UPI", `$${Math.round(total * 0.13)}`, "Scheduled", "2026-03-31"],
  ];

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Payouts</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Withdrawable" value={`$${Math.round(total * 0.18)}`} hint="Available for next request" />
        <VendorMetricCard label="In Transit" value={`$${Math.round(total * 0.21)}`} hint="Processing with finance" />
        <VendorMetricCard label="Paid This Month" value={`$${Math.round(total * 0.42)}`} hint="Already settled" />
      </div>
      <Table headers={["Payout ID", "Method", "Amount", "Status", "Date"]} rows={payoutRows} />
    </div>
  );
};

export const VendorAnalytics = () => {
  const { earnings, products, orders, currentUser } = useApp();
  const vendorProducts = products.filter((product) => product.vendorId === currentUser?.id);
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const topSelling = [...vendorProducts].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const totalRevenue = vendorOrders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Conversion Trend" value="+18.4%" hint="Compared with last month" />
        <VendorMetricCard label="Top Category" value={topSelling[0]?.category || "N/A"} hint="Highest performing category" />
        <VendorMetricCard label="Revenue" value={`$${totalRevenue}`} hint="Across all vendor orders" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold">Revenue Trend</h3>
          <EarningsChart items={earnings} />
        </div>
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold">Top Products</h3>
          <div className="space-y-3">
            {topSelling.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 text-sm dark:border-slate-700/60"
              >
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    {product.category}
                  </p>
                </div>
                <span className="font-semibold">{product.sold} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const VendorCoupons = () => {
  const { coupons, addCoupon, updateCouponStatus } = useApp();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(10);

  const rows = coupons.map((coupon) => [
    coupon.code,
    `${coupon.discount}%`,
    coupon.status,
    <Button
      key={coupon.id}
      variant={coupon.status === "active" ? "secondary" : "primary"}
      className="px-3 py-1.5 text-xs"
      onClick={() =>
        updateCouponStatus(
          coupon.id,
          coupon.status === "active" ? "inactive" : "active",
        )
      }
    >
      {coupon.status === "active" ? "Disable" : "Enable"}
    </Button>,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Coupons</h2>
      <form
        className={`${panelClass} grid gap-3 sm:grid-cols-[1fr_140px_auto]`}
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
        <Button type="submit">Create Coupon</Button>
      </form>
      <Table headers={["Code", "Discount", "Status", "Action"]} rows={rows} />
    </div>
  );
};

export const VendorProfile = () => {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+91 98765 11111",
    storeName: currentUser?.storeName || `${currentUser?.name || "Vendor"} Store`,
    businessType: currentUser?.businessType || "Retail Seller",
    gstNumber: currentUser?.gstNumber || "27ABCDE1234F1Z5",
    address: currentUser?.address || "Mumbai, Maharashtra",
    bio: currentUser?.bio || "Premium seller focused on fast delivery and quality products.",
  });

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Profile</h2>
      <div className={panelClass}>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateCurrentUserProfile(form);
          }}
        >
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Owner name" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder="Phone" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.storeName} onChange={(event) => setForm((prev) => ({ ...prev, storeName: event.target.value }))} placeholder="Store name" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.businessType} onChange={(event) => setForm((prev) => ({ ...prev, businessType: event.target.value }))} placeholder="Business type" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.gstNumber} onChange={(event) => setForm((prev) => ({ ...prev, gstNumber: event.target.value }))} placeholder="GST number" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.address} onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))} placeholder="Business address" className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <textarea rows={4} value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} placeholder="Store bio" className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const VendorSettings = () => {
  const { currentUser, addToast } = useApp();
  const [storeName, setStoreName] = useState(currentUser?.name ? `${currentUser.name} Store` : "Vendor Store");
  const [supportEmail, setSupportEmail] = useState(currentUser?.email || "vendor@example.com");
  const [supportPhone, setSupportPhone] = useState("+91 98765 11111");
  const [shippingDays, setShippingDays] = useState("3-5 business days");
  const [returnsEnabled, setReturnsEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(false);
  const [promoAlerts, setPromoAlerts] = useState(true);

  const fieldClass =
    "rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900";

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Settings</h2>
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <div className={`${panelClass} space-y-4`}>
          <h3 className="font-display text-lg font-semibold">Store Preferences</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span>Store name</span>
              <input value={storeName} onChange={(event) => setStoreName(event.target.value)} className={fieldClass} />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span>Support email</span>
              <input value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} className={fieldClass} />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span>Support phone</span>
              <input value={supportPhone} onChange={(event) => setSupportPhone(event.target.value)} className={fieldClass} />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span>Shipping timeline</span>
              <input value={shippingDays} onChange={(event) => setShippingDays(event.target.value)} className={fieldClass} />
            </label>
          </div>

          <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
            <span>Accept returns</span>
            <input type="checkbox" checked={returnsEnabled} onChange={(event) => setReturnsEnabled(event.target.checked)} className="h-4 w-4 accent-primary-600" />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
            <span>Enable cash on delivery</span>
            <input type="checkbox" checked={codEnabled} onChange={(event) => setCodEnabled(event.target.checked)} className="h-4 w-4 accent-primary-600" />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
            <span>Promotion alerts</span>
            <input type="checkbox" checked={promoAlerts} onChange={(event) => setPromoAlerts(event.target.checked)} className="h-4 w-4 accent-primary-600" />
          </label>

          <div className="flex justify-end">
            <Button onClick={() => addToast("Vendor settings saved")}>Save Settings</Button>
          </div>
        </div>

        <div className={`${panelClass} space-y-3`}>
          <h3 className="font-display text-lg font-semibold">Profile Snapshot</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-300">Store</span>
              <span className="font-semibold">{storeName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-300">Email</span>
              <span className="font-semibold">{supportEmail}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-300">Returns</span>
              <span className="font-semibold">{returnsEnabled ? "Enabled" : "Disabled"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-300">COD</span>
              <span className="font-semibold">{codEnabled ? "Enabled" : "Disabled"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




