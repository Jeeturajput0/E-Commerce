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
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-secondary-200/40 bg-white/85 shadow-sm transition dark:border-secondary-700/60 dark:bg-secondary-900/70"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-secondary-700 shadow dark:bg-secondary-900/85 dark:text-secondary-200"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current text-rose-500" : ""}`} />
        </button>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-secondary-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" /> {product.rating}
          </span>
        </div>
        <Link to={`/shop/${product.id}`} className="line-clamp-2 font-display text-lg font-semibold">
          {product.title}
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <Button variant="secondary" className="px-3 py-2" onClick={() => addToCart(product.id)}>
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;

