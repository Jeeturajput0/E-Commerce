import { useState } from "react";
import Button from "../../../components/common/Button";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";

const VendorSettings = () => {
  const { currentUser, addToast } = useApp();
  const [storeName, setStoreName] = useState(currentUser?.name ? `${currentUser.name} Store` : "Vendor Store");
  const [supportEmail, setSupportEmail] = useState(currentUser?.email || "vendor@example.com");
  const [supportPhone, setSupportPhone] = useState("+91 98765 11111");
  const [shippingDays, setShippingDays] = useState("3-5 business days");
  const [returnsEnabled, setReturnsEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(false);
  const [promoAlerts, setPromoAlerts] = useState(true);

  const fieldClass = "rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-sm dark:border-slate-700/80 dark:bg-slate-900";

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Settings</h2>
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <div className={`${panelClass} space-y-4`}>
          <h3 className="font-display text-lg font-semibold">Store Preferences</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm"><span>Store name</span><input value={storeName} onChange={(event) => setStoreName(event.target.value)} className={fieldClass} /></label>
            <label className="grid gap-1.5 text-sm"><span>Support email</span><input value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} className={fieldClass} /></label>
            <label className="grid gap-1.5 text-sm"><span>Support phone</span><input value={supportPhone} onChange={(event) => setSupportPhone(event.target.value)} className={fieldClass} /></label>
            <label className="grid gap-1.5 text-sm"><span>Shipping timeline</span><input value={shippingDays} onChange={(event) => setShippingDays(event.target.value)} className={fieldClass} /></label>
          </div>

          <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800"><span>Accept returns</span><input type="checkbox" checked={returnsEnabled} onChange={(event) => setReturnsEnabled(event.target.checked)} className="h-4 w-4 accent-primary-600" /></label>
          <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800"><span>Enable cash on delivery</span><input type="checkbox" checked={codEnabled} onChange={(event) => setCodEnabled(event.target.checked)} className="h-4 w-4 accent-primary-600" /></label>
          <label className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700/80 dark:bg-slate-800"><span>Promotion alerts</span><input type="checkbox" checked={promoAlerts} onChange={(event) => setPromoAlerts(event.target.checked)} className="h-4 w-4 accent-primary-600" /></label>

          <div className="flex justify-end"><Button onClick={() => addToast("Vendor settings saved")}>Save Settings</Button></div>
        </div>

        <div className={`${panelClass} space-y-3`}>
          <h3 className="font-display text-lg font-semibold">Profile Snapshot</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-slate-500 dark:text-slate-300">Store</span><span className="font-semibold">{storeName}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-500 dark:text-slate-300">Email</span><span className="font-semibold">{supportEmail}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-500 dark:text-slate-300">Returns</span><span className="font-semibold">{returnsEnabled ? "Enabled" : "Disabled"}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-500 dark:text-slate-300">COD</span><span className="font-semibold">{codEnabled ? "Enabled" : "Disabled"}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSettings;
