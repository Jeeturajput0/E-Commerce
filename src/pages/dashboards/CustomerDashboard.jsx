import {
  Bell,
  ChevronDown,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Moon,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Settings2,
  Sun,
  Truck,
  UserCircle2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useApp } from "../../context/AppContext";

const headerIconButton =
  "rounded-xl border border-slate-300/80 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800";

const panelClass =
  "rounded-2xl border border-slate-300/80 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900";

const sectionTitleClass = "font-display text-2xl font-semibold text-primary-600";

const CustomerHeaderContent = () => {
  const { currentUser, theme, toggleTheme, logout } = useApp();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
          Customer Overview
        </p>
        <h2 className="font-display text-2xl font-semibold">Dashboard</h2>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
        <label className="flex min-w-[230px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search orders, wishlist, cart..."
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
              {currentUser?.name?.[0] || "C"}
            </span>
            <div className="text-xs">
              <p className="font-semibold leading-none">
                {currentUser?.name || "Customer"}
              </p>
              <p className="mt-1 text-slate-500 dark:text-slate-300">
                Account Holder
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
                  navigate("/user/dashboard/profile");
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

const customerLinks = [
  { path: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/user/dashboard/orders", label: "My Orders", icon: Truck },
  { path: "/user/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { path: "/user/dashboard/cart", label: "Cart", icon: ShoppingCart },
  { path: "/user/dashboard/address", label: "Address", icon: MapPin },
  { path: "/user/dashboard/payment", label: "Payment", icon: CreditCard },
  {
    path: "/user/dashboard/profile",
    label: "Profile",
    icon: UserCircle2,
    group: "master",
    groupIcon: SlidersHorizontal,
    groupLabel: "Account tools",
  },
  {
    path: "/user/dashboard/settings",
    label: "Settings",
    icon: Settings2,
    group: "master",
    groupIcon: SlidersHorizontal,
    groupLabel: "Account tools",
  },
];

export const CustomerDashboardLayout = () => {
  const { setRole } = useApp();

  useEffect(() => {
    setRole("customer");
  }, [setRole]);

  return (
    <DashboardLayout
      title="Customer Dashboard"
      role="Customer Panel"
      links={customerLinks}
      headerContent={<CustomerHeaderContent />}
    />
  );
};

export const CustomerOverview = () => {
  const { currentUser, orders, wishlist, cartDetails, products } = useApp();
  const myOrders = orders.filter((order) => order.customerId === currentUser?.id);
  const latestOrders = myOrders.slice(0, 4);
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id)).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className={`${panelClass} space-y-4`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-primary-600">
                Account Snapshot
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Quick overview of your recent orders, saved items, and delivery progress.
              </p>
            </div>
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              Active
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Delivered</p>
              <p className="mt-2 text-lg font-semibold">
                {myOrders.filter((order) => order.status === "Delivered").length}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">In Transit</p>
              <p className="mt-2 text-lg font-semibold">
                {myOrders.filter((order) => ["Shipped", "Processing", "Pending"].includes(order.status)).length}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Saved Items</p>
              <p className="mt-2 text-lg font-semibold">{wishlist.length}</p>
            </div>
          </div>
        </div>
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">Wishlist Picks</h3>
          <div className="space-y-3">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60"
              >
                <img src={product.images[0]} alt={product.title} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            My Orders
          </p>
          <p className="mt-2 text-3xl font-bold">{myOrders.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Wishlist Items
          </p>
          <p className="mt-2 text-3xl font-bold">{wishlist.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Cart Items
          </p>
          <p className="mt-2 text-3xl font-bold">{cartDetails.length}</p>
        </Card>
      </div>

      <Card>
        <h3 className="mb-3 font-display text-xl font-semibold text-primary-600">Latest Tracking Updates</h3>
        <div className="space-y-3">
          {latestOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/70 p-3 text-sm dark:border-slate-700/60"
            >
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-slate-500 dark:text-slate-300">{order.tracking}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const CustomerOrders = () => {
  const { currentUser, orders } = useApp();
  const myOrders = orders.filter((order) => order.customerId === currentUser?.id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredOrders = myOrders.filter((order) => {
    const matchesQuery =
      order.id.toLowerCase().includes(query.toLowerCase()) ||
      order.tracking.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
  const rows = filteredOrders.map((order) => [order.id, order.date, `$${order.amount}`, order.status, order.tracking]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>My Orders</h2>
      <div className={`${panelClass} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`}>
        <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search by order ID or tracking"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="All">All Status</option>
          {[...new Set(myOrders.map((order) => order.status))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <Table headers={["Order ID", "Date", "Amount", "Status", "Tracking"]} rows={rows} />
    </div>
  );
};

export const CustomerWishlist = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useApp();
  const [query, setQuery] = useState("");
  const entries = useMemo(
    () => products.filter((product) => wishlist.includes(product.id)),
    [wishlist, products]
  );
  const filteredEntries = entries.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Wishlist</h2>
      <div className={panelClass}>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search saved items"
          />
        </label>
      </div>
      {filteredEntries.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredEntries.map((product) => (
            <Card key={product.id}>
              <div className="flex items-start gap-3">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">${product.price}</p>
                  <div className="mt-3 flex gap-2">
                    <Button className="px-3 py-1.5 text-xs" onClick={() => addToCart(product.id)}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-3 py-1.5 text-xs text-primary-600"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-slate-600 dark:text-slate-300">No saved products yet.</p>
        </Card>
      )}
    </div>
  );
};

export const CustomerCart = () => {
  const { cartDetails, cartTotal, removeCartItem, updateCartQty } = useApp();
  const [query, setQuery] = useState("");
  const filteredCart = cartDetails.filter((item) =>
    item.product.title.toLowerCase().includes(query.toLowerCase())
  );
  const rows = filteredCart.map((item) => [
    item.product.title,
    `$${item.product.price}`,
    <input
      key={item.productId}
      type="number"
      min={1}
      value={item.quantity}
      onChange={(event) => updateCartQty(item.productId, Number(event.target.value))}
      className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
    />,
    `$${item.subtotal.toFixed(2)}`,
    <Button
      key={`remove-${item.productId}`}
      variant="ghost"
      className="px-2 py-1 text-xs text-primary-600"
      onClick={() => removeCartItem(item.productId)}
    >
      Remove
    </Button>,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Cart</h2>
      <div className={panelClass}>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search cart products"
          />
        </label>
      </div>
      <Table headers={["Product", "Price", "Qty", "Subtotal", "Action"]} rows={rows} />
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold">Total: ${cartTotal.toFixed(2)}</p>
        <Link to="/cart">
          <Button>Open Full Cart</Button>
        </Link>
      </Card>
    </div>
  );
};

export const CustomerProfile = () => {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+1 555 948 1002",
    gender: currentUser?.gender || "Female",
    dob: currentUser?.dob || "1998-06-12",
    city: currentUser?.city || "Seattle",
    state: currentUser?.state || "Washington",
    zipCode: currentUser?.zipCode || "98109",
    bio: currentUser?.bio || "Shopping enthusiast who loves curated deals and fast delivery.",
  });

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Profile</h2>
      <Card>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateCurrentUserProfile(form);
          }}
        >
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Full name"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder="Phone"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.gender}
            onChange={(event) => setForm((prev) => ({ ...prev, gender: event.target.value }))}
            placeholder="Gender"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            type="date"
            value={form.dob}
            onChange={(event) => setForm((prev) => ({ ...prev, dob: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.city}
            onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
            placeholder="City"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.state}
            onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value }))}
            placeholder="State"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.zipCode}
            onChange={(event) => setForm((prev) => ({ ...prev, zipCode: event.target.value }))}
            placeholder="ZIP code"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <textarea
            rows={4}
            value={form.bio}
            onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
            placeholder="Short bio"
            className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <Button type="submit" className="w-fit">
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export const CustomerAddress = () => (
  <div className="space-y-4">
    <h2 className={sectionTitleClass}>Saved Addresses</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Home</p>
        <p className="mt-2 text-sm">124 Westlake Ave, Seattle, WA 98109</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Phone: +1 555 948 1002</p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Office</p>
        <p className="mt-2 text-sm">880 Mission Street, San Francisco, CA 94103</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Phone: +1 555 904 2280</p>
      </Card>
    </div>
  </div>
);

export const CustomerPayment = () => {
  const [query, setQuery] = useState("");
  const cards = [
    { id: "CARD-1", type: "Visa", number: "**** **** **** 4821", expiry: "09/28", status: "Primary" },
    { id: "CARD-2", type: "Mastercard", number: "**** **** **** 9182", expiry: "04/27", status: "Backup" },
  ];
  const filteredCards = cards.filter((card) =>
    `${card.type} ${card.number}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Payment</h2>
      <div className={panelClass}>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search saved cards"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCards.map((card) => (
          <Card key={card.id}>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{card.type}</p>
            <p className="mt-3 text-lg font-semibold">{card.number}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>Expiry {card.expiry}</span>
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                {card.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const CustomerSettings = () => {
  const { addToast } = useApp();
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [wishlistAlerts, setWishlistAlerts] = useState(true);
  const [darkEmails, setDarkEmails] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Settings</h2>
      <div className={`${panelClass} space-y-3`}>
        <h3 className="font-display text-lg font-semibold text-primary-600">Notification Preferences</h3>
        <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
          <span>Order updates</span>
          <input type="checkbox" checked={orderAlerts} onChange={(event) => setOrderAlerts(event.target.checked)} className="h-4 w-4 accent-primary-600" />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
          <span>Wishlist price alerts</span>
          <input type="checkbox" checked={wishlistAlerts} onChange={(event) => setWishlistAlerts(event.target.checked)} className="h-4 w-4 accent-primary-600" />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
          <span>Promotional emails</span>
          <input type="checkbox" checked={darkEmails} onChange={(event) => setDarkEmails(event.target.checked)} className="h-4 w-4 accent-primary-600" />
        </label>
        <div className="flex justify-end">
          <Button onClick={() => addToast("Customer settings saved")}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};




