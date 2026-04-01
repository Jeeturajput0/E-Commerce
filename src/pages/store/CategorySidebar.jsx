import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategorySidebar({ open, setOpen, categories }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 z-50 shadow-lg p-5"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">All Categories</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* Categories List */}
            <div className="flex flex-col gap-3">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}