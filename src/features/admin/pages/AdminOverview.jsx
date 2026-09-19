import { Package, ShoppingCart, Users, UserSquare2, Wallet, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { dashboardService } from "../../../services/api.services";
import { MetricCard, panelClass } from "../shared/adminShared";

const AdminOverview = () => {
  const [data, setData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    Promise.all([dashboardService.admin(), dashboardService.adminAnalytics(30).catch(() => null)])
      .then(([dashboard, stats]) => {
        setData(dashboard);
        setAnalytics(stats);
      })
      .catch((e) => setError(e.message));
  }, [retry]);

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-semibold text-primary-600">Performance</h2>
        <div className={panelClass}>
          <p className="text-sm text-red-600">Dashboard failed: {error}</p>
          <button onClick={() => { setError(""); setRetry((r) => r + 1); }} className="mt-3 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-semibold text-primary-600">Performance</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200/70" />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    ["Total Revenue", `$${(data.totalRevenue || 0).toLocaleString()}`, Wallet, "from-emerald-500 to-teal-600"],
    ["Total Orders", data.totalOrders, ShoppingCart, "from-sky-500 to-blue-600"],
    ["Total Products", data.totalProducts, Package, "from-violet-500 to-purple-600"],
    ["Total Customers", data.totalCustomers ?? data.totalUsers, Users, "from-amber-500 to-orange-600"],
    ["Total Vendors", data.totalVendors, UserSquare2, "from-pink-500 to-rose-600"],
    ["Pending Orders", data.pendingOrders, ShoppingCart, "from-orange-400 to-amber-600"],
    ["Completed Orders", data.completedOrders, TrendingUp, "from-teal-500 to-emerald-600"],
    ["Cancelled Orders", data.cancelledOrders, ShoppingCart, "from-red-500 to-rose-600"],
    ["Pending Products", data.pendingProducts, Package, "from-yellow-500 to-amber-600"],
  ];

  const approvalTiles = [
    ["Approved", data.approvedProducts, "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"],
    ["Pending", data.pendingProducts, "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"],
    ["Rejected", data.rejectedProducts, "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"],
    ["Out of stock", data.outOfStock, "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"],
    ["Pending vendors", data.pendingVendors, "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"],
  ];

  const statusPill = (status) => {
    const value = String(status || "").toLowerCase();
    if (["delivered", "completed", "paid", "approved"].includes(value))
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
    if (["pending"].includes(value))
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
    if (["processing", "shipped"].includes(value))
      return "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
    if (["cancelled", "failed", "rejected"].includes(value))
      return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
    return "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300";
  };

  const revenueByDay = analytics?.revenueByDay || [];
  const maxRevenue = Math.max(1, ...revenueByDay.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 p-6 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15" />
        <div className="absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-black/10" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
            Admin Overview
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
            Store performance at a glance
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/80">
            Live totals from your database — revenue, orders, products, customers and vendors.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([title, value, icon, accent]) => (
          <MetricCard key={title} title={title} value={value} delta="Live database total" icon={icon} accent={accent} />
        ))}
      </div>
      <div className={panelClass}>
        <h3 className="font-semibold">Product approval summary</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {approvalTiles.map(([label, count, style]) => (
            <div key={label} className={`rounded-xl px-4 py-3 text-center ${style}`}>
              <p className="text-2xl font-bold">{count ?? 0}</p>
              <p className="mt-1 text-xs font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={panelClass}>
        <h3 className="font-semibold">Revenue — last {revenueByDay.length} days</h3>
        {revenueByDay.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No revenue data yet. Orders will appear here once customers check out.</p>
        ) : (
          <div className="mt-4 flex h-32 items-end gap-1.5">
            {revenueByDay.map((day) => (
              <div key={day._id} className="group relative flex-1 rounded-t-lg bg-gradient-to-t from-emerald-600 via-teal-500 to-cyan-300 transition hover:opacity-80" style={{ height: `${Math.max(4, (day.revenue / maxRevenue) * 100)}%` }} title={`${day._id}: $${day.revenue} (${day.orders} orders)`} />
            ))}
          </div>
        )}
      </div>
      {analytics?.ordersByStatus?.length > 0 && (
        <div className={panelClass}>
          <h3 className="font-semibold">Orders by status</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {analytics.ordersByStatus.map((s) => (
              <span key={s._id} className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPill(s._id)}`}>
                {s._id}: {s.count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
