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
export const AdminPayments = () => {
  const { payments, orders, users, addPayment, updatePaymentStatus } = useApp();
  const [form, setForm] = useState(() => ({
    orderId: orders[0]?.id || "",
    method: "Card",
    gateway: "Stripe",
    amount: orders[0]?.amount || 100,
    status: "Pending",
  }));
  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === form.orderId) || null,
    [orders, form.orderId],
  );

  const totals = useMemo(() => {
    const paid = payments
      .filter((payment) => payment.status === "Paid")
      .reduce((acc, payment) => acc + payment.amount, 0);
    const pending = payments
      .filter(
        (payment) =>
          payment.status === "Pending" || payment.status === "Processing",
      )
      .reduce((acc, payment) => acc + payment.amount, 0);
    const failed = payments.filter(
      (payment) => payment.status === "Failed",
    ).length;
    return { paid, pending, failed };
  }, [payments]);

  const rows = payments.map((payment) => [
    payment.id,
    payment.orderId,
    users.find((user) => user.id === payment.customerId)?.name || "Customer",
    payment.method,
    `$${payment.amount}`,
    payment.gateway,
    <select
      key={`payment-status-${payment.id}`}
      value={payment.status}
      onChange={(event) => updatePaymentStatus(payment.id, event.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
    >
      <option>Pending</option>
      <option>Processing</option>
      <option>Paid</option>
      <option>Failed</option>
      <option>Refunded</option>
    </select>,
    payment.paidOn,
  ]);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Payment Management
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Collected
          </p>
          <p className="mt-2 text-3xl font-bold">
            ${totals.paid.toLocaleString()}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold">
            ${totals.pending.toLocaleString()}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Failed
          </p>
          <p className="mt-2 text-3xl font-bold">{totals.failed}</p>
        </Card>
      </div>

      <form
        className="grid gap-3 rounded-2xl border border-slate-200/70 p-4 dark:border-slate-700/60 lg:grid-cols-[1.2fr_1fr_1fr_120px_120px_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          const fallbackCustomer = users.find(
            (user) => user.role === "customer",
          );
          const fallbackVendor = users.find((user) => user.role === "vendor");
          addPayment({
            orderId:
              form.orderId || `ORD-MANUAL-${Date.now().toString().slice(-4)}`,
            customerId: selectedOrder?.customerId || fallbackCustomer?.id || 0,
            vendorId: selectedOrder?.vendorId || fallbackVendor?.id || 0,
            amount: Number(form.amount),
            method: form.method,
            gateway: form.gateway,
            status: form.status,
          });
        }}
      >
        <select
          value={form.orderId}
          onChange={(event) => {
            const nextOrder = orders.find(
              (order) => order.id === event.target.value,
            );
            setForm((prev) => ({
              ...prev,
              orderId: event.target.value,
              amount: nextOrder ? nextOrder.amount : prev.amount,
            }));
          }}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id}
            </option>
          ))}
        </select>
        <select
          value={form.method}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, method: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Card</option>
          <option>UPI</option>
          <option>NetBanking</option>
          <option>Wallet</option>
        </select>
        <select
          value={form.gateway}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, gateway: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Stripe</option>
          <option>Razorpay</option>
          <option>PayPal</option>
        </select>
        <input
          type="number"
          min={1}
          value={form.amount}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, amount: Number(event.target.value) }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <select
          value={form.status}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, status: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option>Pending</option>
          <option>Processing</option>
          <option>Paid</option>
          <option>Failed</option>
          <option>Refunded</option>
        </select>
        <Button type="submit">Add Payment</Button>
      </form>

      <Table
        headers={[
          "Payment ID",
          "Order",
          "Customer",
          "Method",
          "Amount",
          "Gateway",
          "Status",
          "Date",
        ]}
        rows={rows}
      />
    </div>
  );
};

export default AdminPayments;

