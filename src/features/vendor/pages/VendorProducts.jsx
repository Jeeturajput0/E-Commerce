import { Search } from "lucide-react";
import { useState } from "react";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";
import { VendorProductForm } from "../widgets/vendorWidgets";

const VendorProducts = () => {
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
      <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => { setEditing({ ...product, images: product.images.join(", ") }); setOpen(true); }}>
        Edit
      </Button>
      <Button variant="ghost" className="px-3 py-1.5 text-xs text-primary-600" onClick={() => deleteProduct(product.id)}>
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
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Search by product name" />
        </label>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
          <option value="All">All Categories</option>
          {[...new Set(vendorProducts.map((product) => product.category))].map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <Table headers={["Title", "Category", "Price", "Stock", "Action"]} rows={rows} />

      <Modal open={open} title="Edit Product" onClose={() => setOpen(false)}>
        <VendorProductForm initial={editing} onCancel={() => setOpen(false)} onSubmit={(form) => { updateProduct(editing.id, form); setOpen(false); }} />
      </Modal>
    </div>
  );
};

export default VendorProducts;
