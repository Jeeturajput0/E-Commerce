import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";
import { VendorMetricCard } from "../widgets/vendorWidgets";

const VendorOverview = () => {
  const { products, orders, currentUser } = useApp();
  const vendorProducts = products.filter((product) => product.vendorId === currentUser?.id);
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const totalRevenue = vendorOrders.reduce((acc, order) => acc + order.amount, 0);
  const deliveredOrders = vendorOrders.filter((order) => order.status === "Delivered");
  const processingOrders = vendorOrders.filter((order) => ["Pending", "Processing", "Shipped"].includes(order.status));
  const topProducts = [...vendorProducts].sort((a, b) => b.sold - a.sold).slice(0, 4);

  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Performance</h2>
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <div className={`${panelClass} space-y-4`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-primary-600">Store Snapshot</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Daily overview of your sales, orders, and active catalog.
              </p>
            </div>
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">Live</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Fulfillment</p>
              <p className="mt-2 text-lg font-semibold">{deliveredOrders.length}/{vendorOrders.length || 1}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Best Seller</p>
              <p className="mt-2 text-lg font-semibold">{topProducts[0]?.title || "No products"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Low Stock</p>
              <p className="mt-2 text-lg font-semibold">{vendorProducts.filter((product) => product.stock < 25).length} items</p>
            </div>
          </div>
        </div>

        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60">
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">{product.category}</p>
                </div>
                <span className="text-sm font-semibold text-primary-600">{product.sold} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <VendorMetricCard label="Sales" value={`$${totalRevenue}`} hint={`${deliveredOrders.length} delivered orders`} />
        <VendorMetricCard label="Orders" value={vendorOrders.length} hint={`${processingOrders.length} active shipments`} />
        <VendorMetricCard label="Products" value={vendorProducts.length} hint={`${vendorProducts.filter((product) => product.stock < 25).length} low stock items`} />
        <VendorMetricCard label="Average Order" value={`$${vendorOrders.length ? Math.round(totalRevenue / vendorOrders.length) : 0}`} hint="Current store ticket size" />
      </div>

      <div className={panelClass}>
        <h3 className="mb-4 font-display text-xl font-semibold">Product Performance</h3>
        <div className="grid gap-2">
          {vendorProducts.slice(0, 5).map((product) => (
            <div key={product.id} className="grid grid-cols-[1fr_70px_70px] items-center gap-3 text-sm">
              <span>{product.title}</span>
              <span className="text-right">${product.price}</span>
              <span className="text-right text-slate-500 dark:text-slate-300">Sold {product.sold}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorOverview;
