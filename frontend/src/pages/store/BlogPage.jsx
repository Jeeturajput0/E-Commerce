import { CalendarDays } from "lucide-react";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

const BlogPage = () => {
  const { blogs } = useApp();

  return (
    <PageTransition className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Marketplace Blog</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Insights for scaling your brand, vendor growth, and customer retention.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 dark:border-slate-700/60 dark:bg-slate-900/70"
          >
            <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
            <div className="space-y-3 p-4">
              <p className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300">
                <CalendarDays className="h-3.5 w-3.5" /> {post.date}
              </p>
              <h3 className="font-display text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </PageTransition>
  );
};

export default BlogPage;

