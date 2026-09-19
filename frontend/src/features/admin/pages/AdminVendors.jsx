import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import IconButton from "../../../components/common/IconButton";
import Card from "../../../components/common/Card";
import Table from "../../../components/common/Table";
import { api, apiRaw, toQuery } from "../../../lib/api";
import { StatusBadge, panelClass } from "../shared/adminShared";

const STATUSES = ["pending", "approved", "rejected", "active", "blocked"];

export const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const body = await apiRaw(`/admin/vendors${toQuery({ search: searchTerm || "", status: statusFilter === "all" ? "" : statusFilter, page, limit: 20 })}`);
      setVendors(body.data || []);
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
  }, [searchTerm, statusFilter, page]);

  const setStatus = async (vendor, vendorStatus) => {
    let reason = "";
    if (vendorStatus === "rejected") {
      const input = prompt("Rejection reason");
      if (input === null) return;
      reason = input;
    }
    try {
      await api(`/admin/users/${vendor._id}`, { method: "PUT", body: JSON.stringify({ vendorStatus, vendorRejectionReason: reason }) });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const toggleActive = async (vendor) => {
    try {
      await api(`/admin/users/${vendor._id}`, { method: "PUT", body: JSON.stringify({ isActive: !vendor.isActive }) });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const viewDetails = async (vendor) => {
    try {
      const data = await api(`/admin/users/${vendor._id}`);
      setDetail(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const rows = vendors.map((vendor) => [
    <div key={`vendor-name-${vendor._id}`}>
      <p className="font-semibold">{vendor.storeName || vendor.name}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">{vendor.name}</p>
    </div>,
    <div key={`vendor-contact-${vendor._id}`}>
      <p>{vendor.email}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">{vendor.mobile || "N/A"}</p>
    </div>,
    <div key={`vendor-stats-${vendor._id}`}>
      <p className="font-semibold">{vendor.stats?.productCount ?? "—"} products</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">
        {vendor.stats?.orderCount ?? "—"} orders · ${vendor.stats?.totalSales ?? "—"}
      </p>
    </div>,
    <div key={vendor._id} className="flex flex-wrap items-center gap-1">
      <StatusBadge value={vendor.vendorStatus} />
      <StatusBadge value={vendor.isActive ? "Active" : "Blocked"} />
    </div>,
    <div key={`actions-${vendor._id}`} className="flex flex-wrap items-center gap-1.5">
      <IconButton title="View details" onClick={() => viewDetails(vendor)}>
        <Eye className="h-4 w-4" />
      </IconButton>
      {vendor.vendorStatus === "pending" && (
        <>
          <Button className="px-2 py-1 text-xs" onClick={() => setStatus(vendor, "approved")}>Approve</Button>
          <Button variant="ghost" className="px-2 py-1 text-xs text-rose-600" onClick={() => setStatus(vendor, "rejected")}>Reject</Button>
        </>
      )}
      {["approved", "active"].includes(vendor.vendorStatus) && (
        <Button variant="ghost" className="px-2 py-1 text-xs text-rose-600" onClick={() => setStatus(vendor, "blocked")}>Block</Button>
      )}
      {vendor.vendorStatus === "blocked" && (
        <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => setStatus(vendor, "active")}>Unblock</Button>
      )}
      <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => toggleActive(vendor)}>
        {vendor.isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>,
  ]);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">Vendor Management</h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => { setSearchTerm(event.target.value); setPage(1); }}
          placeholder="Search vendor, store, email..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <Button variant="secondary" className="px-4 py-2" onClick={() => { setSearchTerm(""); setStatusFilter("all"); setPage(1); }}>
          Reset
        </Button>
      </div>
      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Total Vendors</p>
          <p className="mt-2 text-2xl font-bold">{pagination.total}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Pending Approval</p>
          <p className="mt-2 text-2xl font-bold">{vendors.filter((v) => v.vendorStatus === "pending").length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Blocked</p>
          <p className="mt-2 text-2xl font-bold">{vendors.filter((v) => v.vendorStatus === "blocked" || !v.isActive).length}</p>
        </Card>
      </div>
      {loading ? (
        <p className="text-sm text-slate-500">Loading vendors...</p>
      ) : (
        <Table headers={["Vendor", "Contact", "Catalog", "Status", "Actions"]} rows={rows} emptyMessage="No vendors found." />
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
              <h3 className="text-lg font-bold">{detail.storeName || detail.name}</h3>
              <p className="text-sm text-slate-500">{detail.email} · {detail.mobile} · Status: {detail.vendorStatus}</p>
              {detail.storeAddress && <p className="text-sm text-slate-500">{detail.storeAddress} · {detail.storePhone}</p>}
            </div>
            <Button variant="ghost" onClick={() => setDetail(null)}>Close</Button>
          </div>
          <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3">Products: <b>{detail.stats?.productCount ?? 0}</b></div>
            <div className="rounded-xl bg-slate-50 p-3">Orders: <b>{detail.stats?.orderCount ?? 0}</b></div>
            <div className="rounded-xl bg-slate-50 p-3">Sales: <b>${detail.stats?.totalSales ?? 0}</b></div>
          </div>
          {(detail.products || []).length > 0 && (
            <div className="mt-3 space-y-1 text-sm">
              {detail.products.map((p) => (
                <p key={p._id}>{p.name} — ${p.saleprice} (stock {p.stock}) [{p.approvalStatus}]</p>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default AdminVendors;
