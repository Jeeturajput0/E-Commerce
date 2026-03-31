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
export const AdminColors = () => {
  const colorRows = [
    { name: "Primary Blue", hex: "#2563EB", usage: "Buttons / Active states" },
    { name: "Slate", hex: "#64748B", usage: "Secondary text" },
    { name: "Success", hex: "#22C55E", usage: "Paid / Active badges" },
    { name: "Warning", hex: "#F59E0B", usage: "Pending states" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Colors
      </h2>
      <Table
        headers={["Color", "Hex", "Usage"]}
        rows={colorRows.map((item) => [
          <div key={`color-${item.hex}`} className="flex items-center gap-3">
            <span
              className="h-5 w-5 rounded-full border border-slate-300"
              style={{ backgroundColor: item.hex }}
            />
            <span className="font-semibold">{item.name}</span>
          </div>,
          item.hex,
          item.usage,
        ])}
      />
    </div>
  );
};

export default AdminColors;

