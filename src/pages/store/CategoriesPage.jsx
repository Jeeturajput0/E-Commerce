import { motion } from "framer-motion";
import {
  Watch,
  Headphones,
  Laptop,
  Camera,
  Smartphone,
  Cable,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ✅ DATA YAHI ADD KIYA */
const categories = [
  { name: "Watches", icon: "Watch", count: 12 },
  { name: "Headphones", icon: "Headphones", count: 18 },
  { name: "Laptops", icon: "Laptop", count: 9 },
  { name: "Cameras", icon: "Camera", count: 7 },
  { name: "Mobiles", icon: "Smartphone", count: 20 },
  { name: "Accessories", icon: "Cable", count: 15 },
];

/* ICON MAP */
const iconMap = {
  Watch,
  Headphones,
  Laptop,
  Camera,
  Smartphone,
  Cable,
};

export default function CategoriesSection() {
  return (
    <section className=" bg-secondary/30">
      <div className="container-custom">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-10"
        >
          Shop Categories
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Cable;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/shop"
                  className="group rounded-xl p-5 flex flex-col items-center text-center bg-white dark:bg-slate-900 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* ICON */}
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-blue-200">
                    <Icon
                      size={26}
                      className="text-blue-500 transition-all duration-300 group-hover:text-blue-700"
                    />
                  </div>

                  {/* TEXT */}
                  <h3 className="font-semibold text-sm">{cat.name}</h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {cat.count} Products
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
