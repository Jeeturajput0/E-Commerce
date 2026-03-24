import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
export default function HeroSection() {
    return (<section className="relative flex min-h-[430px] items-center overflow-hidden bg-surface-dark md:min-h-[540px]">
      <img src={heroBanner} alt="Hero Banner" className="absolute inset-0 h-full w-full object-cover opacity-65"/>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,22,0.96)_0%,rgba(16,18,22,0.86)_42%,rgba(16,18,22,0.42)_72%,rgba(16,18,22,0.2)_100%)]"/>
      <div className="absolute bottom-12 left-[12%] hidden text-5xl font-heading font-semibold text-white/6 lg:block">
        Elecormone
      </div>
      <div className="container-custom relative z-10 py-16 sm:py-20">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="max-w-xl pl-0 md:pl-12">
          <span className="mb-5 inline-block rounded-full gradient-primary px-4 py-1.5 text-xs font-bold text-primary-foreground sm:text-sm">
            Clearance Sale
          </span>
          <h2 className="mb-4 text-4xl font-heading font-bold leading-[0.95] text-surface-dark-foreground sm:text-5xl md:text-6xl">
            Save <span className="text-gradient">35%-55%</span>
            <br />
            On New Arrivals
          </h2>
          <p className="mb-8 max-w-md text-sm text-surface-dark-foreground/72 sm:text-base">
            Discover premium electronics at unbeatable prices. Limited time offer on top brands.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-sm">
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>);
}
