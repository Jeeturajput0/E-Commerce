import {
  BadgePercent,
  CreditCard,
  DollarSign,
  FileText,
  Package,
  Palette,
  Ruler,
  ShoppingCart,
  Star,
  Users,
  UserSquare2,
} from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import Modal from "../../../components/common/Modal";
import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import {
  CategoryShareChart,
  MetricCard,
  OrdersPerformanceChart,
  SalesTrendChart,
  StatusBadge,
  panelClass,
} from "../shared/adminShared";
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

export default AdminProducts;

