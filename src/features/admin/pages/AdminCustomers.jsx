import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import Table from "../../../components/common/Table";
import { api, apiRaw, toQuery } from "../../../lib/api";
import { panelClass } from "../shared/adminShared";

export const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const body = await apiRaw(
        `/admin/customers${toQuery({ search: searchTerm || "", active: activeFilter === "all" ? "" : activeFilter, page, limit: 20 })}`
      );
      setCustomers(body.data || []);
      setPagination(body.pagination || { total: (body.data || []).length, page: 1, pages: 1 });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(load, searchTerm ? 400 : 0);
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter, page]);

  const setActive = async (customer, isActive) => {
    try {
      await api(`/admin/users/${customer._id}`, { method: "PUT", body: JSON.stringify({ isActive }) });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (customer) => {
    if (!confirm(`Delete customer ${customer.email}?`)) return;
    try {
      await api(`/admin/users/${customer._id}`, { method: "DELETE" });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const viewDetails = async (customer) => {
    try {
      setDetail(await api(`/admin/users/${customer._id}`));
    } catch (e) {
      setError(e.message);
    }
  };

  const rows = customers.map((customer) => [
    <div key={`customer-name-${customer._id}`}>
      <p className="font-semibold">{customer.name}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">
        Joined {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : "—"}
      </p>
    </div>,
    <div key={`customer-contact-${customer._id}`}>
      <p>{customer.email}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">{customer.mobile || "N/A"}</p>
    </div>,
    <span key={`customer-status-${customer._id}`} className={`rounded-full px-3 py-1 text-xs font-semibold ${customer.isActive ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"}`}>
      {customer.isActive ? "Active" : "Blocked"}
    </span>,
    <div key={`customer-actions-${customer._id}`} className="flex flex-wrap gap-1">
      <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => viewDetails(customer)}>View</Button>
      <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => setActive(customer, !customer.isActive)}>
        {customer.isActive ? "Block" : "Activate"}
      </Button>
      <Button variant="ghost" className="px-2 py-1 text-xs text-rose-600" onClick={() => remove(customer)}>Delete</Button>
    </div>,
  ]);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">Customers</h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => { setSearchTerm(event.target.value); setPage(1); }}
          placeholder="Search customer, email, mobile..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={activeFilter}
          onChange={(event) => { setActiveFilter(event.target.value); setPage(1); }}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All customers</option>
          <option value="true">Active</option>
          <option value="false">Blocked</option>
        </select>
        <Button variant="secondary" className="px-4 py-2" onClick={() => { setSearchTerm(""); setActiveFilter("all"); setPage(1); }}>
          Reset
        </Button>
      </div>
      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500">Total Customers</p>
        <p className="mt-2 text-2xl font-bold">{pagination.total}</p>
      </Card>
      {loading ? (
        <p className="text-sm text-slate-500">Loading customers...</p>
      ) : (
        <Table headers={["Name", "Contact", "Status", "Actions"]} rows={rows} emptyMessage="No customers found." />
      )}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-slate-500">Page {pagination.page} of {pagination.pages}</span>
          <Button variant="ghost" disabled={!pagination.hasNext} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}
      {detail && (
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">{detail.name}</h3>
              <p className="text-sm text-slate-500">{detail.email} · {detail.mobile || "No phone"}</p>
            </div>
            <Button variant="ghost" onClick={() => setDetail(null)}>Close</Button>
          </div>
          <p className="mt-3 text-sm font-semibold">Orders ({detail.stats?.orderCount ?? 0})</p>
          <div className="mt-2 space-y-1 text-sm">
            {(detail.orders || []).map((o) => (
              <p key={o._id}>#{String(o._id).slice(-8)} — ${o.totalAmount} [{o.status}] {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ""}</p>
            ))}
            {(detail.orders || []).length === 0 && <p className="text-slate-500">No orders yet.</p>}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminCustomers;
