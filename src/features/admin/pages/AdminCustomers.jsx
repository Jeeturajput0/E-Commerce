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
export const AdminCustomers = () => {
  const { users, orders, updateUserStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [spendFilter, setSpendFilter] = useState("all");
  const customers = users.filter((user) => user.role === "customer");
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) => {
        const query = searchTerm.trim().toLowerCase();
        const totalSpend = orders
          .filter((order) => order.customerId === customer.id)
          .reduce((acc, order) => acc + order.amount, 0);
        const matchesSearch =
          query.length === 0 ||
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          (customer.mobile || "").toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "all" || customer.status === statusFilter;
        const matchesSpend =
          spendFilter === "all" ||
          (spendFilter === "high" && totalSpend >= 500) ||
          (spendFilter === "medium" && totalSpend >= 200 && totalSpend < 500) ||
          (spendFilter === "low" && totalSpend < 200);
        return matchesSearch && matchesStatus && matchesSpend;
      }),
    [customers, orders, searchTerm, statusFilter, spendFilter],
  );

  const rows = filteredCustomers.map((customer) => [
    <div key={`customer-name-${customer.id}`}>
      <p className="font-semibold">{customer.name}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">#{customer.id}</p>
    </div>,
    <div key={`customer-contact-${customer.id}`}>
      <p>{customer.email}</p>
      <p className="text-xs text-slate-500 dark:text-slate-300">
        {customer.mobile || "N/A"}
      </p>
    </div>,
    (() => {
      const customerOrders = orders.filter((order) => order.customerId === customer.id);
      const latestOrder = [...customerOrders].sort((a, b) => b.date.localeCompare(a.date))[0];
      return (
        <div key={`customer-orders-${customer.id}`}>
          <p className="font-semibold">{customerOrders.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {latestOrder ? `Latest ${latestOrder.id}` : "No orders yet"}
          </p>
        </div>
      );
    })(),
    (() => {
      const totalSpend = orders
        .filter((order) => order.customerId === customer.id)
        .reduce((acc, order) => acc + order.amount, 0);
      return <p key={`customer-spend-${customer.id}`} className="font-semibold">{currencyFormatter.format(totalSpend)}</p>;
    })(),
    <select
      key={`customer-status-${customer.id}`}
      value={customer.status}
      onChange={(event) => updateUserStatus(customer.id, event.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="blocked">Blocked</option>
    </select>,
  ]);
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Customers
      </h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search customer, email, mobile..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>
        <select
          value={spendFilter}
          onChange={(event) => setSpendFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All spend levels</option>
          <option value="high">High spend (88=500)</option>
          <option value="medium">Medium spend (200-499)</option>
          <option value="low">Low spend (&lt;200)</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setSpendFilter("all");
          }}
        >
          Reset
        </Button>
      </div>
      <Table
        headers={["Name", "Contact", "Orders", "Spend", "Status"]}
        rows={rows}
        emptyMessage="No customers found."
      />
    </div>
  );
};

export default AdminCustomers;

