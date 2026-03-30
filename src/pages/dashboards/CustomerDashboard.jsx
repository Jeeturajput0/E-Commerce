import {
  Heart,
  LayoutDashboard,
  MapPin,
  ShoppingCart,
  Truck,
  UserCircle2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useApp } from "../../context/AppContext";

const customerLinks = [
  { path: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/user/dashboard/orders", label: "My Orders", icon: Truck },
  { path: "/user/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { path: "/user/dashboard/cart", label: "Cart", icon: ShoppingCart },
  { path: "/user/dashboard/profile", label: "Profile", icon: UserCircle2 },
  { path: "/user/dashboard/address", label: "Address", icon: MapPin },
];

export const CustomerDashboardLayout = () => {
  const { setRole } = useApp();

  useEffect(() => {
    setRole("customer");
  }, [setRole]);

  return (
    <DashboardLayout title="Customer Dashboard" role="Customer Panel" links={customerLinks} />
  );
};

export const CustomerOverview = () => {
  const { currentUser, orders, wishlist, cartDetails } = useApp();
  const myOrders = orders.filter((order) => order.customerId === currentUser?.id);

  return (
    <div className="space-y-6">
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
        <h3 className="mb-3 font-display text-xl font-semibold">Latest Tracking Updates</h3>
        <div className="space-y-3">
          {myOrders.map((order) => (
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
  const rows = myOrders.map((order) => [order.id, order.date, `$${order.amount}`, order.status, order.tracking]);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">My Orders</h2>
      <Table headers={["Order ID", "Date", "Amount", "Status", "Tracking"]} rows={rows} />
    </div>
  );
};

export const CustomerWishlist = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useApp();
  const entries = useMemo(
    () => products.filter((product) => wishlist.includes(product.id)),
    [wishlist, products]
  );

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Wishlist</h2>
      {entries.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map((product) => (
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
  const rows = cartDetails.map((item) => [
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
      <h2 className="font-display text-2xl font-semibold">Cart</h2>
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
  const { currentUser, addToast } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "+1 555 948 1002",
  });

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Profile</h2>
      <Card>
        <form
          className="grid gap-3 sm:max-w-xl"
          onSubmit={(event) => {
            event.preventDefault();
            addToast("Profile updated");
          }}
        >
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
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
    <h2 className="font-display text-2xl font-semibold">Saved Addresses</h2>
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

