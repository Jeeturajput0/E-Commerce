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
export const AdminOrders = () => {
  const { orders, users, payments, updateOrderStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const customer = users.find((user) => user.id === order.customerId);
        const vendor = users.find((user) => user.id === order.vendorId);
        const payment = payments.find((entry) => entry.orderId === order.id);
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          order.id.toLowerCase().includes(query) ||
          order.tracking.toLowerCase().includes(query) ||
          customer?.name?.toLowerCase().includes(query) ||
          vendor?.name?.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;
        const matchesPayment =
          paymentFilter === "all" ||
          (paymentFilter === "unpaid" && !payment) ||
          payment?.status === paymentFilter;
        return matchesSearch && matchesStatus && matchesPayment;
      }),
    [orders, users, payments, searchTerm, statusFilter, paymentFilter],
  );

  const orderStats = useMemo(() => {
    const total = filteredOrders.length;
    const delivered = filteredOrders.filter((order) => order.status === "Delivered").length;
    const shipped = filteredOrders.filter((order) => order.status === "Shipped").length;
    const processing = filteredOrders.filter((order) => order.status === "Processing").length;
    const cancelled = filteredOrders.filter((order) => order.status === "Cancelled").length;
    const revenue = filteredOrders.reduce((acc, order) => acc + order.amount, 0);
    const avgValue = total > 0 ? revenue / total : 0;
    return { total, delivered, shipped, processing, cancelled, revenue, avgValue };
  }, [filteredOrders]);

  const rows = [...filteredOrders]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((order) => {
      const customer = users.find((user) => user.id === order.customerId);
      const vendor = users.find((user) => user.id === order.vendorId);
      const payment = payments.find((entry) => entry.orderId === order.id);
      return [
        <div key={`order-${order.id}`}>
          <p className="font-semibold">{order.id}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {order.date} � {order.tracking}
          </p>
        </div>,
        <div key={`customer-${order.id}`}>
          <p className="font-semibold">{customer?.name || "Customer"}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {customer?.mobile || customer?.email || "N/A"}
          </p>
        </div>,
        <div key={`vendor-${order.id}`}>
          <p className="font-semibold">{vendor?.name || "Vendor"}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {vendor?.email || "N/A"}
          </p>
        </div>,
        <p key={`amount-${order.id}`} className="font-semibold">${order.amount}</p>,
        <StatusBadge
          key={`payment-${order.id}`}
          value={payment?.status || "Pending"}
        />,
        <select
          key={`status-${order.id}`}
          value={order.status}
          onChange={(event) => updateOrderStatus(order.id, event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>,
      ];
    });

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Orders Management
      </h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search order, customer, vendor..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          value={paymentFilter}
          onChange={(event) => setPaymentFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
          <option value="unpaid">Unlinked payment</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setPaymentFilter("all");
          }}
        >
          Reset
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Total Orders</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.total}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Delivered</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.delivered}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">In Transit</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.shipped + orderStats.processing}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Cancelled</p>
          <p className="mt-2 text-2xl font-bold">{orderStats.cancelled}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Avg Value</p>
          <p className="mt-2 text-2xl font-bold">${orderStats.avgValue.toFixed(0)}</p>
        </Card>
      </div>
      <Table
        headers={["Order", "Customer", "Vendor", "Amount", "Payment", "Fulfillment"]}
        rows={rows}
        emptyMessage="No orders found."
      />
    </div>
  );
};

export default AdminOrders;

