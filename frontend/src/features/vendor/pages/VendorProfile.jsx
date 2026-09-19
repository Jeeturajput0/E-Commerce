import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import ImageUploader from "../../../components/common/ImageUploader";
import { useApp } from "../../../context/AppContext";
import { api } from "../../../lib/api";
import { FOLDERS } from "../../../services/upload.service";
import { panelClass, sectionTitleClass } from "../constants";

const VendorProfile = () => {
  const { addToast } = useApp();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    storeName: "",
    storeDescription: "",
    storeAddress: "",
    storePhone: "",
  });
  const [logo, setLogo] = useState([]);
  const [banner, setBanner] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/vendor/profile")
      .then((user) => {
        setForm({
          name: user.name || "",
          mobile: user.mobile || "",
          storeName: user.storeName || "",
          storeDescription: user.storeDescription || "",
          storeAddress: user.storeAddress || "",
          storePhone: user.storePhone || "",
        });
        if (user.storeLogo) setLogo([{ url: user.storeLogo, fileId: user.storeLogoFileId || "" }]);
        if (user.storeBanner) setBanner([{ url: user.storeBanner, fileId: user.storeBannerFileId || "" }]);
        setStatus(user.vendorStatus || "");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api("/vendor/profile", {
        method: "PUT",
        body: JSON.stringify({
          ...form,
          storeLogo: logo[0] || "",
          storeBanner: banner[0] || "",
        }),
      });
      addToast("Vendor profile updated");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900";

  if (loading) return <p className="text-sm text-slate-500">Loading profile...</p>;

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Profile</h2>
      {status && (
        <p className="text-sm">
          Account status: <b className="uppercase">{status}</b>
          {status === "pending" && <span className="text-slate-500"> — awaiting admin approval. You can still manage products; publishing requires approval.</span>}
        </p>
      )}
      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <div className={panelClass}>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={save}>
          <input value={form.name} onChange={set("name")} placeholder="Owner name" className={inputClass} />
          <input value={form.mobile} onChange={set("mobile")} placeholder="Phone" className={inputClass} />
          <input value={form.storeName} onChange={set("storeName")} placeholder="Store name" className={inputClass} />
          <input value={form.storePhone} onChange={set("storePhone")} placeholder="Store phone" className={inputClass} />
          <input value={form.storeAddress} onChange={set("storeAddress")} placeholder="Store address" className={`${inputClass} sm:col-span-2`} />
          <textarea rows={4} value={form.storeDescription} onChange={set("storeDescription")} placeholder="Store description" className={`${inputClass} sm:col-span-2`} />
          <div className="sm:col-span-2">
            <ImageUploader value={logo} onChange={setLogo} folder={FOLDERS.vendors} multiple={false} maxFiles={1} label="Store logo" />
          </div>
          <div className="sm:col-span-2">
            <ImageUploader value={banner} onChange={setBanner} folder={FOLDERS.vendors} multiple={false} maxFiles={1} label="Store banner" />
          </div>
          <div className="flex justify-end sm:col-span-2">
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorProfile;
