import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Star, Heart, ShoppingCart, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cartStore } from "@/data/cartStore";
import { toast } from "sonner";
import ProductCard from "@/components/shared/ProductCard";
export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const [qty, setQty] = useState(1);
    if (!product) {
        return (<div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground">Product not found</h1>
        <Link to="/shop" className="text-primary mt-4 inline-block hover:underline">Back to Shop</Link>
      </div>);
    }
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const i = () => {
        for (let i = 0; i < qty; i++)
            cartStore.addToCart(product);
        toast.success(`${qty}x ${product.name} added to cart`);
    };
    return (<div className="container-custom py-10">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14}/>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight size={14}/>
        <span className="min-w-0 break-words text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-xl overflow-hidden bg-secondary/30 flex items-center justify-center p-8 aspect-square">
          <img src={product.image} alt={product.name} className="max-h-full object-contain"/>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
          {product.badge && (<span className="inline-block w-fit px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold mb-4">
              {product.badge}
            </span>)}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}/>))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-heading font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (<span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>)}
          </div>
          <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex w-fit items-center rounded-lg border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus size={16}/></button>
              <span className="px-4 font-bold text-foreground">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus size={16}/></button>
            </div>
            <button onClick={i} disabled={!product.inStock} className="flex w-full flex-1 items-center justify-center gap-2 rounded-lg gradient-primary py-3 text-sm font-heading font-bold text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)] disabled:opacity-40 sm:w-auto">
              <ShoppingCart size={18}/> Add to Cart
            </button>
            <button className="w-full rounded-lg border border-border p-3 transition-colors hover:bg-secondary sm:w-auto">
              <Heart size={20}/>
            </button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Category: <span className="text-foreground">{product.category}</span></p>
            <p className="mt-1">Availability: <span className={product.inStock ? "text-success" : "text-destructive"}>{product.inStock ? "In Stock" : "Out of Stock"}</span></p>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (<div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Related Products</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
          </div>
        </div>)}
    </div>);
}
