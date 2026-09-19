import { useEffect, useMemo, useState } from "react";
import Card from "../../../components/common/Card";
import Table from "../../../components/common/Table";
import { api, apiRaw, toQuery } from "../../../lib/api";
import { StatusBadge } from "../shared/adminShared";

const PAYMENT_STATUSES = ["Pending", "Paid", "Failed"];

export const AdminPayments = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const body = await apiRaw(`/admin/orders${toQuery({ limit: 50 })}`);
      const list = body.data || [];
      setOrders(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      await api(`/admin/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ paymentStatus }),
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const totals = useMemo(() => {
    const paid = orders
      .filter((o) => o.paymentStatus === "Paid")
      .reduce((acc, o) => acc + (o.totalAmount || 0), 0);
    const pending = orders
      .filter((o) => o.paymentStatus === "Pending")
      .reduce((acc, o) => acc + (o.totalAmount || 0), 0);
    const failed = orders.filter((o) => o.paymentStatus === "Failed").length;
    return { paid, pending, failed };
  }, [orders]);

  const visibleOrders =
    statusFilter === "All" ? orders : orders.filter((o) => o.paymentStatus === statusFilter);

  const rows = visibleOrders.map((order) => [
    <div key={`id-${order._id}`}>
      <p className="font-semibold text-slate-900 dark:text-slate-100">
        #{String(order._id || "").slice(-6).toUpperCase()}
      </p>
      <p className="text-xs text-slate-500">
        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
      </p>
    </div>,
    <span key={`cust-${order._id}`} className="text-sm">
      {order.customerName || order.customer?.name || "Customer"}
    </span>,
    <span key={`method-${order._id}`} className="text-sm">
      {order.paymentMethod || "COD"}
    </span>,
    <span key={`amt-${order._id}`} className="font-bold text-slate-900 dark:text-slate-100">
      ${order.totalAmount || 0}
    </span>,
    <StatusBadge key={`stat-${order._id}`} value={order.paymentStatus || "Pending"} />,
    <select
      key={`edit-${order._id}`}
      value={order.paymentStatus || "Pending"}
      onChange={(event) => updatePaymentStatus(order._id, event.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
    >
      {PAYMENT_STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>,
  ]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-primary-600">
          Payment Management
        </h2>
        <p className="mt-1 text-sm text-slate-500">Live payment status of real customer orders.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Collected
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            ${totals.paid.toLocaleString()}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-600">
            ${totals.pending.toLocaleString()}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Failed
          </p>
          <p className="mt-2 text-3xl font-bold text-rose-600">{totals.failed}</p>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Filter by payment status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="All">All</option>
          {PAYMENT_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-500">Loading payments...</p>
      ) : (
        <Table
          headers={["Order", "Customer", "Method", "Amount", "Status", "Update"]}
          rows={rows}
          emptyMessage="No orders yet."
        />
      )}
    </div>
  );
};

export default AdminPayments;
