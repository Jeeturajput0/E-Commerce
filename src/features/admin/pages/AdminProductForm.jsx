import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import { api } from "../../../lib/api";
const empty = {
  name: "",
  details: "",
  category: "",
  brand: "",
  size: "",
  color: "",
  mrp: "",
  saleprice: "",
  quantity: "",
  image: "",
  isActive: true,
};
const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty),
    [file, setFile] = useState(null),
    [lists, setLists] = useState({
      category: [],
      brand: [],
      size: [],
      color: [],
    }),
    [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const [category, brand, size, color] = await Promise.all(
          ["category", "brand", "size", "color"].map((x) => api(`/admin/${x}`)),
        );
        setLists({ category, brand, size, color });
        if (id) {
          const item = await api(`/admin/products/${id}`);
          setForm({
            ...empty,
            ...item,
            category: item.category?._id || "",
            brand: item.brand?._id || "",
            size: item.size?._id || "",
            color: item.color?._id || "",
          });
        }
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [id]);
  const set = (key, value) =>
    setForm((old) =>
      key === "category"
        ? { ...old, category: value, brand: "", size: "" }
        : { ...old, [key]: value },
    );
  const save = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      Object.entries({
        ...form,
        mrp: +form.mrp,
        saleprice: +form.saleprice,
        quantity: +form.quantity,
      }).forEach(([key, value]) => body.append(key, value));
      if (file) body.set("image", file);
      await api(id ? `/admin/products/${id}` : "/admin/products", {
        method: id ? "PUT" : "POST",
        body,
      });
      navigate("/admin/dashboard/products");
    } catch (x) {
      setError(x.message);
    }
  };
  const matching = (key) =>
    form.category
      ? lists[key].filter((item) =>
          item.categories?.some((c) => String(c._id || c) === form.category),
        )
      : lists[key];
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        onClick={() => navigate("/admin/dashboard/products")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </button>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary-600">
          Catalog
        </p>
        <h2 className="mt-1 text-3xl font-bold">
          {id ? "Edit Product" : "Add Product"}
        </h2>
        <p className="mt-2 text-slate-500">
          Admin products are published immediately after saving.
        </p>
      </div>
      <Card className="border border-slate-200 p-6">
        <form onSubmit={save} className="grid gap-4">
          {error && <p className="text-rose-600">{error}</p>}
          <label className="grid gap-2 text-sm font-semibold">
            Product name
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="rounded-xl border p-3 font-normal"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Description
            <textarea
              value={form.details}
              onChange={(e) => set("details", e.target.value)}
              className="rounded-xl border p-3 font-normal"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <select
              required
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="rounded-xl border p-3"
            >
              <option value="">Select category</option>
              {lists.category.map((x) => (
                <option key={x._id} value={x._id}>
                  {x.name}
                </option>
              ))}
            </select>
            <select
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              className="rounded-xl border p-3"
            >
              <option value="">Select brand</option>
              {matching("brand").map((x) => (
                <option key={x._id} value={x._id}>
                  {x.name}
                </option>
              ))}
            </select>
            <select
              value={form.size}
              onChange={(e) => set("size", e.target.value)}
              className="rounded-xl border p-3"
            >
              <option value="">Select size</option>
              {matching("size").map((x) => (
                <option key={x._id} value={x._id}>
                  {x.name}
                </option>
              ))}
            </select>
            <select
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
              className="rounded-xl border p-3"
            >
              <option value="">Select color</option>
              {lists.color.map((x) => (
                <option key={x._id} value={x._id}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["mrp", "MRP"],
              ["saleprice", "Sale price"],
              ["quantity", "Stock"],
            ].map(([key, label]) => (
              <label key={key} className="grid gap-2 text-sm font-semibold">
                {label}
                <input
                  required
                  min="0"
                  type="number"
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="rounded-xl border p-3 font-normal"
                />
              </label>
            ))}
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            Product image
            <input
              accept="image/*"
              type="file"
              onChange={(e) => setFile(e.target.files[0] || null)}
              className="rounded-xl border p-3 font-normal"
            />
            {file && (
              <span className="text-xs font-normal text-slate-500">
                Selected: {file.name}
              </span>
            )}
          </label>
          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/dashboard/products")}
            >
              Cancel
            </Button>
            <Button type="submit">{id ? "Save changes" : "Add Product"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AdminProductForm;
