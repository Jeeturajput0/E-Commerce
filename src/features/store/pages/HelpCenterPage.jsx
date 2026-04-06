import { motion } from "framer-motion";
import {
  CreditCard,
  HelpCircle,
  Home,
  Package,
  RotateCcw,
  Search,
  User,
} from "lucide-react";
import PageTransition from "../../../components/common/PageTransition";

const items = [
  {
    title: "Your Orders",
    desc: "Track packages, edit orders, or request order support.",
    icon: Package,
  },
  {
    title: "Returns & Refunds",
    desc: "Start exchanges and follow refund progress in one place.",
    icon: RotateCcw,
  },
  {
    title: "Manage Addresses",
    desc: "Update delivery details for faster and smoother checkout.",
    icon: Home,
  },
  {
    title: "Payment Settings",
    desc: "Manage saved cards and review supported payment methods.",
    icon: CreditCard,
  },
  {
    title: "Account Settings",
    desc: "Adjust profile information, preferences, and security options.",
    icon: User,
  },
  {
    title: "Help & Support",
    desc: "Reach support when you need help with an order or account issue.",
    icon: HelpCircle,
  },
];

export default function HelpCenterPage() {
  return (
    <PageTransition className="mx-auto max-w-6xl space-y-8 px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Hello, what can we help you with?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Search a topic or jump into the most common customer tasks.
        </p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder='Search for "refund", "order", or "payment"...'
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-primary-900/30"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary-100 p-3 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 className="text-lg font-semibold">Need more help?</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Our support team is available any time you need a hand.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <button className="flex-1 rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700">
            Call Support
          </button>
          <button className="flex-1 rounded-2xl border border-slate-300 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
            Start Live Chat
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-400">Helpline: +91 98765 43210</p>
      </motion.div>
    </PageTransition>
  );
}
