import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PromoSection() {
  
  const banners = [
    {
      title: "Summer Sale",
      subtitle: "Up to 50% OFF",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      gradient: "from-black/70 to-transparent",
    },
    {
      title: "New Electronics",
      subtitle: "Latest Tech",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      gradient: "from-blue-900/70 to-transparent",
    },
  ];

  const wideBanner = {
    title: "Smart Watch Collection",
    subtitle: "Save 35%-45% OFF",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  };

  return (
    <section className="py-10 space-y-10">

      {/* 🔥 GRID BANNERS */}
      <div className="container-custom grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {banners.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to="/shop"
              className="group relative block h-52 overflow-hidden rounded-2xl sm:h-56 md:h-64"
            >
              {/* IMAGE */}
              <img
                src={b.image}
                alt={b.title}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* OVERLAY */}
              <div className={`absolute inset-0 bg-gradient-to-r ${b.gradient}`} />

              {/* CONTENT */}
              <div className="relative z-10 flex h-full flex-col justify-center p-6 sm:p-8 text-white">
                <span className="text-sm opacity-80">{b.subtitle}</span>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">
                  {b.title}
                </h3>
                <span className="mt-4 text-sm font-semibold group-hover:underline">
                  Shop Now →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}

      </div>

      {/* 🔥 WIDE BANNER */}
      <div className="container-custom">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/shop"
            className="group relative block h-52 overflow-hidden rounded-2xl md:h-64"
          >
            {/* IMAGE */}
            <img
              src={wideBanner.image}
              alt={wideBanner.title}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/70 to-transparent" />

            {/* CONTENT */}
            <div className="relative z-10 flex h-full max-w-lg flex-col justify-center p-6 sm:p-8 md:p-12 text-white">
              <span className="text-sm font-bold text-primary">
                {wideBanner.subtitle}
              </span>

              <h3 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                {wideBanner.title}
              </h3>

              <span className="mt-4 text-sm font-semibold group-hover:underline">
                Shop Now →
              </span>
            </div>
          </Link>
        </motion.div>

      </div>

    </section>
  );
}