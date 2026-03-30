import {
  BadgeDollarSign,
  LayoutDashboard,
  MessageSquareMore,
  Package,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Table from "../../components/common/Table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useApp } from "../../context/AppContext";

const vendorLinks = [
  { path: "/vendor/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/vendor/dashboard/products", label: "My Products", icon: Package },
  { path: "/vendor/dashboard/add-product", label: "Add Product", icon: PlusCircle },
  { path: "/vendor/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { path: "/vendor/dashboard/earnings", label: "Earnings", icon: BadgeDollarSign },
  { path: "/vendor/dashboard/reviews", label: "Reviews", icon: MessageSquareMore },
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

  return <DashboardLayout title="Vendor Dashboard" role="Vendor Panel" links={vendorLinks} />;
};

export const VendorOverview = () => {
  const { products, orders, currentUser } = useApp();
  const vendorProducts = products.filter((product) => product.vendorId === currentUser?.id);
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const totalRevenue = vendorOrders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Products
          </p>
          <p className="mt-2 text-3xl font-bold">{vendorProducts.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Orders
          </p>
          <p className="mt-2 text-3xl font-bold">{vendorOrders.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Revenue
          </p>
          <p className="mt-2 text-3xl font-bold">${totalRevenue}</p>
        </Card>
      </div>

      <Card>
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
      </Card>
    </div>
  );
};

export const VendorProducts = () => {
  const { products, currentUser, updateProduct, deleteProduct } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const vendorProducts = products.filter((product) => product.vendorId === currentUser?.id);

  const rows = vendorProducts.map((product) => [
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
      <h2 className="font-display text-2xl font-semibold">My Products</h2>
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
      <h2 className="font-display text-2xl font-semibold">Add Product</h2>
      <Card>
        <VendorProductForm
          onSubmit={(form) => addProduct({ ...form, vendorId: currentUser?.id })}
        />
      </Card>
    </div>
  );
};

export const VendorOrders = () => {
  const { orders, currentUser, users } = useApp();
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);

  const rows = vendorOrders.map((order) => [
    order.id,
    users.find((user) => user.id === order.customerId)?.name || "Customer",
    `$${order.amount}`,
    order.status,
    order.date,
  ]);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Orders</h2>
      <Table headers={["Order ID", "Customer", "Amount", "Status", "Date"]} rows={rows} />
    </div>
  );
};

export const VendorEarnings = () => {
  const { earnings, currentUser, orders } = useApp();
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const total = vendorOrders.reduce((acc, order) => acc + order.amount, 0);
  const paid = Math.round(total * 0.76);
  const pending = total - paid;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Gross Revenue
          </p>
          <p className="mt-2 text-3xl font-bold">${total}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Paid Out
          </p>
          <p className="mt-2 text-3xl font-bold">${paid}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold">${pending}</p>
        </Card>
      </div>
      <Card>
        <h3 className="mb-4 font-display text-xl font-semibold">Monthly Earnings</h3>
        <EarningsChart items={earnings} />
      </Card>
    </div>
  );
};

export const VendorReviews = () => {
  const { reviews, currentUser, products } = useApp();
  const vendorReviews = reviews.filter((review) => review.vendorId === currentUser?.id);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Customer Reviews</h2>
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


