import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cartStore } from "@/data/cartStore";
import { toast } from "sonner";
export default function ProductCard({ product, index = 0 }) {
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!product.inStock)
            return;
        cartStore.addToCart(product);
        toast.success(`${product.name} added to cart`);
    };
    return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.4 }}>
      <Link to={`/product/${product.id}`} className="group block overflow-hidden rounded-2xl glass-card-hover">
        <div className="relative aspect-square overflow-hidden bg-white">
          <img src={product.image} alt={product.name} className="image-zoom h-full w-full scale-110 object-contain p-4 group-hover:scale-[1.16]"/>
          {product.badge && (<span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide gradient-primary text-primary-foreground">
              {product.badge}
            </span>)}
          <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/88 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground">
            <Heart size={14}/>
          </button>
          {!product.inStock && (<div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <span className="font-heading font-bold text-muted-foreground">Sold Out</span>
            </div>)}
        </div>
        <div className="p-4">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">{product.category}</p>
          <h3 className="mb-2 min-h-10 text-sm font-heading font-semibold leading-5 text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <div className="mb-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-[#d7d1c3]"}/>))}
            <span className="ml-1 text-[11px] text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-end gap-2">
              <span className="text-base font-heading font-bold text-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && (<span className="text-[11px] text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>)}
            </div>
            <button onClick={handleAddToCart} disabled={!product.inStock} className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-primary-foreground transition-all hover:scale-105 disabled:opacity-40">
              <ShoppingCart size={14}/>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>);
}
