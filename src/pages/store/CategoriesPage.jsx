import { Link } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

const CategoriesPage = () => {
  const { categories } = useApp();

  return (
    <PageTransition className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Categories</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Browse collections by category and jump into filtered results.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop?category=${encodeURIComponent(category.name)}`}
            className="glass rounded-2xl p-5 transition hover:-translate-y-1"
          >
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-300">
              {category.count} products
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{category.name}</h3>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
};

export default CategoriesPage;

