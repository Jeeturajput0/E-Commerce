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
export const AdminCategories = () => {
  const { categories, products } = useApp();
  const counts = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        total: products.filter((product) => product.category === category.name)
          .length,
      })),
    [categories, products],
  );

  return (
    <div className="space-y-4">
      <h2 className="mb-4 font-display text-2xl font-semibold text-primary-600">
        Categories
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((category) => (
          <Card key={category.id}>
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">
              Active products
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              {category.name}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {category.total}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;

