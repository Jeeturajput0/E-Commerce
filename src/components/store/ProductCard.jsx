import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { getProductImage } from "../../features/store/utils/store";
import Button from "../common/Button";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const liked = wishlist.includes(product.id);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-md backdrop-blur-xl transition dark:border-secondary-700/60 dark:bg-secondary-900/70"
    >
      <Link to={`/product/${product.id}`} className="overflow-hidden">
        <img
          src={getProductImage(product)}
          alt={product.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-secondary-700 shadow dark:bg-secondary-900/85 dark:text-secondary-200"
      >
        <Heart className={`h-4 w-4 ${liked ? "fill-current text-rose-500" : ""}`} />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300">
            {product.category}
          </span>

          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
            <Star className="h-3 w-3 fill-current" /> {product.rating}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-base font-semibold leading-snug transition hover:text-primary-600 dark:hover:text-primary-300"
        >
          {product.title}
        </Link>

        <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div>
            <span className="text-lg font-bold">${product.price}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {product.stock} in stock
            </p>
          </div>

          <Button
            variant="secondary"
            className="px-3 py-1.5 text-xs"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingBag className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
