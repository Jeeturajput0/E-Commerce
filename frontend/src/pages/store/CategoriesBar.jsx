import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";
import CategorySidebar from "./CategorySidebar";

const categories = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Sports",
  "Books",
  "Gadgets",
  "Accessories",
  "Mobiles",
  "Laptops",
  "Footwear",
  "Toys",
  ];

export default function CategoriesBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className=" mx-auto flex w-full max-w-7xl items-center justify-between rounded-[1.75rem] border border-white/70 px-4 py-3 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/70  bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b">

        <div className="container-custom flex justify-center items-center gap-4 py-2">
          
          {/* 🔥 ALL BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600 text-white text-sm font-medium shadow hover:opacity-90"
          >
            <Menu className="w-4 h-4" />
            All
          </button>

          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat, index) => {
              const slug = cat.toLowerCase().replace(/\s+/g, "-");
              const isActive = pathname.includes(slug);

              return (
                <Link key={index} to={`/category/${slug}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition border
                    ${
                      isActive
                        ? "bg-primary-600 text-white border-primary-600"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <CategorySidebar open={open} setOpen={setOpen} categories={categories} />
    </>
  );
}