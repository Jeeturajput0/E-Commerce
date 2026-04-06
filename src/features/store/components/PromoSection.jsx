import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

export default function PromoSection() {
  return (
    <section className="space-y-6 py-2">
      <div className="container-custom grid grid-cols-1 gap-4 md:grid-cols-2">
        {banners.map((banner, index) => (
          <motion.div
            key={banner.title}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
          >
            <Link
              to="/shop"
              className="group relative block h-36 overflow-hidden rounded-xl sm:h-40 md:h-44"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
              <div className="relative z-10 flex h-full flex-col justify-center p-4 text-white sm:p-5">
                <span className="text-xs opacity-80">{banner.subtitle}</span>
                <h3 className="mt-1 text-lg font-bold sm:text-xl">{banner.title}</h3>
                <span className="mt-2 text-xs font-semibold group-hover:underline">
                  Shop now
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link
            to="/shop"
            className="group relative block h-40 overflow-hidden rounded-xl md:h-48"
          >
            <img
              src={wideBanner.image}
              alt={wideBanner.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/70 to-transparent" />
            <div className="relative z-10 flex h-full max-w-md flex-col justify-center p-5 text-white md:p-6">
              <span className="text-xs font-semibold text-primary-200">
                {wideBanner.subtitle}
              </span>
              <h3 className="mt-1 text-xl font-bold sm:text-2xl">{wideBanner.title}</h3>
              <span className="mt-2 text-xs font-semibold group-hover:underline">
                Explore collection
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
