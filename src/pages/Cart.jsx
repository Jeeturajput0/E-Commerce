import { useSyncExternalStore } from "react";
import { cartStore } from "@/data/cartStore";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
export default function Cart() {
    const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot);
    const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    if (items.length === 0) {
        return (<div className="container-custom py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-muted-foreground/30 mb-6"/>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="inline-flex px-8 py-3 rounded-lg gradient-primary text-primary-foreground font-heading font-bold text-sm">
          Continue Shopping
        </Link>
      </div>);
    }
    return (<div className="container-custom py-10">
      <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (<motion.div key={item.product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card flex flex-col gap-4 rounded-xl p-4 sm:flex-row">
              <Link to={`/product/${item.product.id}`} className="h-24 w-full flex-shrink-0 overflow-hidden rounded-lg bg-secondary/30 sm:w-24">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2"/>
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="font-heading font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">{item.product.category}</p>
                <p className="font-heading font-bold text-foreground mt-1">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <button onClick={() => cartStore.removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={16}/>
                </button>
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => cartStore.updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors"><Minus size={14}/></button>
                  <span className="px-3 text-sm font-bold text-foreground">{item.quantity}</span>
                  <button onClick={() => cartStore.updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors"><Plus size={14}/></button>
                </div>
              </div>
            </motion.div>))}
        </div>

        {/* Summary */}
        <div className="glass-card h-fit rounded-xl p-6 lg:sticky lg:top-28">
          <h2 className="font-heading font-bold text-foreground text-lg mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="text-foreground font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-success font-medium">Free</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-heading font-bold text-foreground">Total</span>
              <span className="font-heading font-bold text-foreground text-xl">${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-lg gradient-primary text-primary-foreground font-heading font-bold text-sm hover:shadow-[var(--shadow-glow)] transition-all">
            Proceed to Checkout
          </button>
          <Link to="/shop" className="block text-center text-sm text-primary mt-4 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>);
}
