import { motion } from "framer-motion";
import { Watch, Headphones, Laptop, Camera, Smartphone, Cable } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
const iconMap = {
    Watch, Headphones, Laptop, Camera, Smartphone, Cable,
};
export default function CategoriesSection() {
    return (<section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center text-2xl font-heading font-bold text-foreground md:text-3xl">
          Shop Categories
        </motion.h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Cable;
            return (<motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to="/shop" className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-[0_15px_35px_rgba(22,22,22,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(22,22,22,0.08)]">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors"/>
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} Products</p>
                </Link>
              </motion.div>);
        })}
        </div>
      </div>
    </section>);
}
