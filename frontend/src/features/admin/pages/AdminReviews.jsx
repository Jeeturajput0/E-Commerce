import { Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import IconButton from "../../../components/common/IconButton";
import Table from "../../../components/common/Table";
import { api, apiRaw, resolveImage, toQuery } from "../../../lib/api";
import { productService } from "../../../services/api.services";
import { StatusBadge } from "../shared/adminShared";

export const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, hasNext: false });

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [reviewBody, productBody] = await Promise.all([
        apiRaw(`/admin/review${toQuery({ page, limit: 20 })}`),
        productService.list({ limit: 100 }).catch(() => ({ data: [] })),
      ]);
      const list = reviewBody.data || [];
      setReviews(Array.isArray(list) ? list : []);
      setPagination(reviewBody.pagination || { total: (list || []).length, page: 1, pages: 1, hasNext: false });
      const plist = productBody.data || productBody.items || [];
      setProducts(Array.isArray(plist) ? plist : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const toggleVisibility = async (review) => {
    try {
      await api(`/admin/review/${review._id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive: !review.isActive }),
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (review) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api(`/admin/review/${review._id}`, { method: "DELETE" });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const productOf = (review) =>
    products.find((p) => String(p._id) === String(review.product?._id || review.product));

  const ratings = reviews.map((r) => Number(r.rating) || 0);
  const averageRating = ratings.length
    ? ratings.reduce((acc, r) => acc + r, 0) / ratings.length
    : 0;

  const headers = ["Product", "Customer", "Rating", "Review", "Status", "Actions"];

  const rows = reviews.map((review) => {
    const product = productOf(review);
    return [
      <div key={`prod-${review._id}`} className="flex items-center gap-3">
        <img
          src={resolveImage(product?.images?.[0] || product?.image)}
          alt={product?.name || "Product"}
          className="h-12 w-12 rounded-lg border object-cover"
          onError={(e) => { e.currentTarget.src = "/logo.jpg"; }}
        />
        <div>
          <p className="font-semibold">{product?.name || "Product"}</p>
          <p className="text-xs text-slate-500">
            {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
          </p>
        </div>
      </div>,
      <span key={`cust-${review._id}`} className="text-sm">
        {review.customer?.name || String(review.customer || "").slice(-6) || "Customer"}
      </span>,
      <span key={`rate-${review._id}`} className="flex items-center gap-1 text-sm font-semibold text-amber-500">
        <Star className="h-4 w-4 fill-current" />
        {review.rating || 0}
      </span>,
      <p key={`msg-${review._id}`} className="max-w-[280px] truncate text-sm text-slate-600 dark:text-slate-300" title={review.comment || ""}>
        {review.comment || "—"}
      </p>,
      <StatusBadge key={`stat-${review._id}`} value={review.isActive ? "Active" : "Inactive"} />,
      <div key={`act-${review._id}`} className="flex flex-wrap items-center gap-1.5">
        <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => toggleVisibility(review)}>
          {review.isActive ? "Hide" : "Show"}
        </Button>
        <IconButton title="Delete review" tone="danger" onClick={() => remove(review)}>
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </div>,
    ];
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-primary-600">
          Reviews
        </h2>
        <p className="mt-1 text-sm text-slate-500">Moderate live customer reviews from your store.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Total Reviews</p>
          <p className="mt-2 text-2xl font-bold">{pagination.total || reviews.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Average Rating</p>
          <p className="mt-2 text-2xl font-bold">{averageRating.toFixed(1)} / 5</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Five Star</p>
          <p className="mt-2 text-2xl font-bold">{ratings.filter((r) => r === 5).length}</p>
        </Card>
      </div>

      {error && <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-500">Loading reviews...</p>
      ) : (
        <Table headers={headers} rows={rows} emptyMessage="No reviews yet." />
      )}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-slate-500">Page {pagination.page} of {pagination.pages} ({pagination.total} reviews)</span>
          <Button variant="ghost" disabled={!pagination.hasNext} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
