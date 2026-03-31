import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Phone, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cartStore } from "@/data/cartStore";
import { motion, AnimatePresence } from "framer-motion";
const navLinks = [
    { label: "About Us", to: "/about" },
    { label: "Return Policy", to: "/shop" },
    { label: "Terms & Conditions", to: "/shop" },
    { label: "Shipping & Returns", to: "/shop" },
    { label: "Contact Us", to: "/contact" },
    { label: "Blog", to: "/blog" },
];
const categoryLinks = [
    "Smart Watches", "Android TV", "Headphones & Earphones",
    "Computers & Laptops", "Cameras", "Accessories",
];
export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot);
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (<header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg bg-background/95 backdrop-blur-md" : "bg-background"}`}>
      <div className="bg-surface-dark text-surface-dark-foreground">
        <div className="container-custom flex items-center justify-between py-2 text-xs">
          <span>Get up to 25% cashback on first order</span>
          <div className="hidden md:flex items-center gap-4">
            <span>support@electrostore.com</span>
            <span className="flex items-center gap-1"><Phone size={12}/> (00) 1234 567891</span>
          </div>
        </div>
      </div>

      <div className="container-custom flex items-center justify-between py-4 gap-4">
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl font-heading font-bold">
            <span className="text-gradient">ELECTRO</span>
            <span className="text-foreground">STORE</span>
          </h1>
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input type="text" placeholder="Search products..." className="w-full pl-4 pr-12 py-3 rounded-lg border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"/>
            <button className="absolute right-1 top-1 bottom-1 px-4 rounded-md gradient-primary text-primary-foreground font-medium">
              <Search size={18}/>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground">
            <Phone size={16} className="text-primary"/>
            <span>(00) 1234 567891</span>
          </div>
          <Link to="/profile" className="p-2 rounded-lg hover:bg-secondary transition-colors" aria-label="Open profile" title="Profile">
            <User size={22} className="text-foreground"/>
          </Link>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
            <Heart size={22} className="text-foreground"/>
          </button>
          <Link to="/cart" className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
            <ShoppingCart size={22} className="text-foreground"/>
            {totalItems > 0 && (<span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>)}
          </Link>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>

      <nav className="border-t border-border bg-background">
        <div className="container-custom hidden md:flex items-center gap-0">
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button className="flex items-center gap-2 px-5 py-3 gradient-primary text-primary-foreground font-semibold text-sm rounded-t-lg">
              <Menu size={16}/> Shop by Categories
            </button>
            <AnimatePresence>
              {catOpen && (<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-full left-0 w-64 bg-card border border-border rounded-b-lg shadow-xl z-50">
                  {categoryLinks.map((cat) => (<Link key={cat} to="/shop" className="block px-5 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/50 last:border-0">
                      {cat}
                    </Link>))}
                </motion.div>)}
            </AnimatePresence>
          </div>
          {navLinks.map((link) => (<Link key={link.label} to={link.to} className="px-4 py-3 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
              {link.label}
            </Link>))}
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t border-border overflow-hidden bg-background">
            <div className="p-4 space-y-1">
              <div className="relative mb-3">
                <input type="text" placeholder="Search..." className="w-full pl-4 pr-10 py-2 rounded-lg border border-border bg-secondary/50 text-sm"/>
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              </div>
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
                Profile
              </Link>
              {navLinks.map((link) => (<Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
                  {link.label}
                </Link>))}
              <div className="pt-2 border-t border-border">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">Categories</p>
                {categoryLinks.map((cat) => (<Link key={cat} to="/shop" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
                    {cat}
                  </Link>))}
              </div>
            </div>
          </motion.div>)}
      </AnimatePresence>
    </header>);
}
