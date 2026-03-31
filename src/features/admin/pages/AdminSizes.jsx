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
export const AdminSizes = () => {
  const sizeRows = [
    { size: "Small (S)", products: 18, status: "active" },
    { size: "Medium (M)", products: 29, status: "active" },
    { size: "Large (L)", products: 24, status: "active" },
    { size: "XL", products: 9, status: "inactive" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Sizes
      </h2>
      <Table
        headers={["Size", "Products", "Status"]}
        rows={sizeRows.map((item) => [
          item.size,
          item.products,
          <StatusBadge key={`size-${item.size}`} value={item.status} />,
        ])}
      />
    </div>
  );
};

export default AdminSizes;

