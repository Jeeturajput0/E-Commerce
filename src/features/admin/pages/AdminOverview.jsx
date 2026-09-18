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
    ["Total Revenue", `$${(data.totalRevenue || 0).toLocaleString()}`, Wallet],
    ["Total Orders", data.totalOrders, ShoppingCart],
    ["Total Products", data.totalProducts, Package],
    ["Total Customers", data.totalCustomers ?? data.totalUsers, Users],
    ["Total Vendors", data.totalVendors, UserSquare2],
    ["Pending Orders", data.pendingOrders, ShoppingCart],
    ["Completed Orders", data.completedOrders, TrendingUp],
    ["Cancelled Orders", data.cancelledOrders, ShoppingCart],
    ["Pending Products", data.pendingProducts, Package],
  ];

  const revenueByDay = analytics?.revenueByDay || [];
  const maxRevenue = Math.max(1, ...revenueByDay.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-semibold text-primary-600">Performance</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([title, value, icon]) => (
          <MetricCard key={title} title={title} value={value} delta="Live database total" icon={icon} />
        ))}
      </div>
      <div className={panelClass}>
        <h3 className="font-semibold">Product approval summary</h3>
        <p className="mt-2 text-sm text-slate-600">
          Approved: {data.approvedProducts} · Pending: {data.pendingProducts} · Rejected: {data.rejectedProducts} · Out of stock: {data.outOfStock} · Pending vendors: {data.pendingVendors}
        </p>
      </div>
      <div className={panelClass}>
        <h3 className="font-semibold">Revenue — last {revenueByDay.length} days</h3>
        {revenueByDay.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No revenue data yet. Orders will appear here once customers check out.</p>
        ) : (
          <div className="mt-4 flex h-32 items-end gap-1">
            {revenueByDay.map((day) => (
              <div key={day._id} className="group relative flex-1 rounded-t bg-primary-500/80" style={{ height: `${Math.max(4, (day.revenue / maxRevenue) * 100)}%` }} title={`${day._id}: $${day.revenue} (${day.orders} orders)`} />
            ))}
          </div>
        )}
      </div>
      {analytics?.ordersByStatus?.length > 0 && (
        <div className={panelClass}>
          <h3 className="font-semibold">Orders by status</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {analytics.ordersByStatus.map((s) => (
              <span key={s._id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
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
