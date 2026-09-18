import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import { api, apiRaw, toQuery } from "../../../lib/api";
import { panelClass, sectionTitleClass } from "../constants";

const STATUSES = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const body = await apiRaw(`/vendor/orders${toQuery({ status: statusFilter === "All" ? "" : statusFilter, page, limit: 20 })}`);
      setOrders(body.data || []);
      setPagination(body.pagination || { total: (body.data || []).length, page: 1, pages: 1 });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter, page]);

  const updateStatus = async (id, status) => {
    try {
      await api(`/vendor/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const filtered = orders.filter((order) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      String(order._id).toLowerCase().includes(q) ||
      (order.customerName || "").toLowerCase().includes(q) ||
      (order.customerMobile || "").includes(q)
    );
  });

  const rows = filtered.map((order) => [
    <span key={`id-${order._id}`} className="font-mono text-xs">#{String(order._id).slice(-8)}</span>,
    <div key={`c-${order._id}`}>
      <p className="font-semibold">{order.customerName}</p>
      <p className="text-xs text-slate-500">{order.customerMobile}</p>
      <p className="max-w-[220px] truncate text-xs text-slate-400">
        {typeof order.shippingAddress === "string" ? order.shippingAddress : order.shippingAddress?.line1 || ""}
      </p>
    </div>,
    <div key={`i-${order._id}`} className="text-xs">
      {(order.items || []).map((item, idx) => (
        <p key={idx}>{item.name} × {item.quantity}</p>
      ))}
      <p className="mt-1 font-semibold">${order.vendorSubtotal ?? order.totalAmount}</p>
    </div>,
    <select
      key={`s-${order._id}`}
      value={order.status}
      onChange={(e) => updateStatus(order._id, e.target.value)}
      className="rounded-lg border px-2 py-1 text-xs"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>,
    <span key={`d-${order._id}`} className="text-xs text-slate-500">
      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
    </span>,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Orders</h2>
      <div className={`${panelClass} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`}>
        <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Search by order ID, customer, phone" />
        </label>
        <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
          <option value="All">All Status</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-500">Loading orders...</p>
      ) : (
        <>
          <Table headers={["Order", "Customer (fulfillment)", "Items", "Status", "Date"]} rows={rows} emptyMessage="No orders found." />
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
              <span className="text-sm text-slate-500">Page {pagination.page} of {pagination.pages}</span>
              <Button variant="ghost" disabled={!pagination.hasNext} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VendorOrders;
