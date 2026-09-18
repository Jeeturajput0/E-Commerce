import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import Table from "../../../components/common/Table";
import { api, apiRaw, resolveImage, toQuery } from "../../../lib/api";
import { StatusBadge, panelClass } from "../shared/adminShared";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [viewingProduct, setViewingProduct] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const body = await apiRaw(`/admin/products${toQuery({ search, status, page, limit: 20 })}`);
      setProducts(body.data || []);
      setPagination(body.pagination || { total: (body.data || []).length, page: 1, pages: 1 });
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(load, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [search, status, page]);

  const action = async (url, method = "PUT", body) => {
    try {
      await api(url, { method, body: body ? JSON.stringify(body) : JSON.stringify({}) });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const headers = ["Image", "Product", "Price", "Stock", "Vendor", "Status", "Actions"];

  const rows = products.map((p) => [
    <img
      key={`img-${p._id}`}
      src={resolveImage(p.images?.[0] || p.image)}
      alt={p.name}
      className="h-12 w-12 rounded-lg border object-cover"
      onError={(e) => { e.currentTarget.src = "/logo.jpg"; }}
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
      {p.stock ?? p.quantity}
    </span>,
    p.vendor?.storeName || p.vendor?.name || "Admin",
    <div key={`stat-${p._id}`} className="flex flex-col gap-1">
      <StatusBadge value={p.approvalStatus} />
      <StatusBadge value={p.isActive ? "Active" : "Inactive"} />
      {p.featured && <StatusBadge value="Featured" />}
    </div>,
    <div className="flex flex-wrap items-center gap-1" key={`${p._id}x`}>
      <Button variant="secondary" className="flex items-center gap-1 px-2 py-1 text-xs" onClick={() => setViewingProduct(p)}>
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
      <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => action(`/admin/products/${p._id}/toggle-active`, "PATCH")}>
        {p.isActive ? "Deactivate" : "Activate"}
      </Button>
      <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => navigate(`/admin/dashboard/products/${p._id}/edit`)}>
        Edit
      </Button>
      <Button variant="ghost" className="px-2 py-1 text-xs text-rose-600" onClick={() => { if (confirm("Delete this product?")) action(`/admin/products/${p._id}`, "DELETE"); }}>
        Delete
      </Button>
    </div>,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary-600">Manage Products</h2>
          <p className="mt-1 text-sm text-slate-500">View, approve, and manage catalog items.</p>
        </div>
        <Button onClick={() => navigate("/admin/dashboard/products/add")}>Add Product</Button>
      </div>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_auto]`}>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search name, brand, SKU, tags..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <Button variant="secondary" onClick={() => { setSearch(""); setStatus(""); setPage(1); }}>Reset</Button>
      </div>
      {error && <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>}
      <Table headers={headers} rows={rows} emptyMessage="No products found." />
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-slate-500">Page {pagination.page} of {pagination.pages} ({pagination.total} products)</span>
          <Button variant="ghost" disabled={!pagination.hasNext} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}

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
                src={resolveImage(viewingProduct.images?.[0] || viewingProduct.image)}
                alt={viewingProduct.name}
                className="h-32 w-32 rounded-xl border object-cover"
                onError={(e) => { e.currentTarget.src = "/logo.jpg"; }}
              />
              <div className="space-y-1 text-sm">
                <h3 className="text-lg font-bold">{viewingProduct.name}</h3>
                <p><span className="font-semibold">Category:</span> {viewingProduct.category?.name || "N/A"}</p>
                <p><span className="font-semibold">Brand:</span> {viewingProduct.brand?.name || "N/A"}</p>
                <p><span className="font-semibold">Sale Price:</span> ${viewingProduct.saleprice} <span className="text-slate-400 line-through">${viewingProduct.mrp}</span></p>
                <p><span className="font-semibold">Stock:</span> {viewingProduct.stock ?? viewingProduct.quantity}</p>
                <p><span className="font-semibold">Status:</span> {viewingProduct.approvalStatus}</p>
                <p><span className="font-semibold">Rating:</span> {viewingProduct.rating || 0} ({viewingProduct.reviewCount || 0} reviews)</p>
              </div>
            </div>
            {viewingProduct.details && (
              <div className="border-t pt-3">
                <h4 className="text-sm font-semibold">Description</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{viewingProduct.details}</p>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <Button variant="secondary" onClick={() => setViewingProduct(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminProducts;
