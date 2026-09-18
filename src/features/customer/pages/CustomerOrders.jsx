import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import { api, apiRaw, toQuery } from "../../../lib/api";
import { panelClass, sectionTitleClass } from "../constants";

const STATUSES = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];

const CustomerOrders = () => {
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
      const body = await apiRaw(`/user/orders${toQuery({ status: statusFilter === "All" ? "" : statusFilter, page, limit: 20 })}`);
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

  const cancelOrder = async (id) => {
    if (!confirm("Cancel this order?")) return;
    try {
      await api(`/user/orders/${id}/cancel`, { method: "PUT", body: JSON.stringify({}) });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const filtered = orders.filter((order) => {
    if (!query.trim()) return true;
    return String(order._id).toLowerCase().includes(query.toLowerCase());
  });

  const rows = filtered.map((order) => [
    <span key={`id-${order._id}`} className="font-mono text-xs">#{String(order._id).slice(-8)}</span>,
    <span key={`d-${order._id}`} className="text-xs">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}</span>,
    <div key={`i-${order._id}`} className="text-xs">
      {(order.items || []).map((item, idx) => (
        <p key={idx}>{item.name} × {item.quantity}</p>
      ))}
    </div>,
    <span key={`a-${order._id}`} className="font-semibold">${order.totalAmount}</span>,
    <span key={`s-${order._id}`} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold">{order.status}</span>,
    ["Pending", "Confirmed"].includes(order.status) ? (
      <Button key={`c-${order._id}`} variant="ghost" className="px-2 py-1 text-xs text-rose-600" onClick={() => cancelOrder(order._id)}>
        Cancel
      </Button>
    ) : (
      <span key={`c-${order._id}`} className="text-xs text-slate-400">—</span>
    ),
  ]);

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
            placeholder="Search by order ID"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="All">All Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-500">Loading orders...</p>
      ) : (
        <>
          <Table headers={["Order", "Date", "Items", "Total", "Status", "Action"]} rows={rows} emptyMessage="You have no orders yet." />
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

export default CustomerOrders;
