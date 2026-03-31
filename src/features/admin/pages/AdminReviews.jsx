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
export const AdminReviews = () => {
  const { reviews, products, users } = useApp();
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Reviews
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Total Reviews</p>
          <p className="mt-2 text-2xl font-bold">{reviews.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Average Rating</p>
          <p className="mt-2 text-2xl font-bold">{averageRating.toFixed(1)} / 5</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Five Star</p>
          <p className="mt-2 text-2xl font-bold">{reviews.filter((review) => review.rating === 5).length}</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <Card key={review.id} className="border border-slate-300/80 dark:border-slate-700/80">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={products.find((product) => product.id === review.productId)?.images?.[0]}
                  alt={products.find((product) => product.id === review.productId)?.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {products.find((product) => product.id === review.productId)?.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    by {review.user} � Vendor {users.find((user) => user.id === review.vendorId)?.name || "N/A"}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-700">
                {review.rating}.0
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {review.message}
            </p>
            <div className="mt-3 flex items-center gap-1 text-primary-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={`${review.id}-${index}`}
                  className={`h-4 w-4 ${index < review.rating ? "fill-primary-500" : "text-slate-300 dark:text-slate-600"}`}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;

