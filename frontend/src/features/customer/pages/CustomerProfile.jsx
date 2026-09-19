import { useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { sectionTitleClass } from "../constants";

const CustomerProfile = () => {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+1 555 948 1002",
    gender: currentUser?.gender || "Female",
    dob: currentUser?.dob || "1998-06-12",
    city: currentUser?.city || "Seattle",
    state: currentUser?.state || "Washington",
    zipCode: currentUser?.zipCode || "98109",
    bio: currentUser?.bio || "Shopping enthusiast who loves curated deals and fast delivery.",
  });

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Profile</h2>
      <Card>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateCurrentUserProfile(form);
          }}
        >
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Full name" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder="Phone" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.gender} onChange={(event) => setForm((prev) => ({ ...prev, gender: event.target.value }))} placeholder="Gender" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input type="date" value={form.dob} onChange={(event) => setForm((prev) => ({ ...prev, dob: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.city} onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))} placeholder="City" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.state} onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value }))} placeholder="State" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <input value={form.zipCode} onChange={(event) => setForm((prev) => ({ ...prev, zipCode: event.target.value }))} placeholder="ZIP code" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <textarea rows={4} value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} placeholder="Short bio" className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <Button type="submit" className="w-fit">Save Changes</Button>
        </form>
      </Card>
    </div>
  );
};

export default CustomerProfile;
