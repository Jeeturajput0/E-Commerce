import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import PageTransition from "../../components/common/PageTransition";
import ProductCard from "../../components/store/ProductCard";
import { useApp } from "../../context/AppContext";

const HomePage = () => {
  const { products, categories, testimonials } = useApp();
  const featured = products.slice(0, 4);

  return (
    <PageTransition className="space-y-16">
      <section className="glass overflow-hidden rounded-3xl p-8 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
              <Sparkles className="h-3.5 w-3.5" /> Next-Gen Marketplace
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Premium Multi-Vendor Commerce Experience
            </h1>
            <p className="mt-4 max-w-xl text-secondary-600 dark:text-secondary-300">
              Launch a polished marketplace with storefront elegance, powerful vendor tools,
              and delightful customer journeys.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop">
                <Button>
                  Explore Shop
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/vendor/dashboard">
                <Button variant="secondary">Become a Vendor</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-72 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-8 text-white shadow-glass md:h-80">
              <p className="text-sm text-white/70">Live Marketplace Snapshot</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                280+ active products from top-performing vendors
              </h3>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">$84K</p>
                  <p className="text-xs text-white/80">Revenue</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">1.9K</p>
                  <p className="text-xs text-white/80">Orders</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-xs text-white/80">Rating</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Truck, title: "Fast Fulfillment", text: "Shipping workflows optimized for speed." },
          { icon: ShieldCheck, title: "Trusted Vendors", text: "Approval flow with quality monitoring." },
          { icon: Sparkles, title: "Premium UX", text: "Crafted interface for modern commerce." },
        ].map((item) => (
          <Card key={item.title} className="flex items-start gap-3">
            <item.icon className="h-5 w-5 text-primary-500" />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
            </div>
          </Card>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold">Featured Products</h2>
          <Link to="/shop" className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            View all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="font-display text-3xl font-bold">Top Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="glass rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-widest text-secondary-500 dark:text-secondary-300">
                {category.count} products
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </motion.section>

      <section className="grid gap-4 lg:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-8 text-white"
        >
          <p className="text-xs uppercase tracking-wide text-primary-100">Limited Offer</p>
          <h3 className="mt-3 font-display text-3xl font-bold">Spring Seller Week</h3>
          <p className="mt-2 max-w-md text-primary-100">
            New vendors get reduced commission for first 30 days and premium campaign support.
          </p>
          <Button className="mt-6 bg-white text-primary-900 hover:bg-secondary-100">Join Now</Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary-700 to-secondary-800 p-8 text-white"
        >
          <p className="text-xs uppercase tracking-wide text-secondary-200">Customer Perk</p>
          <h3 className="mt-3 font-display text-3xl font-bold">Free Express Shipping</h3>
          <p className="mt-2 max-w-md text-secondary-200">
            Get free 2-day delivery on all orders above $200 with verified marketplace sellers.
          </p>
          <Button className="mt-6 bg-white text-slate-900 hover:bg-slate-100">
            Start Shopping
          </Button>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="font-display text-3xl font-bold">Testimonials</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((entry) => (
            <Card key={entry.id}>
              <p className="text-slate-600 dark:text-slate-300">"{entry.quote}"</p>
              <div className="mt-4">
                <p className="font-semibold">{entry.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">{entry.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      <section className="glass rounded-3xl p-8 text-center">
        <h2 className="font-display text-3xl font-bold">Stay in the Loop</h2>
        <p className="mx-auto mt-3 max-w-2xl text-secondary-600 dark:text-secondary-300">
          Receive product drops, marketplace updates, and insider strategies directly in your inbox.
        </p>
        <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-2xl border border-secondary-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-secondary-700 dark:bg-secondary-900"
          />
          <Button type="submit" className="sm:min-w-36">
            Subscribe
          </Button>
        </form>
      </section>
    </PageTransition>
  );
};

export default HomePage;
