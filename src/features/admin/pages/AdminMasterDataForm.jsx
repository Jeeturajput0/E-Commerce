import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import { api } from "../../../lib/api";
import { masterBase, masterConfigs } from "../components/MasterDataManager";
const AdminMasterDataForm = () => {
  const { resource, id } = useParams();
  const config = masterConfigs[resource];
  const navigate = useNavigate();
  const [form, setForm] = useState(masterBase(resource)),
    [file, setFile] = useState(null),
    [categories, setCategories] = useState([]),
    [loading, setLoading] = useState(Boolean(id)),
    [error, setError] = useState("");
  useEffect(() => {
    if (!config) return;
    (async () => {
      try {
        if (config.categories) setCategories(await api("/admin/category"));
        if (id) {
          const item = await api(`/admin/${resource}/${id}`);
          setForm({
            ...masterBase(resource),
            ...item,
            categories: item.categories?.map((c) => c._id || c) || [],
            expiryDate: item.expiryDate?.slice(0, 10) || "",
            startDate: item.startDate?.slice(0, 10) || "",
            endDate: item.endDate?.slice(0, 10) || "",
          });
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [resource, id]);
  if (!config) return <p>Unknown management page.</p>;
  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      ["discount", "discountValue", "minimumAmount"].forEach((key) => {
        if (payload[key] !== undefined) payload[key] = Number(payload[key]);
      });
      const body = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((val) => body.append(k, val));
        } else if (v !== undefined && v !== null) {
          body.append(k, v);
        }
      });
      if (file) {
        body.set("image", file);
      }
      await api(id ? `/admin/${resource}/${id}` : `/admin/${resource}`, {
        method: id ? "PUT" : "POST",
        body,
      });
      navigate(`/admin/dashboard/${resource}`);
    } catch (x) {
      setError(x.message);
    }
  };
  if (loading) return <p>Loading form...</p>;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600"
        onClick={() => navigate(`/admin/dashboard/${resource}`)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {config.title}
      </button>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary-600">
          Catalog & Content
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold text-slate-950">
          {id ? "Edit" : "Add"} {config.title.slice(0, -1)}
        </h2>
        <p className="mt-2 text-slate-500">
          Fill in the details and save to update your database.
        </p>
      </div>
      <Card className="rounded-2xl border border-slate-200 p-6 shadow-sm">
        <form className="grid gap-5" onSubmit={save}>
          {error && (
            <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>
          )}
          {config.fields.map(([key, label, type = "text"]) => (
            <label
              key={key}
              className="grid gap-2 text-sm font-semibold text-slate-700"
            >
              {label}
              {key === "description" ? (
                <textarea
                  rows="4"
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-primary-500"
                />
              ) : key === "image" ? (
                <div>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    className="w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-primary-500"
                  />
                  {file ? (
                    <p className="mt-1 text-xs font-normal text-slate-500">
                      Selected file: {file.name}
                    </p>
                  ) : form.image ? (
                    <p className="mt-1 text-xs font-normal text-slate-500">
                      Current image: {form.image}
                    </p>
                  ) : null}
                </div>
              ) : (
                <input
                  required={key === "name" || key === "title" || key === "code"}
                  type={type}
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-primary-500"
                />
              )}
            </label>
          ))}
          {resource === "coupon" && (
            <label className="grid gap-2 text-sm font-semibold">
              Discount type
              <select
                value={form.discountType}
                onChange={(e) =>
                  setForm({ ...form, discountType: e.target.value })
                }
                className="rounded-xl border p-3 font-normal"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed amount</option>
              </select>
            </label>
          )}
          {config.categories && (
            <fieldset className="rounded-xl border border-slate-200 p-4">
              <legend className="px-1 text-sm font-semibold">
                Assign categories
              </legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="inline-flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={form.categories.includes(category._id)}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          categories: e.target.checked
                            ? [...form.categories, category._id]
                            : form.categories.filter(
                                (value) => value !== category._id,
                              ),
                        })
                      }
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          {config.active && (
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
              />{" "}
              Active
            </label>
          )}
          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              variant="ghost"
              onClick={() => navigate(`/admin/dashboard/${resource}`)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {id ? "Save changes" : `Add ${config.title.slice(0, -1)}`}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AdminMasterDataForm;
