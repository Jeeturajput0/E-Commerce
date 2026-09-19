import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";
import { categoryService, productService } from "../../services/api.services";
import { slugifyCategory } from "../../features/store/utils/store";

const PAGE_SIZE = 12;

const normalizeProduct = (item) => ({
  ...item,
  id: item._id,
  title: item.name,
  price: item.saleprice,
  stock: item.quantity ?? item.stock,
  description: item.details || item.shortDescription || "",
  images: Array.isArray(item.images) && item.images.length ? item.images.map((i) => (typeof i === "string" ? i : i.url)) : item.image ? [item.image] : [],
  category: item.category?.name || item.category || "",
  rating: item.rating || 0,
});

const ShopPage = () => {
  const { categorySlug } = useParams();
  const { categories } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [categoryId, setCategoryId] = useState("");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedCategory = categorySlug
    ? categories.find((c) => slugifyCategory(c.name) === categorySlug)?.name || "All"
    : searchParams.get("category") || "All";

  // Resolve category name -> id for backend filtering
  useEffect(() => {
    if (selectedCategory === "All") {
      setCategoryId("");
      return;
    }
    const found = categories.find((c) => c.name === selectedCategory);
    if (found) {
      setCategoryId(found._id || found.id);
    } else {
      // Fallback: fetch categories directly and match by slug
      categoryService.list().then((list) => {
        const match = (list.data || list).find((c) => slugifyCategory(c.name) === (categorySlug || slugifyCategory(selectedCategory)));
        setCategoryId(match?._id || "");
      }).catch(() => {});
    }
  }, [selectedCategory, categories, categorySlug]);

  const page = Number(searchParams.get("page")) || 1;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const sortMap = { latest: "newest", newest: "newest", rating: "rating", popular: "popular", "price-asc": "price-asc", "price-desc": "price-desc" };
      const body = await productService.list({
        search: searchParams.get("q") || "",
        category: categoryId || undefined,
        sort: sortMap[searchParams.get("sort")] || "newest",
        maxPrice: searchParams.get("maxPrice") || undefined,
        page,
        limit: PAGE_SIZE,
      });
      const list = body.data || body.items || [];
      setItems(list.map(normalizeProduct));
      setPagination(body.pagination || { total: list.length, page: 1, pages: 1 });
    } catch (e) {
      setError(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams, categoryId, page]);

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setSortBy(searchParams.get("sort") || "newest");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchProducts, search]);

  const updateParams = (updates = {}) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === "All") {
        next.delete(key);
        return;
      }
      next.set(key, String(value));
    });
    if (!("page" in updates)) next.delete("page");
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
    setSortBy("newest");
    setMaxPrice("");
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
              Live catalog with server-side search, filters, and sorting.
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
              placeholder="Search products, brands, tags..."
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
              <option key={entry.id || entry._id} value={entry.name}>
                {entry.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => updateParams({ sort: event.target.value })}
            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950/70 dark:focus:ring-primary-900/30"
          >
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/70">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Max Price: <span className="font-semibold text-primary-500">{maxPrice ? `$${maxPrice}` : "Any"}</span>
            </p>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => updateParams({ maxPrice: event.target.value })}
              placeholder="No limit"
              className="mt-2 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </motion.section>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-800 dark:text-slate-100">{items.length}</span> of{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-100">{pagination.total}</span> products
        </p>
        <Button variant="ghost" onClick={resetFilters}>Reset Filters</Button>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">Failed to load products: {error}</p>
          <Button variant="secondary" className="mt-4" onClick={fetchProducts}>Retry</Button>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton />
      ) : items.length > 0 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button variant="ghost" disabled={page <= 1} onClick={() => updateParams({ page: page - 1 })}>
                Previous
              </Button>
              <span className="text-sm text-slate-500">Page {pagination.page} of {pagination.pages}</span>
              <Button variant="ghost" disabled={!pagination.hasNext} onClick={() => updateParams({ page: page + 1 })}>
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        !error && (
          <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-300">No products match your filters.</p>
            <Button variant="secondary" className="mt-4" onClick={resetFilters}>Reset Filters</Button>
          </div>
        )
      )}
    </PageTransition>
  );
};

export default ShopPage;
