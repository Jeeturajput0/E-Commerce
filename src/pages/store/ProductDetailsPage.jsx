import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { products, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((item) => item.id === Number(productId));
  const related = useMemo(
    () =>
      product
        ? products
            .filter((item) => item.category === product.category && item.id !== product.id)
            .slice(0, 4)
        : [],
    [products, product]
  );

  if (!product) {
    return (
      <PageTransition className="rounded-2xl border border-slate-200 p-10 text-center dark:border-slate-700">
        <h2 className="font-display text-2xl font-bold">Product Not Found</h2>
        <Link to="/shop" className="mt-3 inline-block text-primary-600 dark:text-primary-400">
          Back to shop
        </Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="space-y-12">
      <section className="grid gap-8 rounded-3xl border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/60 dark:bg-slate-900/75 lg:grid-cols-2">
        <div className="space-y-4">
          <img
            src={product.images[activeImage]}
            alt={product.title}
            className="h-96 w-full rounded-2xl object-cover"
          />
          <div className="grid grid-cols-2 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-xl border-2 ${
                  activeImage === index
                    ? "border-primary-500"
                    : "border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <img src={image} alt={`${product.title}-${index}`} className="h-28 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {product.category}
          </span>
          <h1 className="font-display text-3xl font-bold">{product.title}</h1>
          <p className="flex items-center gap-2 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{product.rating} / 5.0 rating</span>
          </p>
          <p className="text-3xl font-bold">${product.price}</p>
          <p className="text-slate-600 dark:text-slate-300">{product.description}</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-2"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)} className="p-2">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={() => addToCart(product.id, quantity)}>
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">In stock: {product.stock} units</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold">Related Products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default ProductDetailsPage;
