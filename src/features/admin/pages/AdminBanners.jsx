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
export const AdminBanners = () => {
  const { blogs } = useApp();

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Banners
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {blogs.map((banner) => (
          <Card key={`banner-${banner.id}`} className="p-3">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-40 w-full rounded-xl object-cover"
            />
            <h3 className="mt-3 font-semibold">{banner.title}</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
              Campaign date: {banner.date}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBanners;

