import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import promoMobile from "@/assets/promo-mobile.jpg";
import promoCamera from "@/assets/promo-camera.jpg";
import promoWatches from "@/assets/promo-watches.jpg";
const banners = [
    { image: promoMobile, title: "Smart Mobile", subtitle: "15% OFF", gradient: "from-blue-900/90 to-blue-600/60" },
    { image: promoCamera, title: "Camera Accessories", subtitle: "Big Discounts", gradient: "from-red-900/90 to-orange-600/60" },
];
export function PromoBannerDual() {
    return (<section className="section-padding">
      <div className="container-custom grid grid-cols-1 gap-6 md:grid-cols-2">
        {banners.map((b, i) => (<motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <Link to="/shop" className="group relative block h-52 overflow-hidden rounded-2xl sm:h-56 md:h-60">
              <img src={b.image} alt={b.title} className="absolute inset-0 h-full w-full object-cover image-zoom"/>
              <div className={`absolute inset-0 bg-gradient-to-r ${b.gradient}`}/>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_30%)]"/>
              <div className="relative z-10 flex h-full flex-col justify-center p-5 sm:p-8">
                <span className="text-sm font-medium text-surface-dark-foreground/80">{b.subtitle}</span>
                <h3 className="mt-1 text-2xl font-heading font-bold text-surface-dark-foreground md:text-3xl">
                  {b.title}
                </h3>
                <span className="mt-4 inline-flex items-center text-sm font-bold text-primary group-hover:underline">
                  {"Shop Now ->"}
                </span>
              </div>
            </Link>
          </motion.div>))}
      </div>
    </section>);
}
export function PromoBannerWide() {
    return (<section className="section-padding">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link to="/shop" className="group relative block h-56 overflow-hidden rounded-2xl md:h-64">
            <img src={promoWatches} alt="Smart Watches" className="absolute inset-0 h-full w-full object-cover image-zoom"/>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/70 to-transparent"/>
            <div className="relative z-10 flex h-full max-w-lg flex-col justify-center p-6 sm:p-8 md:p-12">
              <span className="text-sm font-bold text-primary">Save 35%-45% OFF</span>
              <h3 className="mt-2 text-3xl font-heading font-bold text-surface-dark-foreground md:text-4xl">
                Smart Watch Collection
              </h3>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-primary group-hover:underline">
                {"Shop Now ->"}
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>);
}
