import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Clock3,
  Headphones,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Trusted Products",
    description: "We curate reliable electronics from brands customers already know and use.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description: "Orders are processed quickly with careful packaging and live shipment tracking.",
    icon: Truck,
  },
  {
    title: "Real Support",
    description: "Our team helps with product questions, orders, and after-sales support.",
    icon: Headphones,
  },
  {
    title: "Fair Pricing",
    description: "We keep pricing competitive across daily essentials and premium devices.",
    icon: BadgeDollarSign,
  },
];

const stats = [
  { value: "25K+", label: "Orders fulfilled" },
  { value: "120+", label: "Products curated" },
  { value: "4.8/5", label: "Average rating" },
  { value: "24/7", label: "Support response window" },
];

const principles = [
  {
    title: "Curated, not cluttered",
    description:
      "We keep the catalog focused so customers spend less time comparing and more time buying the right device.",
    icon: Sparkles,
  },
  {
    title: "Performance-first selection",
    description:
      "Every product line is reviewed for quality, durability, and practical day-to-day value.",
    icon: Zap,
  },
  {
    title: "Customer confidence",
    description:
      "From shipping updates to support follow-up, every step is designed to feel clear and dependable.",
    icon: Star,
  },
];

const milestones = [
  {
    title: "Product discovery",
    description:
      "We identify devices that solve common needs across work, entertainment, travel, and home setups.",
  },
  {
    title: "Quality screening",
    description:
      "Products are filtered for build quality, brand reliability, and customer satisfaction signals.",
  },
  {
    title: "Fast fulfillment",
    description:
      "Orders are packed quickly and sent with tracking so customers stay informed after checkout.",
  },
  {
    title: "Ongoing support",
    description:
      "We stay available for pre-sale questions, delivery issues, and post-purchase guidance.",
  },
];

const servicePoints = [
  { label: "Handpicked catalog", icon: Sparkles },
  { label: "Quick shipping workflow", icon: Clock3 },
  { label: "Support from real people", icon: Headphones },
];

export default function About() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate border-b border-border bg-surface-dark text-surface-dark-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,180,0,0.22),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(74,222,244,0.14),transparent_20%),linear-gradient(135deg,rgba(10,13,17,0.98),rgba(17,19,23,0.9))]" />
        <div className="container-custom relative py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                About ElectroStore
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-heading font-bold leading-tight md:text-6xl">
                A cleaner, faster way to shop for modern electronics.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-surface-dark-foreground/72 md:text-lg">
                ElectroStore is built for shoppers who want useful tech without the noise.
                We combine a curated product mix, straightforward pricing, and responsive
                support so every purchase feels easy and dependable.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
                >
                  Explore Products
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-surface-dark-foreground transition-colors hover:bg-white/10"
                >
                  Talk to Support
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {servicePoints.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-surface-dark-foreground/78 backdrop-blur-md"
                  >
                    <Icon size={15} className="text-primary" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur-md md:p-6"
            >
              <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-surface-dark-foreground/58">
                  Store Snapshot
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-black/10 p-4"
                    >
                      <p className="text-2xl font-heading font-bold text-primary md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-surface-dark-foreground/68">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-custom py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="glass-card-hover rounded-[1.75rem] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={22} className="text-primary" />
              </div>
              <h2 className="mt-4 text-lg font-heading font-bold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-custom pb-14 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_24px_60px_rgba(17,19,23,0.06)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Our Story
            </p>
            <h2 className="mt-4 text-3xl font-heading font-bold text-foreground">
              We built the store around how people actually shop for tech.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              Most electronics sites overload users with endless options and weak product
              guidance. ElectroStore takes the opposite approach: fewer, stronger choices,
              cleaner product presentation, and support that helps customers move forward
              quickly.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              The goal is simple: make buying headphones, laptops, smart devices, and
              accessories feel as polished as using them. That means useful recommendations,
              reliable fulfillment, and a storefront that respects the customer's time.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.08 }}
                className="rounded-[1.75rem] border border-border bg-secondary/40 p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-heading font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              How We Work
            </p>
            <h2 className="mt-4 text-3xl font-heading font-bold text-foreground md:text-4xl">
              A retail flow designed to keep quality high and friction low.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {milestones.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_18px_44px_rgba(17,19,23,0.04)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-sm font-bold text-primary">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-xl font-heading font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] bg-surface-dark p-8 text-surface-dark-foreground md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Ready to Shop
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-heading font-bold md:text-4xl">
                Discover electronics that look better, work harder, and arrive faster.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-surface-dark-foreground/70 md:text-base">
                Browse the latest devices, compare essentials, or contact the team if you
                want help choosing the right product.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                Shop Now
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-surface-dark-foreground transition-colors hover:bg-white/10"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
