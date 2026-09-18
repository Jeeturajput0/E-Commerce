import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";
import { resolveImage } from "../../lib/api";
import { productService, reviewService, wishlistService } from "../../services/api.services";

const ProductDetailsPage = () => {
  const { id, productId } = useParams();
  const { addToCart, addToast } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewMsg, setReviewMsg] = useState("");

  const resolvedId = id || productId;

  useEffect(() => {
    if (!resolvedId) return;
    setLoading(true);
    setError("");
    productService
      .get(resolvedId)
      .then((item) => {
        setProduct(item);
        setActiveImage(0);
        return productService.list({ category: item.category?._id || item.category, limit: 5 });
      })
      .then((body) => {
        const list = (body.data || []).filter((p) => String(p._id) !== String(resolvedId)).slice(0, 4);
        setRelated(list.map((p) => ({
          ...p,
          id: p._id,
          title: p.name,
          price: p.saleprice,
          stock: p.quantity ?? p.stock,
          images: p.images?.length ? p.images.map((i) => (typeof i === "string" ? i : i.url)) : p.image ? [p.image] : [],
          category: p.category?.name || "",
          rating: p.rating || 0,
        })));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    reviewService
      .forProduct(resolvedId)
      .then((body) => setReviews(body.data || []))
      .catch(() => setReviews([]));
    if (localStorage.getItem("token")) {
      wishlistService.check(resolvedId).then((d) => setWishlisted(d.wishlisted)).catch(() => {});
    }
  }, [resolvedId]);

  const toggleWishlist = async () => {
    if (!localStorage.getItem("token")) {
      addToast("Login to save items to your wishlist", "warning");
      return;
    }
    try {
      if (wishlisted) {
        await wishlistService.remove(resolvedId);
        setWishlisted(false);
        addToast("Removed from wishlist", "warning");
      } else {
        await wishlistService.add(resolvedId);
        setWishlisted(true);
        addToast("Saved to wishlist");
      }
    } catch (e) {
      addToast(e.message, "warning");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewMsg("");
    try {
      await reviewService.create({ productId: resolvedId, rating: Number(reviewForm.rating), comment: reviewForm.comment });
      setReviewMsg("Review submitted successfully");
      setReviewForm({ rating: 5, comment: "" });
      const body = await reviewService.forProduct(resolvedId);
      setReviews(body.data || []);
    } catch (err) {
      setReviewMsg(err.message);
    }
  };

  if (loading) {
    return (
      <PageTransition className="space-y-6">
        <div className="h-96 animate-pulse rounded-[2rem] bg-slate-200/70 dark:bg-slate-800" />
      </PageTransition>
    );
  }

  if (error || !product) {
    return (
      <PageTransition className="rounded-3xl border border-slate-200 p-10 text-center dark:border-slate-700">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">{error || "This product is unavailable."}</p>
        <Link to="/shop" className="mt-3 inline-block text-primary-600 dark:text-primary-400">
          Back to shop
        </Link>
      </PageTransition>
    );
  }

  const images = product.images?.length
    ? product.images.map((i) => (typeof i === "string" ? i : i.url))
    : product.image
      ? [product.image]
      : ["/logo.jpg"];
  const cartId = product._id;
  const inStock = (product.stock ?? product.quantity ?? 0) > 0;

  return (
    <PageTransition className="space-y-10">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-300">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-300">Shop</Link> /{" "}
        <span className="text-slate-700 dark:text-slate-200">{product.name}</span>
      </div>

      <section className="grid gap-8 rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/75 lg:grid-cols-[1.1fr_0.9fr] lg:p-6">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <motion.img
            key={activeImage}
            src={resolveImage(images[activeImage])}
            alt={product.name}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
            onError={(e) => { e.currentTarget.src = "/logo.jpg"; }}
          />
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-2xl border-2 transition ${
                    activeImage === index ? "border-primary-500" : "border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <img src={resolveImage(image)} alt={`${product.name} ${index + 1}`} className="h-24 w-full object-cover sm:h-28" onError={(e) => { e.currentTarget.src = "/logo.jpg"; }} />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {product.category?.name || product.category}
          </span>

          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-2 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{product.rating || 0} / 5.0</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {product.reviewCount || reviews.length} review{(product.reviewCount || reviews.length) === 1 ? "" : "s"}
              </span>
              <span className={inStock ? "text-emerald-600" : "text-rose-600"}>
                {inStock ? `${product.stock ?? product.quantity} in stock` : "Out of stock"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-slate-900 dark:text-white">${product.saleprice}</p>
            {product.mrp > product.saleprice && (
              <>
                <p className="text-lg text-slate-400 line-through">${product.mrp}</p>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  {product.discountPercentage || 0}% off
                </span>
              </>
            )}
          </div>
          {(product.shortDescription || product.details) && (
            <p className="leading-7 text-slate-600 dark:text-slate-300">{product.shortDescription || product.details}</p>
          )}
          {product.sizes?.length > 0 && <p className="text-sm"><b>Sizes:</b> {product.sizes.join(", ")}</p>}
          {product.colors?.length > 0 && <p className="text-sm"><b>Colors:</b> {product.colors.join(", ")}</p>}

          <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/40 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Sold</p>
              <p className="mt-1 text-lg font-semibold">{product.sold || 0}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Vendor</p>
              <p className="mt-1 text-lg font-semibold">{product.vendor?.storeName || product.vendor?.name || "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">SKU</p>
              <p className="mt-1 text-lg font-semibold">{product.sku || "—"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-700">
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="p-3">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((prev) => Math.min(product.stock ?? 99, prev + 1))} className="p-3">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button className="sm:min-w-48" disabled={!inStock} onClick={() => addToCart(cartId, quantity)}>
              <ShoppingBag className="h-4 w-4" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <button
              onClick={toggleWishlist}
              title="Toggle wishlist"
              className={`rounded-2xl border p-3 transition ${wishlisted ? "border-rose-300 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-500"}`}
            >
              <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/60 dark:bg-slate-900/75"
        >
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="mt-5 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{review.customer?.name || "Customer"}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Verified purchase</p>
                    </div>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {review.rating}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.comment}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No reviews yet for this product.</p>
            )}
          </div>
          <form onSubmit={submitReview} className="mt-6 space-y-3 border-t pt-5">
            <h3 className="font-semibold">Write a review <span className="text-xs font-normal text-slate-400">(only verified buyers can review)</span></h3>
            <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })} className="rounded-xl border px-3 py-2 text-sm">
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} star{r > 1 ? "s" : ""}</option>
              ))}
            </select>
            <textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} rows={3} placeholder="Share your experience..." className="w-full rounded-xl border p-3 text-sm" />
            {reviewMsg && <p className="text-sm text-slate-600">{reviewMsg}</p>}
            <Button type="submit">Submit Review</Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/60 dark:bg-slate-900/75"
        >
          <h2 className="text-2xl font-bold">Product Details</h2>
          <div className="mt-5 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {product.description && <p>{product.description}</p>}
            {product.details && product.details !== product.description && <p>{product.details}</p>}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <ul className="mt-3 space-y-1">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <li key={k}><b>{k}:</b> {String(v)}</li>
                ))}
              </ul>
            )}
            {product.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">#{t}</span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {related.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <Link to="/shop" className="text-sm font-semibold text-primary-600 dark:text-primary-300">
              Explore all
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.05 }}>
                <ProductCard product={item} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  );
};

export default ProductDetailsPage;
