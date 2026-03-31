import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  CreditCard,
  Headphones,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const categoryArt = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    tone: "from-sky-500/20 via-cyan-500/10 to-white/10",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    tone: "from-rose-500/20 via-orange-400/10 to-white/10",
  },
  {
    name: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    tone: "from-amber-500/20 via-yellow-300/10 to-white/10",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    tone: "from-pink-500/20 via-fuchsia-400/10 to-white/10",
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    tone: "from-emerald-500/20 via-lime-400/10 to-white/10",
  },
  {
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    tone: "from-violet-500/20 via-indigo-400/10 to-white/10",
  },
];

const whyChooseUs = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "Fast nationwide delivery on premium picks above your order threshold.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "Trusted checkout experience with protected transactions and instant confirmation.",
  },
  {
    icon: Headphones,
    title: "Easy Returns",
    text: "Simple support and smooth replacement flow if something does not feel right.",
  },
];

const stats = [
  { label: "Happy Customers", value: "25K+" },
  { label: "Premium Brands", value: "180+" },
  { label: "Average Rating", value: "4.9/5" },
];

const HomePage = () => {
  const { products, categories, testimonials } = useApp();
  const featuredProducts = products.slice(0, 4);
  const spotlightCategories = categories.map((category, index) => ({
    ...category,
    ...categoryArt[index],
  }));

  return (
    <PageTransition className="space-y-8 md:space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-primary-950 px-6 py-8 text-white shadow-[0_40px_100px_-45px_rgba(30,64,175,0.72)] md:px-10 md:py-12 lg:px-14 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.35),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(191,219,254,0.2),_transparent_24%),linear-gradient(135deg,_rgba(37,99,235,0.78),_rgba(30,58,138,0.96))]" />
        <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-45 lg:block" />
        <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-12 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              New Season, Better Style
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Upgrade Your Style with a storefront that feels premium.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover modern essentials, statement pieces, and bestselling tech in one
              sleek shopping experience crafted for high conversion and everyday delight.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop">
                <Button className="min-w-40 text-primary-700 hover:bg-primary-50">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  variant="ghost"
                  className="min-w-40 border border-white/20 text-white hover:bg-white/10"
                >
                  Explore Categories
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-md"
                >
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-[1.75rem] border-white/10 bg-white/10 p-5 text-left text-white">
                <p className="text-sm text-white/70">Flash drop</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">50% OFF</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Limited-time markdowns on curated styles and trending accessories.
                </p>
                <div className="mt-5 overflow-hidden rounded-[1.5rem]">
                  <img
                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
                    alt="Featured fashion deal"
                    className="h-56 w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="glass rounded-[1.75rem] border-white/10 bg-white/10 p-5 text-white">
                  <p className="text-sm text-white/70">This week</p>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    Luxury picks for everyday wear
                  </h3>
                  <p className="mt-2 text-sm text-slate-200">
                    Minimal silhouettes, rich textures, and clean product storytelling.
                  </p>
                </div>
                <div className="glass rounded-[1.75rem] border-white/10 bg-gradient-to-br from-white/15 to-white/5 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/70">Conversion boost</p>
                      <h3 className="mt-1 text-3xl font-bold">+32%</h3>
                    </div>
                    <BadgePercent className="h-9 w-9 text-amber-300" />
                  </div>
                  <p className="mt-3 text-sm text-slate-200">
                    Premium design, motion, and trust signals that feel like a real brand.
                  </p>
                </div>
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                    alt="Modern lifestyle collection"
                    className="h-40 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section {...fadeUp} className="grid gap-4 md:grid-cols-3">
        {whyChooseUs.map((item) => (
          <Card key={item.title} className="rounded-[1.75rem] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white dark:bg-primary-500 dark:text-white">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {item.text}
            </p>
          </Card>
        ))}
      </motion.section>

      <motion.section {...fadeUp} className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Featured Products
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Bestsellers designed to stop the scroll
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Shop By Category
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Curated collections for every vibe
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {spotlightCategories.map((category) => (
            <motion.div key={category.id} whileHover={{ y: -6 }}>
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative block overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/70 p-5 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.tone}`} />
                <div className="relative">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        {category.count} curated items
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold">
                        {category.name}
                      </h3>
                    </div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white transition group-hover:translate-x-1 dark:bg-primary-500 dark:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp}>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.4)] dark:border-slate-700/70 dark:bg-slate-900 md:px-8 lg:px-12 lg:py-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[url('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-89 lg:block" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_28%),linear-gradient(120deg,_rgba(255,255,255,0.9),_rgba(248,250,252,0.82))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.16),_transparent_28%),linear-gradient(120deg,_rgba(15,23,42,0.9),_rgba(2,6,23,0.96))]" />
          <div className="relative flex flex-col gap-6 lg:max-w-2xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-600 dark:text-rose-300">
              <BadgePercent className="h-3.5 w-3.5" />
              Limited Sale
            </span>
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                50% OFF on premium drops this week only.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                High-impact essentials, trend-led fashion, and design-forward accessories
                at launch pricing built to drive quick conversions.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/shop">
                <Button className="min-w-40">
                  Grab The Deal
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="secondary" className="min-w-40">
                  Read Style Notes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Testimonials
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Loved by customers who care about the details
            </h2>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Star className="h-4 w-4 fill-current" />
            4.9 average satisfaction
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((entry) => (
            <Card key={entry.id} className="rounded-[1.75rem] p-6">
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`${entry.id}-${index}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
                "{entry.quote}"
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 font-semibold text-slate-700 dark:bg-slate-800 dark:text-white">
                  {entry.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{entry.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[2rem] p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Why Choose Us
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold">
            Trust signals that make buying feel effortless
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            Clean visuals, strong merchandising, and frictionless checkout cues all work
            together to make your storefront feel dependable and aspirational.
          </p>
        </Card>

        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { value: "2-Day", label: "Shipping speed", icon: Truck },
            { value: "256-bit", label: "Checkout security", icon: CreditCard },
            { value: "7 Days", label: "Easy returns", icon: ShieldCheck },
          ].map((item) => (
            <Card key={item.label} className="rounded-[1.75rem] p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white dark:bg-primary-500 dark:text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-2xl font-bold">{item.value}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp}>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-primary-950 px-6 py-8 text-white shadow-[0_24px_90px_-45px_rgba(37,99,235,0.72)] dark:border-slate-700/70 md:px-8 lg:px-12 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.24),_transparent_28%),radial-gradient(circle_at_80%_25%,_rgba(191,219,254,0.22),_transparent_20%),linear-gradient(135deg,_rgba(37,99,235,0.94),_rgba(30,58,138,0.94))]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                Newsletter
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Subscribe and get 10% OFF your first order
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Join our list for fresh arrivals, launch-day deals, and curated drops that
                actually look worth opening.
              </p>
            </div>
            <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 px-5 text-sm text-white outline-none backdrop-blur-md placeholder:text-slate-300 focus:border-sky-300"
              />
              <Button className="h-14 min-w-44  text-primary-700 hover:bg-primary-50">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </motion.section>
    </PageTransition>
  );
};

export default HomePage;
