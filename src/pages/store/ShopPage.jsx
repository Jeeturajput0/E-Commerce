import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";
import {
  getCategoryNameFromSlug,
  slugifyCategory,
} from "../../features/store/utils/store";

const MAX_PRICE = 500;

const ShopPage = () => {
  const { categorySlug } = useParams();
  const { categories, products } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "latest");
  const [price, setPrice] = useState(Number(searchParams.get("price")) || MAX_PRICE);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedCategory = useMemo(() => {
    if (categorySlug) {
      return getCategoryNameFromSlug(categories, categorySlug);
    }

    return searchParams.get("category") || "All";
  }, [categories, categorySlug, searchParams]);

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setSortBy(searchParams.get("sort") || "latest");
    setPrice(Number(searchParams.get("price")) || MAX_PRICE);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, [selectedCategory, sortBy, price, search]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    const list = products
      .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
      .filter((product) => product.price <= price)
      .filter((product) => {
        if (!normalizedSearch) return true;

        return [product.title, product.description, product.category].some((value) =>
          value.toLowerCase().includes(normalizedSearch)
        );
      });

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "latest") list.sort((a, b) => b.id - a.id);

    return list;
  }, [price, products, search, selectedCategory, sortBy]);

  const updateParams = (updates = {}) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === "All" ||
        value === MAX_PRICE
      ) {
        next.delete(key);
        return;
      }

      next.set(key, String(value));
    });

    setSearchParams(next);
  };

  const handleCategoryChange = (value) => {
    if (categorySlug) {
      navigate(value === "All" ? "/shop" : `/categories/${slugifyCategory(value)}`);
      return;
    }

    updateParams({ category: value });
  };

  const resetFilters = () => {
    setSearch("");
    setSortBy("latest");
    setPrice(MAX_PRICE);
    if (categorySlug) {
      navigate("/shop");
      return;
    }
    setSearchParams(new URLSearchParams());
  };

  return (
    <PageTransition className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/75 sm:p-6"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Curated storefront
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {selectedCategory === "All" ? "Shop everything" : selectedCategory}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Browse your existing marketplace catalog with improved filters, routing,
              and responsive browsing.
            </p>
          </div>

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold lg:hidden dark:border-slate-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className={`mt-6 grid gap-3 ${showFilters ? "grid" : "hidden"} lg:grid lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]`}>
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => {
                const value = event.target.value;
                setSearch(value);
                updateParams({ q: value });
              }}
              type="search"
              placeholder="Search products..."
              className="w-full rounded-2xl border border-slate-200 bg-white/90 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950/70 dark:focus:ring-primary-900/30"
            />
          </label>

          <select
            value={selectedCategory}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950/70 dark:focus:ring-primary-900/30"
          >
            <option value="All">All Categories</option>
            {categories.map((entry) => (
              <option key={entry.id} value={entry.name}>
                {entry.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => {
              const value = event.target.value;
              setSortBy(value);
              updateParams({ sort: value });
            }}
            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950/70 dark:focus:ring-primary-900/30"
          >
            <option value="latest">Latest</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/70">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Max Price: <span className="font-semibold text-primary-500">${price}</span>
            </p>
            <input
              type="range"
              min="20"
              max={MAX_PRICE}
              step="5"
              value={price}
              onChange={(event) => {
                const value = Number(event.target.value);
                setPrice(value);
                updateParams({ price: value });
              }}
              className="mt-3 w-full cursor-pointer accent-primary-500"
            />
          </div>
        </div>
      </motion.section>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-800 dark:text-slate-100">{filteredProducts.length}</span>{" "}
          product{filteredProducts.length === 1 ? "" : "s"}
        </p>
        <Button variant="ghost" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300">No products match your filters.</p>
          <Button variant="secondary" className="mt-4" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </PageTransition>
  );
};

export default ShopPage;
