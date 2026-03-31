import { useState } from "react";
import Button from "../../../components/common/Button";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";

const VendorProfile = () => {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+91 98765 11111",
    storeName: currentUser?.storeName || `${currentUser?.name || "Vendor"} Store`,
    businessType: currentUser?.businessType || "Retail Seller",
    gstNumber: currentUser?.gstNumber || "27ABCDE1234F1Z5",
    address: currentUser?.address || "Mumbai, Maharashtra",
    bio: currentUser?.bio || "Premium seller focused on fast delivery and quality products.",
  });

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Profile</h2>
      <div className={panelClass}>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); updateCurrentUserProfile(form); }}>
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Owner name" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder="Phone" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.storeName} onChange={(event) => setForm((prev) => ({ ...prev, storeName: event.target.value }))} placeholder="Store name" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.businessType} onChange={(event) => setForm((prev) => ({ ...prev, businessType: event.target.value }))} placeholder="Business type" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.gstNumber} onChange={(event) => setForm((prev) => ({ ...prev, gstNumber: event.target.value }))} placeholder="GST number" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.address} onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))} placeholder="Business address" className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <textarea rows={4} value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} placeholder="Store bio" className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <div className="sm:col-span-2 flex justify-end"><Button type="submit">Save Profile</Button></div>
        </form>
      </div>
    </div>
  );
};

export default VendorProfile;
