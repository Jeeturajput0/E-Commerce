import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";
import { EarningsChart, VendorLineChart, VendorMetricCard } from "../widgets/vendorWidgets";
import { Search } from "lucide-react";
import { useState } from "react";

const VendorEarnings = () => {
  const { earnings, currentUser, orders } = useApp();
  const [query, setQuery] = useState("");
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const total = vendorOrders.reduce((acc, order) => acc + order.amount, 0);
  const paid = Math.round(total * 0.76);
  const pending = total - paid;
  const filteredEarnings = earnings.filter((item) => item.month.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Earnings</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Gross Revenue" value={`$${total}`} hint="All vendor orders combined" />
        <VendorMetricCard label="Paid Out" value={`$${paid}`} hint="Transferred to your account" />
        <VendorMetricCard label="Pending" value={`$${pending}`} hint="Awaiting next payout cycle" />
      </div>

      <div className={`${panelClass} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`}>
        <div>
          <h3 className="font-display text-lg font-semibold text-primary-600">Earnings Search</h3>
          <p className="text-sm text-slate-500 dark:text-slate-300">Filter monthly payout trend by month name.</p>
        </div>
        <label className="flex min-w-[240px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Search month like Jan" />
        </label>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">Earnings Trend</h3>
          <VendorLineChart items={filteredEarnings.length ? filteredEarnings : earnings} />
        </div>
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">Monthly Earnings</h3>
          <EarningsChart items={filteredEarnings.length ? filteredEarnings : earnings} />
        </div>
      </div>
    </div>
  );
};

export default VendorEarnings;
