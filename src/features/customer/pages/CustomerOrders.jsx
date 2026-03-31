import { Search } from "lucide-react";
import { useState } from "react";
import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";

const CustomerOrders = () => {
  const { currentUser, orders } = useApp();
  const myOrders = orders.filter((order) => order.customerId === currentUser?.id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredOrders = myOrders.filter((order) => {
    const matchesQuery =
      order.id.toLowerCase().includes(query.toLowerCase()) ||
      order.tracking.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
  const rows = filteredOrders.map((order) => [order.id, order.date, `$${order.amount}`, order.status, order.tracking]);

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
            placeholder="Search by order ID or tracking"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="All">All Status</option>
          {[...new Set(myOrders.map((order) => order.status))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <Table headers={["Order ID", "Date", "Amount", "Status", "Tracking"]} rows={rows} />
    </div>
  );
};

export default CustomerOrders;
