import { Eye, Package } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
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

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewingOrder, setViewingOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await api("/admin/orders");
      setOrders(data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api(`/admin/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      loadOrders();
    } catch (e) {
      setError(e.message);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        (order._id && order._id.toLowerCase().includes(query)) ||
        (order.customerName && order.customerName.toLowerCase().includes(query)) ||
        (order.customerMobile && order.customerMobile.toLowerCase().includes(query)) ||
        (order.customerEmail && order.customerEmail.toLowerCase().includes(query));

      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const orderStats = useMemo(() => {
    const total = filteredOrders.length;
    const pending = filteredOrders.filter((o) => o.status === "Pending").length;
    const processing = filteredOrders.filter((o) => o.status === "Processing").length;
    const shipped = filteredOrders.filter((o) => o.status === "Shipped").length;
    const delivered = filteredOrders.filter((o) => o.status === "Delivered").length;
    const cancelled = filteredOrders.filter((o) => o.status === "Cancelled").length;
    const revenue = filteredOrders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
    return { total, pending, processing, shipped, delivered, cancelled, revenue };
  }, [filteredOrders]);

  const headers = ["Order", "User Information", "Items Ordered", "Amount", "Payment", "Order Status", "Actions"];

  const rows = filteredOrders.map((order) => [
    <div key={`id-${order._id}`}>
      <p className="font-semibold text-slate-900 dark:text-slate-100">#{order._id.slice(-6).toUpperCase()}</p>
      <p className="text-xs text-slate-500">
        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>,
    <div key={`user-${order._id}`} className="text-sm">
      <p className="font-bold text-slate-900 dark:text-slate-100">{order.customerName}</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">📞 {order.customerMobile}</p>
      {order.customerEmail && <p className="text-xs text-slate-500">{order.customerEmail}</p>}
      <p className="text-xs text-slate-500 truncate max-w-[180px]" title={order.shippingAddress}>
        📍 {order.shippingAddress}
      </p>
    </div>,
    <div key={`items-${order._id}`} className="space-y-1">
      {order.items?.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          {item.image && (
            <img src={getImageUrl(item.image)} alt={item.name} className="h-7 w-7 rounded object-cover border" />
          )}
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {item.name} <span className="text-slate-500">x{item.quantity}</span>
          </span>
        </div>
      ))}
    </div>,
    <span key={`amount-${order._id}`} className="font-bold text-slate-900 dark:text-slate-100">
      ${order.totalAmount}
    </span>,
    <div key={`pay-${order._id}`}>
      <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
        {order.paymentMethod || "COD"}
      </span>
      <p className="text-xs text-slate-500 mt-0.5">{order.paymentStatus || "Pending"}</p>
    </div>,
    <select
      key={`stat-${order._id}`}
      value={order.status}
      onChange={(e) => handleStatusChange(order._id, e.target.value)}
      className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-800 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>,
    <div key={`act-${order._id}`}>
      <Button
        variant="secondary"
        className="px-2 py-1 text-xs flex items-center gap-1"
        onClick={() => setViewingOrder(order)}
      >
        <Eye className="h-3.5 w-3.5" />
        View Details
      </Button>
    </div>,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary-600">Admin Orders Management</h2>
          <p className="mt-1 text-sm text-slate-500">Manage user orders, view items ordered, and update delivery status.</p>
        </div>
        <Button variant="secondary" onClick={loadOrders}>
          Refresh Orders
        </Button>
      </div>

      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID, Customer Name, Mobile, Email..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
          }}
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500">Total Orders</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.total}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500">Pending / New</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">{orderStats.pending}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500">In Transit</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">{orderStats.shipped + orderStats.processing}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500">Delivered</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">{orderStats.delivered}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500">Total Revenue</p>
          <p className="mt-2 text-2xl font-bold">${orderStats.revenue.toFixed(2)}</p>
        </Card>
      </div>

      {error && <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>}

      {loading ? (
        <p className="text-center py-8 text-slate-500">Loading orders...</p>
      ) : (
        <Table headers={headers} rows={rows} emptyMessage="No orders found." />
      )}

      {/* View Order Modal */}
      {viewingOrder && (
        <Modal
          title={`Order #${viewingOrder._id}`}
          description={`Placed on ${new Date(viewingOrder.createdAt).toLocaleString()}`}
          isOpen={Boolean(viewingOrder)}
          onClose={() => setViewingOrder(null)}
        >
          <div className="space-y-4 pt-2">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 space-y-1 text-sm">
              <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">Customer Details</h4>
              <p><span className="font-semibold">Name:</span> {viewingOrder.customerName}</p>
              <p><span className="font-semibold">Mobile:</span> {viewingOrder.customerMobile}</p>
              {viewingOrder.customerEmail && <p><span className="font-semibold">Email:</span> {viewingOrder.customerEmail}</p>}
              <p><span className="font-semibold">Shipping Address:</span> {viewingOrder.shippingAddress}</p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2">Items Ordered ("Kya Mangaya Hai")</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {viewingOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg border bg-white dark:bg-slate-900">
                    <img src={getImageUrl(item.image)} alt={item.name} className="h-12 w-12 rounded object-cover border" />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-slate-500">${item.price} x {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Payment Method: <span className="font-semibold">{viewingOrder.paymentMethod || "COD"}</span></p>
                <p className="text-xs text-slate-500">Order Status: <span className="font-semibold">{viewingOrder.status}</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Total Amount</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">${viewingOrder.totalAmount}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="secondary" onClick={() => setViewingOrder(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminOrders;
