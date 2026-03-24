import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { motion } from "framer-motion";
export default function ProductSection({ title, filter, limit = 5 }) {
    const filtered = filter ? products.filter(filter) : products;
    const displayed = filtered.slice(0, limit);
    return (<section className="section-padding">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">{title}</h2>
          <div className="mx-6 hidden h-px flex-1 bg-border md:block"/>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {displayed.map((product, i) => (<ProductCard key={product.id} product={product} index={i}/>))}
        </div>
      </div>
    </section>);
}
