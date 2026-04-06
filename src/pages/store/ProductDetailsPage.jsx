import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";
import { getProductImage } from "../../features/store/utils/store";

const ProductDetailsPage = () => {
  const { id, productId } = useParams();
  const { addToCart, products, reviews } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const resolvedId = Number(id || productId);
  const product = products.find((item) => item.id === resolvedId);
  const productReviews = reviews.filter((review) => review.productId === resolvedId);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <PageTransition className="rounded-3xl border border-slate-200 p-10 text-center dark:border-slate-700">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link to="/shop" className="mt-3 inline-block text-primary-600 dark:text-primary-400">
          Back to shop
        </Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="space-y-10">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-300">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-300">
          Shop
        </Link>{" "}
        / <span className="text-slate-700 dark:text-slate-200">{product.title}</span>
      </div>

      <section className="grid gap-8 rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/75 lg:grid-cols-[1.1fr_0.9fr] lg:p-6">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <motion.img
            key={activeImage}
            src={getProductImage(product, activeImage)}
            alt={product.title}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
          />

          <div className="grid grid-cols-2 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-2xl border-2 transition ${
                  activeImage === index
                    ? "border-primary-500"
                    : "border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} className="h-24 w-full object-cover sm:h-28" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {product.category}
          </span>

          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{product.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-2 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{product.rating} / 5.0</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {productReviews.length} review{productReviews.length === 1 ? "" : "s"}
              </span>
              <span className="text-slate-500 dark:text-slate-400">{product.stock} units in stock</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-slate-900 dark:text-white">${product.price}</p>
          <p className="leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>

          <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/40 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Sold</p>
              <p className="mt-1 text-lg font-semibold">{product.sold}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Vendor</p>
              <p className="mt-1 text-lg font-semibold">#{product.vendorId}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Availability</p>
              <p className="mt-1 text-lg font-semibold">Ready to ship</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-3"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)} className="p-3">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button className="sm:min-w-48" onClick={() => addToCart(product.id, quantity)}>
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
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
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Verified customer
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {review.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No reviews yet for this product.
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/60 dark:bg-slate-900/75"
        >
          <h2 className="text-2xl font-bold">Why shoppers love it</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li>Premium presentation using your existing product data and media.</li>
            <li>Fast add-to-cart flow with quantity controls and preserved cart logic.</li>
            <li>Clean mobile-first layout with animated image and review sections.</li>
          </ul>
        </motion.div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <Link to="/shop" className="text-sm font-semibold text-primary-600 dark:text-primary-300">
            Explore all
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={item} />
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default ProductDetailsPage;
