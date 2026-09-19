import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { slugifyCategory } from "../../features/store/utils/store";

export default function CategorySidebar({ open, setOpen, categories }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black"
          />

          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed left-0 top-0 z-[70] h-full w-72 bg-white p-5 shadow-lg dark:bg-slate-900"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Categories</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/categories/${slugifyCategory(category)}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
