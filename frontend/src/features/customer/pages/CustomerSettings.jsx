import { useState } from "react";
import Button from "../../../components/common/Button";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";

const CustomerSettings = () => {
  const { addToast } = useApp();
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [wishlistAlerts, setWishlistAlerts] = useState(true);
  const [darkEmails, setDarkEmails] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Settings</h2>
      <div className={`${panelClass} space-y-3`}>
        <h3 className="font-display text-lg font-semibold text-primary-600">Notification Preferences</h3>
        <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
          <span>Order updates</span>
          <input type="checkbox" checked={orderAlerts} onChange={(event) => setOrderAlerts(event.target.checked)} className="h-4 w-4 accent-primary-600" />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
          <span>Wishlist price alerts</span>
          <input type="checkbox" checked={wishlistAlerts} onChange={(event) => setWishlistAlerts(event.target.checked)} className="h-4 w-4 accent-primary-600" />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800">
          <span>Promotional emails</span>
          <input type="checkbox" checked={darkEmails} onChange={(event) => setDarkEmails(event.target.checked)} className="h-4 w-4 accent-primary-600" />
        </label>
        <div className="flex justify-end">
          <Button onClick={() => addToast("Customer settings saved")}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;
