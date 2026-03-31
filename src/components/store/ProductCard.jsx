import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Button from "../common/Button";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const liked = wishlist.includes(product.id);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.45)] backdrop-blur-xl transition dark:border-secondary-700/60 dark:bg-secondary-900/70"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-secondary-700 shadow dark:bg-secondary-900/85 dark:text-secondary-200"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current text-rose-500" : ""}`} />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-900/35 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" /> {product.rating}
          </span>
        </div>
        <Link
          to={`/shop/${product.id}`}
          className="line-clamp-2 min-h-[3.5rem] font-display text-xl font-semibold leading-snug"
        >
          {product.title}
        </Link>
        <p className="line-clamp-2 min-h-[3rem] text-sm leading-6 text-slate-500 dark:text-slate-400">
          {product.description}
        </p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-4 dark:border-slate-700/70">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Price</p>
            <span className="text-2xl font-bold">${product.price}</span>
          </div>
          <Button
            variant="secondary"
            className="shrink-0 px-4 py-2.5"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
