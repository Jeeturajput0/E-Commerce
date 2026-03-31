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
export const AdminSettings = () => {
  const [storeName, setStoreName] = useState("E-Commerces Admin");
  const [supportEmail, setSupportEmail] = useState("support@ecommerces.io");
  const [supportPhone, setSupportPhone] = useState("+91 98765 43210");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [taxRate, setTaxRate] = useState(18);
  const [shippingFee, setShippingFee] = useState(49);
  const [allowCOD, setAllowCOD] = useState(true);
  const [autoApproveVendors, setAutoApproveVendors] = useState(false);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAdmin, setTwoFactorAdmin] = useState(true);

  const fieldClass =
    "rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900";
  const recentActivity = [
    "Payment gateway switched to Stripe (2 hrs ago)",
    "New banner campaign published (Today)",
    "Tax rate updated from 16% to 18% (Yesterday)",
    "Vendor approval policy changed (2 days ago)",
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-primary-600">
        Settings
      </h2>
      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-4">
          <div className={`${panelClass} space-y-4`}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Store Profile
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Store name
                </span>
                <input
                  value={storeName}
                  onChange={(event) => setStoreName(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Support email
                </span>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(event) => setSupportEmail(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Support mobile
                </span>
                <input
                  value={supportPhone}
                  onChange={(event) => setSupportPhone(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Timezone
                </span>
                <select
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className={fieldClass}
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </label>
            </div>
          </div>

          <div className={`${panelClass} space-y-4`}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Commerce Rules
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Currency
                </span>
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className={fieldClass}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Tax rate (%)
                </span>
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={taxRate}
                  onChange={(event) => setTaxRate(Number(event.target.value))}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Shipping fee
                </span>
                <input
                  type="number"
                  min={0}
                  value={shippingFee}
                  onChange={(event) =>
                    setShippingFee(Number(event.target.value))
                  }
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Allow cash on delivery</span>
              <input
                type="checkbox"
                checked={allowCOD}
                onChange={(event) => setAllowCOD(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Auto approve vendors</span>
              <input
                type="checkbox"
                checked={autoApproveVendors}
                onChange={(event) =>
                  setAutoApproveVendors(event.target.checked)
                }
                className="h-4 w-4 accent-primary-600"
              />
            </label>
          </div>

          <div className={`${panelClass} space-y-3`}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Alerts & Security
            </h3>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Low stock alerts</span>
              <input
                type="checkbox"
                checked={lowStockAlert}
                onChange={(event) => setLowStockAlert(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Order activity alerts</span>
              <input
                type="checkbox"
                checked={orderAlerts}
                onChange={(event) => setOrderAlerts(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Admin 2FA required</span>
              <input
                type="checkbox"
                checked={twoFactorAdmin}
                onChange={(event) => setTwoFactorAdmin(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-800">
              <span>Maintenance mode</span>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(event) => setMaintenanceMode(event.target.checked)}
                className="h-4 w-4 accent-primary-600"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className={panelClass}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Configuration Snapshot
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">Currency</span>
                <span className="font-semibold">{currency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">Tax</span>
                <span className="font-semibold">{taxRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">
                  Shipping fee
                </span>
                <span className="font-semibold">${shippingFee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-300">
                  Vendor policy
                </span>
                <span className="font-semibold">
                  {autoApproveVendors ? "Auto" : "Manual"}
                </span>
              </div>
            </div>
          </div>

          <div className={panelClass}>
            <h3 className="font-display text-lg font-semibold text-primary-600">
              Recent Activity
            </h3>
            <div className="mt-3 space-y-2">
              {recentActivity.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700/80 dark:bg-slate-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

