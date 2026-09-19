import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import ImageUploader from "../../../components/common/ImageUploader";
import { api } from "../../../lib/api";
import { FOLDERS } from "../../../services/upload.service";

const empty = {
  name: "",
  shortDescription: "",
  details: "",
  category: "",
  subcategory: "",
  brand: "",
  size: "",
  color: "",
  mrp: "",
  saleprice: "",
  quantity: "",
  sku: "",
  sizes: "",
  colors: "",
  tags: "",
};

const toImageObjects = (item) => {
  if (Array.isArray(item?.images) && item.images.length) {
    return item.images.map((img) => (typeof img === "string" ? { url: img } : img));
  }
  if (item?.image) return [{ url: item.image, fileId: item.imageFileId || "" }];
  return [];
};

const VendorAddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [images, setImages] = useState([]);
  const [lists, setLists] = useState({ category: [], brand: [], size: [], color: [] });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [category, brand, size, color] = await Promise.all([
          api("/vendor/categories"),
          api("/vendor/brands"),
          api("/vendor/sizes"),
          api("/vendor/colors"),
        ]);
        setLists({ category, brand, size, color });
        if (id) {
          const item = await api(`/vendor/products/${id}`);
          setForm({
            ...empty,
            ...item,
            category: item.category?._id || item.category || "",
            brand: item.brand?._id || item.brand || "",
            size: item.size?._id || item.size || "",
            color: item.color?._id || item.color || "",
            sizes: (item.sizes || []).join(", "),
            colors: (item.colors || []).join(", "),
            tags: (item.tags || []).join(", "),
          });
          setImages(toImageObjects(item));
        }
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [id]);

  const set = (key, value) =>
    setForm((old) => (key === "category" ? { ...old, category: value, brand: "", size: "" } : { ...old, [key]: value }));

  const save = async (e) => {
    e.preventDefault();
    setError("");
    if (!images.length) {
      setError("Please upload at least one product image");
      return;
    }
    if (+form.saleprice > +form.mrp) {
      setError("Sale price cannot exceed MRP");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        mrp: +form.mrp,
        saleprice: +form.saleprice,
        quantity: +form.quantity,
        stock: +form.quantity,
        price: +form.saleprice,
        brand: form.brand || undefined,
        size: form.size || undefined,
        color: form.color || undefined,
        images,
      };
      await api(id ? `/vendor/products/${id}` : "/vendor/products", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      navigate("/vendor/dashboard/products");
    } catch (x) {
      setError(x.message);
    } finally {
      setSaving(false);
    }
  };

  const matching = (key) =>
    form.category
      ? lists[key].filter((item) => item.categories?.some((c) => String(c._id || c) === form.category))
      : lists[key];

  const inputClass = "rounded-xl border p-3 font-normal";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        onClick={() => navigate("/vendor/dashboard/products")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </button>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary-600">Vendor Catalog</p>
        <h2 className="mt-1 text-3xl font-bold">{id ? "Edit Product" : "Add Product"}</h2>
        <p className="mt-2 text-slate-500">Vendor products are submitted for admin approval after saving.</p>
      </div>
      <Card className="border border-slate-200 p-6">
        <form onSubmit={save} className="grid gap-4">
          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-rose-600">{error}</p>}
          <label className="grid gap-2 text-sm font-semibold">
            Product name
            <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Short description
            <input value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} className={inputClass} placeholder="One-line highlight" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Description
            <textarea value={form.details} onChange={(e) => set("details", e.target.value)} className={inputClass} rows={4} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <select required value={form.category} onChange={(e) => set("category", e.target.value)} className="rounded-xl border p-3">
              <option value="">Select category</option>
              {lists.category.map((x) => (
                <option key={x._id} value={x._id}>{x.name}</option>
              ))}
            </select>
            <input value={form.subcategory} onChange={(e) => set("subcategory", e.target.value)} className={inputClass} placeholder="Subcategory (optional)" />
            <select value={form.brand} onChange={(e) => set("brand", e.target.value)} className="rounded-xl border p-3">
              <option value="">Select brand</option>
              {matching("brand").map((x) => (
                <option key={x._id} value={x._id}>{x.name}</option>
              ))}
            </select>
            <select value={form.size} onChange={(e) => set("size", e.target.value)} className="rounded-xl border p-3">
              <option value="">Select size</option>
              {matching("size").map((x) => (
                <option key={x._id} value={x._id}>{x.name}</option>
              ))}
            </select>
            <select value={form.color} onChange={(e) => set("color", e.target.value)} className="rounded-xl border p-3">
              <option value="">Select color</option>
              {lists.color.map((x) => (
                <option key={x._id} value={x._id}>{x.name}</option>
              ))}
            </select>
            <input value={form.sku} onChange={(e) => set("sku", e.target.value)} className={inputClass} placeholder="SKU (optional)" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[["mrp", "MRP"], ["saleprice", "Sale price"], ["quantity", "Stock"]].map(([key, label]) => (
              <label key={key} className="grid gap-2 text-sm font-semibold">
                {label}
                <input required min="0" type="number" value={form[key]} onChange={(e) => set(key, e.target.value)} className={inputClass} />
              </label>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold">
              Sizes <span className="font-normal text-slate-400">(comma separated)</span>
              <input value={form.sizes} onChange={(e) => set("sizes", e.target.value)} className={inputClass} placeholder="S, M, L" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Colors <span className="font-normal text-slate-400">(comma separated)</span>
              <input value={form.colors} onChange={(e) => set("colors", e.target.value)} className={inputClass} placeholder="Red, Blue" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Tags <span className="font-normal text-slate-400">(comma separated)</span>
              <input value={form.tags} onChange={(e) => set("tags", e.target.value)} className={inputClass} placeholder="summer, cotton" />
            </label>
          </div>
          <ImageUploader value={images} onChange={setImages} folder={FOLDERS.products} />
          <div className="flex justify-end gap-3 border-t pt-5">
            <Button variant="ghost" onClick={() => navigate("/vendor/dashboard/products")}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : id ? "Save changes" : "Submit for approval"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default VendorAddProduct;
