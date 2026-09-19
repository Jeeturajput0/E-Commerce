import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import { api } from "../../../lib/api";
import { authService } from "../../../services/api.services";
import { panelClass } from "../shared/adminShared";

export const AdminProfile = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    authService
      .me()
      .then((data) => {
        const user = data?.data || data || {};
        setForm({ name: user.name || "", email: user.email || "", mobile: user.mobile || "" });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const save = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      const updated = await api("/user/profile", {
        method: "PUT",
        body: JSON.stringify({ name: form.name, mobile: form.mobile }),
      });
      const user = updated?.data || updated || {};
      try {
        const stored = JSON.parse(localStorage.getItem("userdetails") || "{}");
        localStorage.setItem("userdetails", JSON.stringify({ ...stored, ...user }));
      } catch {
        // storage unavailable — ignore
      }
      setMessage("Profile updated successfully");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-primary-600">
          Profile
        </h2>
        <p className="mt-1 text-sm text-slate-500">Your admin account details.</p>
      </div>
      <div className={panelClass}>
        {loading ? (
          <p className="text-sm text-slate-500">Loading profile...</p>
        ) : (
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={save}>
            {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 sm:col-span-2">{error}</p>}
            {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 sm:col-span-2">{message}</p>}
            <label className="grid gap-1.5 text-sm font-semibold">
              Full name
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Full name"
                className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 font-normal dark:border-slate-700/80 dark:bg-slate-900"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Mobile
              <input
                value={form.mobile}
                onChange={(event) => setForm((prev) => ({ ...prev, mobile: event.target.value }))}
                placeholder="Mobile number"
                className="rounded-xl border border-slate-300/80 bg-white px-3 py-2 font-normal dark:border-slate-700/80 dark:bg-slate-900"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">
              Email (cannot be changed)
              <input
                value={form.email}
                disabled
                className="rounded-xl border border-slate-300/80 bg-slate-100 px-3 py-2 font-normal text-slate-500 dark:border-slate-700/80 dark:bg-slate-800"
              />
            </label>
            <div className="sm:col-span-2 flex justify-end">
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
