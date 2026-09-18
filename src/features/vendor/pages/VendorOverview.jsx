import { useEffect, useState } from "react";
import { resolveImage } from "../../../lib/api";
import { dashboardService } from "../../../services/api.services";
import { panelClass, sectionTitleClass } from "../constants";
import { VendorMetricCard } from "../widgets/vendorWidgets";

const VendorOverview = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    dashboardService
      .vendor()
      .then(setData)
      .catch((e) => setError(e.message));
  }, [retry]);

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className={sectionTitleClass}>Performance</h2>
        <div className={panelClass}>
          <p className="text-sm text-rose-600">Dashboard failed: {error}</p>
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
        <h2 className={sectionTitleClass}>Performance</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  const fulfillment = data.totalOrders ? Math.round((data.completedOrders / data.totalOrders) * 100) : 0;

  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Performance</h2>
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <div className={`${panelClass} space-y-4`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-primary-600">Store Snapshot</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Live sales, orders, and catalog synced from the backend.
              </p>
            </div>
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">Live</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Fulfillment</p>
              <p className="mt-2 text-lg font-semibold">{fulfillment}%</p>
              <p className="text-xs text-slate-400">{data.completedOrders}/{data.totalOrders} delivered</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Pending Orders</p>
              <p className="mt-2 text-lg font-semibold">{data.pendingOrders}</p>
              <p className="text-xs text-slate-400">need fulfillment</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Out of Stock</p>
              <p className="mt-2 text-lg font-semibold">{data.outOfStock || 0} items</p>
              <p className="text-xs text-slate-400">restock soon</p>
            </div>
          </div>
          {data.recentOrders?.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold">Recent Orders</h4>
              <div className="space-y-2">
                {data.recentOrders.slice(0, 4).map((order) => (
                  <div key={order._id} className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 text-sm dark:border-slate-700/60">
                    <div>
                      <p className="font-semibold">{order.customerName}</p>
                      <p className="text-xs text-slate-500">{order.items?.length || 0} items · {order.status}</p>
                    </div>
                    <span className="font-semibold text-primary-600">${order.totalAmount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">Top Products</h3>
          <div className="space-y-3">
            {(data.topProducts || []).length === 0 && (
              <p className="text-sm text-slate-500">No products yet. Add your first product to start selling.</p>
            )}
            {(data.topProducts || []).map((product) => (
              <div key={product._id} className="flex items-center gap-3 rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60">
                <img src={resolveImage(product.images?.[0] || product.image)} alt={product.name} className="h-10 w-10 rounded-lg object-cover" onError={(e) => { e.currentTarget.src = "/logo.jpg"; }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{product.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">Stock {product.stock} · ★ {product.rating || 0}</p>
                </div>
                <span className="text-sm font-semibold text-primary-600">{product.sold || 0} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <VendorMetricCard label="Total Sales" value={`$${data.totalSales}`} hint={`${data.completedOrders} delivered orders`} />
        <VendorMetricCard label="Monthly Sales" value={`$${data.monthlySales}`} hint="Current month revenue" />
        <VendorMetricCard label="Orders" value={data.totalOrders} hint={`${data.pendingOrders} pending`} />
        <VendorMetricCard label="Products" value={data.totalProducts} hint={`${data.approvedProducts} approved · ${data.pendingProducts} pending`} />
      </div>

      <div className={panelClass}>
        <h3 className="mb-4 font-display text-xl font-semibold">Order Status</h3>
        <div className="grid gap-2 text-sm sm:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p className="text-xs uppercase text-slate-500">Pending</p><p className="text-lg font-bold">{data.pendingOrders}</p></div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p className="text-xs uppercase text-slate-500">Completed</p><p className="text-lg font-bold">{data.completedOrders}</p></div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p className="text-xs uppercase text-slate-500">Cancelled</p><p className="text-lg font-bold">{data.cancelledOrders}</p></div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p className="text-xs uppercase text-slate-500">Active Products</p><p className="text-lg font-bold">{data.activeProducts}</p></div>
        </div>
      </div>
    </div>
  );
};

export default VendorOverview;
