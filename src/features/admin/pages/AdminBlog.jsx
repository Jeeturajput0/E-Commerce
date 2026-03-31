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
export const AdminBlog = () => {
  const { blogs } = useApp();
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Blog Management
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <Card key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              className="h-36 w-full rounded-xl object-cover"
            />
            <h3 className="mt-3 font-semibold">{post.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {post.date}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;

