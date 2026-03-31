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
export const AdminOverview = () => {
  const { earnings, orders, users, products, categories } = useApp();

  const salesTotal = useMemo(
    () => earnings.reduce((acc, item) => acc + item.total, 0),
    [earnings],
  );
  const latestRevenue = earnings[earnings.length - 1]?.total || 0;
  const prevRevenue =
    earnings[earnings.length - 2]?.total || latestRevenue || 1;
  const revenueGrowth =
    prevRevenue > 0 ? ((latestRevenue - prevRevenue) / prevRevenue) * 100 : 0;

  const monthlyOrderVelocity = useMemo(
    () =>
      earnings.map((item, index) => ({
        month: item.month,
        value: Math.max(120, Math.round(item.total / 65) + index * 18),
      })),
    [earnings],
  );

  const orderVelocityTotal = monthlyOrderVelocity.reduce(
    (acc, item) => acc + item.value,
    0,
  );
  const customerReach = Math.round(orderVelocityTotal * 3.6);
  const catalogScale = products.length * 40 + 4;

  const metrics = [
    {
      title: "Revenue",
      value: `$${(salesTotal / 1000).toFixed(1)}K`,
      delta: `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(1)}% vs last month`,
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: orderVelocityTotal.toLocaleString(),
      delta: "+8.2% vs last month",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: customerReach.toLocaleString(),
      delta: "+5.6% vs last month",
      icon: Users,
    },
    {
      title: "Products",
      value: catalogScale.toLocaleString(),
      delta: "+1.4% vs last month",
      icon: Package,
    },
  ];

  const topCategories = categories.slice(0, 4);
  const recentOrders = [...orders]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);
  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);
  const orderTone = {
    Pending: "bg-primary-100 text-primary-700",
    Shipped: "bg-primary-100 text-primary-700",
    Delivered: "bg-slate-100 text-slate-700",
    Processing: "bg-slate-100 text-slate-700",
    Cancelled: "bg-slate-200 text-slate-600",
  };

  return (
    <div className="space-y-6">
        


<div className="space-y-4"> 
        <div className="flex items-center justify-between">   
                <h2 className="font-display text-2xl font-semibold text-primary-600">Performance</h2>

</div>
</div>

      <div className="">

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <SalesTrendChart data={earnings} />
        <CategoryShareChart data={topCategories} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <OrdersPerformanceChart data={monthlyOrderVelocity} />
        <div className="space-y-4">
          <div className={panelClass}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Recent orders
                </h3>
                <p className="text-xs text-slate-500">
                  Latest customer activity
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Live
              </span>
            </div>
            <div className="space-y-2.5">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{order.id}</p>
                      <p className="text-xs text-slate-500">
                        {users.find((user) => user.id === order.customerId)
                          ?.name || "Customer"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${orderTone[order.status] || "bg-slate-100 text-slate-700"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{order.date}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      ${order.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={panelClass}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Products list
                </h3>
                <p className="text-xs text-slate-500">
                  Quick view of top inventory items
                </p>
              </div>
              <span className="rounded-full bg-primary-100 px-2 py-1 text-[10px] font-semibold text-primary-700">
                {topProducts.length} items
              </span>
            </div>
            <div className="space-y-2.5">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-9 w-9 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold leading-tight">
                        {product.title}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Stock {product.stock}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

