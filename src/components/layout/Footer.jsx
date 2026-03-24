import { Link } from "react-router-dom";
import { Globe, Send, Camera, Play, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
    navigate: [
        { label: "About Us", to: "/about" },
        { label: "Return Policy", to: "/shop" },
        { label: "Terms & Conditions", to: "/shop" },
        { label: "Shipping & Returns", to: "/shop" },
        { label: "Contact Us", to: "/contact" },
        { label: "Blog", to: "/blog" },
    ],
    categories: [
        "Smart Watches", "Android TV", "Headphones & Earphones",
        "Computers & Laptops", "Cameras", "Accessories",
    ],
    brands: ["Samsung", "Apple", "Sony", "LG", "Bose", "Canon"],
};

export default function Footer() {
    return (<footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="border-b border-border/20">
        <div className="container-custom py-6 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
              { title: "Free Delivery", desc: "On orders over $50" },
              { title: "Save 15%", desc: "With credit card" },
              { title: "24/7 Support", desc: "Dedicated support" },
              { title: "Best Prices", desc: "Guaranteed savings" },
          ].map((benefit) => (<div key={benefit.title}>
              <p className="font-heading text-sm font-bold text-primary">{benefit.title}</p>
              <p className="mt-1 text-xs text-surface-dark-foreground/60">{benefit.desc}</p>
            </div>))}
        </div>
      </div>

      <div className="container-custom grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-xl font-heading">
            <span className="text-gradient">ELECTRO</span>STORE
          </h3>
          <div className="space-y-3 text-sm text-surface-dark-foreground/70">
            <p className="flex items-center gap-2"><MapPin size={14} className="text-primary"/> 123 Electronics Ave, Tech City</p>
            <p className="flex items-center gap-2"><Mail size={14} className="text-primary"/> support@electrostore.com</p>
            <p className="flex items-center gap-2"><Phone size={14} className="text-primary"/> (00) 1234 567891</p>
          </div>
          <div className="mt-5 flex gap-3">
            {[Globe, Send, Camera, Play].map((Icon, index) => (<a key={index} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dark-foreground/10 transition-all hover:bg-primary hover:text-primary-foreground">
                <Icon size={16}/>
              </a>))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-heading font-bold uppercase tracking-wider">Navigate</h4>
          <ul className="space-y-2">
            {footerLinks.navigate.map((link) => (<li key={link.label}>
                <Link to={link.to} className="text-sm text-surface-dark-foreground/70 transition-colors hover:text-primary">{link.label}</Link>
              </li>))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-heading font-bold uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2">
            {footerLinks.categories.map((category) => (<li key={category}>
                <Link to="/shop" className="text-sm text-surface-dark-foreground/70 transition-colors hover:text-primary">{category}</Link>
              </li>))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-heading font-bold uppercase tracking-wider">Popular Brands</h4>
          <ul className="space-y-2">
            {footerLinks.brands.map((brand) => (<li key={brand}>
                <span className="text-sm text-surface-dark-foreground/70">{brand}</span>
              </li>))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/20">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 text-xs text-surface-dark-foreground/50 md:flex-row">
          <p>(c) 2026 ElectroStore. All rights reserved.</p>
          <div className="flex gap-4">
            {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((provider) => (<span key={provider} className="rounded bg-surface-dark-foreground/10 px-3 py-1 text-xs font-medium text-surface-dark-foreground/60">{provider}</span>))}
          </div>
        </div>
      </div>
    </footer>);
}
