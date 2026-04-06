import { motion } from "framer-motion";
import {
  BookOpen,
  Dumbbell,
  Laptop,
  Lamp,
  Shirt,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { slugifyCategory } from "../../features/store/utils/store";

const iconMap = {
  Laptop,
  Shirt,
  Lamp,
  Sparkles,
  Dumbbell,
  BookOpen,
};

export default function CategoriesPage() {
  const { categories } = useApp();

  return (
    <section className="bg-secondary/30">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 text-center text-2xl font-bold md:text-3xl"
        >
          Shop Categories
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Laptop;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/categories/${slugifyCategory(category.name)}`}
                  className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:bg-blue-200">
                    <Icon
                      size={26}
                      className="text-blue-500 transition-all duration-300 group-hover:text-blue-700"
                    />
                  </div>

                  <h3 className="text-sm font-semibold">{category.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{category.count} Products</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
