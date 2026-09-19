import { useState } from "react";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";
import { EarningsChart, VendorMetricCard } from "../widgets/vendorWidgets";

const VendorAnalytics = () => {
  const { earnings, products, orders, currentUser } = useApp();
  const vendorProducts = products.filter((product) => product.vendorId === currentUser?.id);
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const topSelling = [...vendorProducts].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const totalRevenue = vendorOrders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Conversion Trend" value="+18.4%" hint="Compared with last month" />
        <VendorMetricCard label="Top Category" value={topSelling[0]?.category || "N/A"} hint="Highest performing category" />
        <VendorMetricCard label="Revenue" value={`$${totalRevenue}`} hint="Across all vendor orders" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold">Revenue Trend</h3>
          <EarningsChart items={earnings} />
        </div>
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold">Top Products</h3>
          <div className="space-y-3">
            {topSelling.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 text-sm dark:border-slate-700/60">
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">{product.category}</p>
                </div>
                <span className="font-semibold">{product.sold} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;
