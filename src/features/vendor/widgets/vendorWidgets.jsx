import { useState } from "react";
import Button from "../../../components/common/Button";
import { panelClass } from "../constants";

export const EarningsChart = ({ items }) => {
  const max = Math.max(...items.map((item) => item.total));
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item.month} className="grid grid-cols-[38px_1fr_75px] items-center gap-2 text-sm">
          <span className="text-slate-500 dark:text-slate-300">{item.month}</span>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700"
              style={{ width: `${(item.total / max) * 100}%` }}
            />
          </div>
          <span className="text-right font-semibold">${item.total}</span>
        </div>
      ))}
    </div>
  );
};

export const VendorLineChart = ({ items }) => {
  const width = 520;
  const height = 180;
  const max = Math.max(...items.map((item) => item.total), 1);
  const step = width / Math.max(items.length - 1, 1);
  const points = items
    .map((item, index) => {
      const x = Math.round(index * step);
      const y = Math.round(height - (item.total / max) * (height - 24));
      return `${x},${y}`;
    })
    .join(" ");
  const area = `${points} ${width},${height} 0,${height}`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full">
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1={0}
            y1={(height / 3) * line}
            x2={width}
            y2={(height / 3) * line}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeDasharray="4 6"
          />
        ))}
        <polyline points={area} fill="rgba(37,99,235,0.14)" stroke="none" />
        <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="mt-2 grid grid-cols-6 text-center text-xs text-slate-500 dark:text-slate-300">
        {items.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
};

export const VendorMetricCard = ({ label, value, hint }) => (
  <div className={panelClass}>
    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{label}</p>
    <p className="mt-2 text-3xl font-bold">{value}</p>
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">{hint}</p>
  </div>
);

export const VendorProductForm = ({ onSubmit, initial, onCancel }) => {
  const [form, setForm] = useState(
    initial || {
      title: "",
      category: "Electronics",
      price: 99,
      stock: 20,
      description: "",
      images: "",
    }
  );

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          images: form.images
            ? form.images.split(",").map((value) => value.trim())
            : [],
        });
      }}
    >
      <input required placeholder="Product title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="number" required placeholder="Price" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <input type="number" required placeholder="Stock" value={form.stock} onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </div>
      <select value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Home Decor</option>
        <option>Beauty</option>
        <option>Sports</option>
        <option>Books</option>
      </select>
      <textarea rows={3} placeholder="Description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      <input placeholder="Image URLs separated by comma" value={form.images} onChange={(event) => setForm((prev) => ({ ...prev, images: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      <div className="flex justify-end gap-2">
        {onCancel ? <Button variant="ghost" onClick={onCancel}>Cancel</Button> : null}
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
};
