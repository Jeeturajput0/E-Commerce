import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Crown,
  Heart,
  Mail,
  MapPin,
  Package,
  Phone,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickStats = [
  { label: "Orders placed", value: "12", icon: Package, tone: "bg-primary/12 text-primary" },
  { label: "Wishlist items", value: "08", icon: Heart, tone: "bg-rose-100 text-rose-500" },
  { label: "Saved cards", value: "03", icon: CreditCard, tone: "bg-sky-100 text-sky-600" },
  { label: "Reward points", value: "480", icon: Crown, tone: "bg-amber-100 text-amber-600" },
];

const recentOrders = [
  { id: "#ES-1024", item: "Smart Watch Ultra", status: "Delivered", date: "18 Mar 2026", price: "$519.95" },
  { id: "#ES-1018", item: "Wireless Earbuds Pro", status: "Shipped", date: "14 Mar 2026", price: "$189.00" },
  { id: "#ES-1009", item: "Pro Wireless Headphones", status: "Processing", date: "10 Mar 2026", price: "$225.00" },
];

const accountActions = [
  {
    title: "Manage Orders",
    description: "Track delivery, returns, invoices, and your purchase history.",
    icon: Package,
    to: "/shop",
  },
  {
    title: "Edit Profile",
    description: "Update contact details, addresses, and account preferences.",
    icon: Settings,
    to: "/contact",
  },
  {
    title: "Security Center",
    description: "Review account safety, privacy details, and support options.",
    icon: ShieldCheck,
    to: "/about",
  },
];

const profileSections = [
  { label: "Email address", value: "rahul.sharma@email.com", icon: Mail },
  { label: "Phone number", value: "+91 98765 43210", icon: Phone },
  { label: "Shipping address", value: "24 Lake View Residency, New Delhi, India", icon: MapPin },
];

const preferenceCards = [
  { title: "Order Alerts", text: "Get delivery and return updates instantly.", icon: Bell },
  { title: "Member Benefits", text: "Priority support and exclusive sale previews.", icon: Crown },
  { title: "Personal Picks", text: "Recommendations based on your recent activity.", icon: Sparkles },
];

const statusClasses = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Shipped: "bg-sky-100 text-sky-700",
  Processing: "bg-amber-100 text-amber-700",
};

export default function Profile() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate bg-surface-dark text-surface-dark-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,180,0,0.2),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.14),transparent_20%),linear-gradient(135deg,rgba(10,13,17,0.98),rgba(17,19,23,0.92))]" />
        <div className="container-custom relative py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-primary via-[#ffc84a] to-[#f39500] text-primary-foreground shadow-[0_18px_40px_rgba(255,180,0,0.26)]">
                    <User size={38} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full border-4 border-surface-dark bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    Pro
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                    My Profile
                  </p>
                  <h1 className="mt-2 text-3xl font-heading font-bold md:text-5xl">
                    Rahul Sharma
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-surface-dark-foreground/72 md:text-base">
                    A clean dashboard for your orders, wishlist, saved cards, and account
                    activity all in one modern space.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {profileSections.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border border-white/10 bg-black/12 p-4"
                  >
                    <div className="flex items-center gap-2 text-primary">
                      <Icon size={16} />
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-surface-dark-foreground/62">
                        {label}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-surface-dark-foreground/84">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
                >
                  Edit account
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-surface-dark-foreground transition-colors hover:bg-white/10"
                >
                  Continue shopping
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {quickStats.map(({ label, value, icon: Icon, tone }) => (
                <div
                  key={label}
                  className="rounded-[1.75rem] border border-white/10 bg-white/7 p-6 backdrop-blur-md"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}>
                    <Icon size={22} />
                  </div>
                  <p className="mt-5 text-3xl font-heading font-bold text-surface-dark-foreground">
                    {value}
                  </p>
                  <p className="mt-2 text-sm text-surface-dark-foreground/68">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-custom py-12 md:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_60px_rgba(17,19,23,0.05)] md:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                  Recent Orders
                </p>
                <h2 className="mt-2 text-2xl font-heading font-bold text-foreground md:text-3xl">
                  Activity overview
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                View products
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[1.5rem] border border-border bg-secondary/35 p-5 transition-all hover:border-primary/25"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-sm font-semibold text-primary">{order.id}</p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-heading font-bold text-foreground">
                        {order.item}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-left lg:text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Total
                      </p>
                      <p className="mt-2 text-2xl font-heading font-bold text-foreground">
                        {order.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 }}
              className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_18px_44px_rgba(17,19,23,0.04)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Smart Tools
              </p>
              <div className="mt-5 space-y-4">
                {accountActions.map(({ title, description, icon: Icon, to }) => (
                  <Link
                    key={title}
                    to={to}
                    className="group flex items-start gap-4 rounded-[1.5rem] border border-border bg-secondary/30 p-4 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                      <Icon size={22} className="text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-heading font-bold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="mt-1 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              className="rounded-[2rem] bg-surface-dark p-6 text-surface-dark-foreground shadow-[0_22px_54px_rgba(17,19,23,0.12)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Personalized For You
              </p>
              <div className="mt-5 space-y-3">
                {preferenceCards.map(({ title, text, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-surface-dark-foreground">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-surface-dark-foreground/68">
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
