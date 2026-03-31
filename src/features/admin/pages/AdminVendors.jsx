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
export const AdminVendors = () => {
  const { users, products, orders, payments, toggleVendorApproval } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [revenueFilter, setRevenueFilter] = useState("all");
  const vendors = users.filter((user) => user.role === "vendor");
  const filteredVendors = useMemo(
    () =>
      vendors.filter((vendor) => {
        const query = searchTerm.trim().toLowerCase();
        const vendorRevenue = payments
          .filter(
            (payment) =>
              payment.vendorId === vendor.id && payment.status === "Paid",
          )
          .reduce((acc, payment) => acc + payment.amount, 0);
        const matchesSearch =
          query.length === 0 ||
          vendor.name.toLowerCase().includes(query) ||
          vendor.email.toLowerCase().includes(query) ||
          (vendor.mobile || "").toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "all" || vendor.status === statusFilter;
        const matchesRevenue =
          revenueFilter === "all" ||
          (revenueFilter === "high" && vendorRevenue >= 300) ||
          (revenueFilter === "low" && vendorRevenue < 300);
        return matchesSearch && matchesStatus && matchesRevenue;
      }),
    [vendors, payments, searchTerm, statusFilter, revenueFilter],
  );

  const vendorStats = useMemo(() => {
    const approved = filteredVendors.filter((vendor) => vendor.status === "approved").length;
    const pending = filteredVendors.filter((vendor) => vendor.status === "pending").length;
    const totalRevenue = payments
      .filter(
        (payment) =>
          payment.status === "Paid" &&
          filteredVendors.some((vendor) => vendor.id === payment.vendorId),
      )
      .reduce((acc, payment) => acc + payment.amount, 0);
    return { approved, pending, totalRevenue };
  }, [filteredVendors, payments]);

  const rows = filteredVendors.map((vendor) => {
    const vendorProducts = products.filter((product) => product.vendorId === vendor.id);
    const vendorOrders = orders.filter((order) => order.vendorId === vendor.id);
    const vendorRevenue = payments
      .filter((payment) => payment.vendorId === vendor.id && payment.status === "Paid")
      .reduce((acc, payment) => acc + payment.amount, 0);

    return [
      <div key={`vendor-name-${vendor.id}`}>
        <p className="font-semibold">{vendor.name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">Vendor #{vendor.id}</p>
      </div>,
      <div key={`vendor-contact-${vendor.id}`}>
        <p>{vendor.email}</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          {vendor.mobile || "N/A"}
        </p>
      </div>,
      <div key={`vendor-catalog-${vendor.id}`}>
        <p className="font-semibold">{vendorProducts.length} products</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          {vendorOrders.length} orders
        </p>
      </div>,
      <div key={`vendor-revenue-${vendor.id}`}>
        <p className="font-semibold">${vendorRevenue.toLocaleString()}</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          Avg ticket $
          {vendorOrders.length > 0
            ? (vendorOrders.reduce((acc, order) => acc + order.amount, 0) / vendorOrders.length).toFixed(0)
            : 0}
        </p>
      </div>,
      <div key={vendor.id} className="flex items-center gap-2">
        <StatusBadge value={vendor.status} />
        <Button
          variant="secondary"
          className="px-2 py-1 text-xs"
          onClick={() => toggleVendorApproval(vendor.id)}
        >
          {vendor.status === "approved" ? "Set Pending" : "Approve"}
        </Button>
      </div>,
    ];
  });
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Vendor Approvals
      </h2>
      <div className={`${panelClass} grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]`}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search vendor, email, mobile..."
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={revenueFilter}
          onChange={(event) => setRevenueFilter(event.target.value)}
          className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900"
        >
          <option value="all">All revenue bands</option>
          <option value="high">High revenue (&lt;=300)</option>
          <option value="low">Low revenue (&lt;300)</option>
        </select>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setRevenueFilter("all");
          }}
        >
          Reset
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Approved Vendors</p>
          <p className="mt-2 text-2xl font-bold">{vendorStats.approved}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Pending Vendors</p>
          <p className="mt-2 text-2xl font-bold">{vendorStats.pending}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Paid Revenue</p>
          <p className="mt-2 text-2xl font-bold">${vendorStats.totalRevenue.toLocaleString()}</p>
        </Card>
      </div>
      <Table
        headers={["Vendor", "Contact", "Catalog", "Revenue", "Approval"]}
        rows={rows}
        emptyMessage="No vendors found."
      />
    </div>
  );
};

export default AdminVendors;

