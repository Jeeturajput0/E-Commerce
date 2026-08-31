import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import Table from "../../../components/common/Table";
import { api } from "../../../lib/api";
import { StatusBadge, panelClass } from "../shared/adminShared";

const getImageUrl = (img) => {
  if (!img) return "/logo.jpg";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) return img;
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "") : "http://localhost:3000";
  return `${baseUrl}${img}`;
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await api("/admin/products");
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const action = async (url, method = "PUT", body) => {
    try {
      await api(url, { method, body: body && JSON.stringify(body) });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const headers = ["Image", "Product", "Price", "Stock", "Vendor", "Status", "Actions"];

  const rows = products.map((p) => [
    <img
      key={`img-${p._id}`}
      src={getImageUrl(p.image)}
      alt={p.name}
      className="h-12 w-12 rounded-lg object-cover border"
    />,
    <div key={p._id}>
      <b className="text-slate-900 dark:text-slate-100">{p.name}</b>
      <p className="text-xs text-slate-500">
        {p.category?.name || "Uncategorized"} · {p.brand?.name || "No brand"}
      </p>
    </div>,
    <div key={`price-${p._id}`}>
      <span className="font-semibold text-slate-900 dark:text-slate-100">${p.saleprice}</span>
      {p.mrp > p.saleprice && (
        <span className="ml-1 text-xs text-slate-400 line-through">${p.mrp}</span>
      )}
    </div>,
    <span key={`qty-${p._id}`} className="font-medium text-slate-700 dark:text-slate-300">
      {p.quantity}
    </span>,
    p.vendor?.name || "Admin",
    <StatusBadge key={`stat-${p._id}`} value={p.approvalStatus} />,
    <div className="flex flex-wrap items-center gap-1" key={`${p._id}x`}>
      <Button
        variant="secondary"
        className="px-2 py-1 text-xs flex items-center gap-1"
        onClick={() => setViewingProduct(p)}
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </Button>
      {p.approvalStatus !== "approved" && (
        <Button className="px-2 py-1 text-xs" onClick={() => action(`/admin/products/${p._id}/approve`)}>
          Approve
        </Button>
      )}
      {p.approvalStatus !== "rejected" && (
        <Button
          variant="secondary"
          className="px-2 py-1 text-xs"
          onClick={() => {
            const reason = prompt("Rejection reason");
            if (reason !== null) action(`/admin/products/${p._id}/reject`, "PUT", { reason });
          }}
        >
          Reject
        </Button>
      )}
      <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => navigate(`/admin/dashboard/products/${p._id}/edit`)}>
        Edit
      </Button>
      <Button variant="ghost" className="px-2 py-1 text-xs text-rose-600" onClick={() => action(`/admin/products/${p._id}`, "DELETE")}>
        Delete
      </Button>
    </div>,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary-600">Manage Products</h2>
          <p className="mt-1 text-sm text-slate-500">View, approve, and manage catalog items.</p>
        </div>
        <Button onClick={() => navigate("/admin/dashboard/products/add")}>Add Product</Button>
      </div>
      {error && <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>}
      <p className={panelClass}>
        Admin products are approved immediately; vendor products require admin approval action.
      </p>
      <Table headers={headers} rows={rows} emptyMessage="No products found." />

      {viewingProduct && (
        <Modal
          title="Product Details"
          description={`Viewing details for "${viewingProduct.name}"`}
          isOpen={Boolean(viewingProduct)}
          onClose={() => setViewingProduct(null)}
        >
          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              <img
                src={getImageUrl(viewingProduct.image)}
                alt={viewingProduct.name}
                className="h-32 w-32 rounded-xl object-cover border"
              />
              <div className="space-y-1 text-sm">
                <h3 className="text-lg font-bold">{viewingProduct.name}</h3>
                <p><span className="font-semibold">Category:</span> {viewingProduct.category?.name || "N/A"}</p>
                <p><span className="font-semibold">Brand:</span> {viewingProduct.brand?.name || "N/A"}</p>
                <p><span className="font-semibold">Size:</span> {viewingProduct.size?.name || "N/A"}</p>
                <p><span className="font-semibold">Color:</span> {viewingProduct.color?.name || "N/A"}</p>
                <p><span className="font-semibold">Sale Price:</span> ${viewingProduct.saleprice} <span className="text-slate-400 line-through">${viewingProduct.mrp}</span></p>
                <p><span className="font-semibold">Stock Quantity:</span> {viewingProduct.quantity}</p>
                <p><span className="font-semibold">Status:</span> {viewingProduct.approvalStatus}</p>
              </div>
            </div>
            {viewingProduct.details && (
              <div className="border-t pt-3">
                <h4 className="font-semibold text-sm">Description</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{viewingProduct.details}</p>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <Button variant="secondary" onClick={() => setViewingProduct(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminProducts;
