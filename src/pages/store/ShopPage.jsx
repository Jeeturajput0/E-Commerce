import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";

const ShopPage = () => {
  const { products, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("latest");
  const [price, setPrice] = useState(500);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramCategory = searchParams.get("category");
    setCategory(paramCategory || "All");
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, [category, sortBy, price]);

  const filteredProducts = useMemo(() => {
    const list = products
      .filter((product) => category === "All" || product.category === category)
      .filter((product) => product.price <= price);

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "latest") list.sort((a, b) => b.id - a.id);

    return list;
  }, [products, category, sortBy, price]);

  const onCategorySelect = (value) => {
    setCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value === "All") {
      next.delete("category");
    } else {
      next.set("category", value);
    }
    setSearchParams(next);
  };

  return (
    <PageTransition className="space-y-8">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/60 dark:bg-slate-900/75 lg:flex-row lg:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold">Shop</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Discover curated products from approved marketplace vendors.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <select
            value={category}
            onChange={(event) => onCategorySelect(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          >
            <option>All</option>
            {categories.map((entry) => (
              <option key={entry.id} value={entry.name}>
                {entry.name}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="latest">Latest</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Max Price: ${price}
            </p>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              className="w-full accent-primary-500"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300">No products match your filters.</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => {
              setCategory("All");
              setSortBy("latest");
              setPrice(500);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </PageTransition>
  );
};

export default ShopPage;
