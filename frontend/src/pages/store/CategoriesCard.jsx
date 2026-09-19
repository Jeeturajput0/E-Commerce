export default function CategoryCard({ title, items, linkText }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm hover:shadow-md transition">
      
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i} className="space-y-1">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-24 object-cover rounded-md"
            />
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Link */}
      <button className="mt-4 text-sm text-primary-600 hover:underline">
        {linkText}
      </button>
    </div>
  );
}