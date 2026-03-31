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
export const AdminProfile = () => {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+91 98765 43210",
    designation: currentUser?.designation || "Super Manager",
    department: currentUser?.department || "Operations",
    location: currentUser?.location || "Mumbai, India",
    accessLevel: currentUser?.accessLevel || "Full Admin Access",
    bio: currentUser?.bio || "Managing platform operations, users, payments, and vendor growth.",
  });

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Profile
      </h2>
      <div className={panelClass}>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateCurrentUserProfile(form);
          }}
        >
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Full name" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder="Phone" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.designation} onChange={(event) => setForm((prev) => ({ ...prev, designation: event.target.value }))} placeholder="Designation" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.department} onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))} placeholder="Department" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.location} onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} placeholder="Location" className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <input value={form.accessLevel} onChange={(event) => setForm((prev) => ({ ...prev, accessLevel: event.target.value }))} placeholder="Access level" className="sm:col-span-2 rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <textarea rows={4} value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} placeholder="Short bio" className="sm:col-span-2 rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900" />
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;

