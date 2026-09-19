import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  PackageCheck,
  Search,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

const filters = ["All", "Delivered", "Pending", "Cancelled"];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const getDisplayStatus = (status) => {
  if (status === "Delivered") return "Delivered";
  if (status === "Cancelled") return "Cancelled";
  return "Pending";
};

const statusStyles = {
  Delivered:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
  Pending:
    "bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
  Cancelled:
    "bg-rose-50 text-rose-700 ring-1 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
};

export default function Orders() {
  const { currentUser, orders, products, updateOrderStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const myOrders = useMemo(
    () =>
      orders
        .filter((order) => order.customerId === currentUser?.id)
        .map((order) => {
          const orderProducts = order.items
            .map((itemId) => products.find((product) => product.id === itemId))
            .filter(Boolean);

          return {
            ...order,
            displayStatus: getDisplayStatus(order.status),
            products: orderProducts,
            primaryProduct: orderProducts[0],
            productNames: orderProducts.map((product) => product.title).join(" "),
          };
        }),
    [currentUser?.id, orders, products]
  );

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return myOrders.filter((order) => {
      const matchesSearch =
        query.length === 0 || order.productNames.toLowerCase().includes(query);
      const matchesFilter =
        selectedFilter === "All" || order.displayStatus === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [myOrders, searchTerm, selectedFilter]);

  const summary = useMemo(
    () => ({
      total: myOrders.length,
      delivered: myOrders.filter((order) => order.displayStatus === "Delivered").length,
      pending: myOrders.filter((order) => order.displayStatus === "Pending").length,
      cancelled: myOrders.filter((order) => order.displayStatus === "Cancelled").length,
    }),
    [myOrders]
  );

  return (
    <PageTransition className="mx-auto max-w-6xl space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_90px_-42px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Order Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Your orders at a glance
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Search by product, filter by order status, and manage active purchases
              without changing the existing order dataset.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryCard label="All Orders" value={summary.total} />
            <SummaryCard label="Delivered" value={summary.delivered} />
            <SummaryCard label="Pending" value={summary.pending} />
            <SummaryCard label="Cancelled" value={summary.cancelled} />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900/95 sm:p-6"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by product name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-500 dark:focus:ring-primary-500/20"
            />
          </label>

          <select
            value={selectedFilter}
            onChange={(event) => setSelectedFilter(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-500 dark:focus:ring-primary-500/20 lg:w-56"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </motion.section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const canCancel = order.displayStatus === "Pending";

              return (
                <motion.article
                  key={order.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.35)] transition dark:border-slate-700 dark:bg-slate-900/95"
                >
                  <div className="flex flex-col gap-5 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="flex gap-4">
                        <div className="h-24 w-24 overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800">
                          {order.primaryProduct ? (
                            <img
                              src={order.primaryProduct.images?.[0]}
                              alt={order.primaryProduct.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                              <ShoppingBag className="h-8 w-8" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                              {order.id}
                            </p>
                            <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                              {order.primaryProduct?.title || "Order details"}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                              {order.products.length > 1
                                ? `+${order.products.length - 1} more item(s) in this order`
                                : "Single-item order"}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-flex items-center gap-2">
                              <CalendarDays className="h-4 w-4" />
                              {order.date}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <PackageCheck className="h-4 w-4" />
                              {order.tracking}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-3 xl:items-end">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.displayStatus]}`}
                        >
                          {order.displayStatus}
                        </span>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          ${order.amount}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {order.products.length} item(s)
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Product names match search in real time.
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {canCancel && (
                          <Button
                            variant="secondary"
                            onClick={() => updateOrderStatus(order.id, "Cancelled")}
                            className="border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500/10"
                          >
                            <XCircle className="h-4 w-4" />
                            Cancel Order
                          </Button>
                        )}
                        <Button
                          variant={isExpanded ? "secondary" : "primary"}
                          onClick={() =>
                            setExpandedOrderId((prev) => (prev === order.id ? null : order.id))
                          }
                        >
                          <ArrowRight className={`h-4 w-4 transition ${isExpanded ? "rotate-90" : ""}`} />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60"
                      >
                        <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
                          {order.products.map((product) => (
                            <div
                              key={`${order.id}-${product.id}`}
                              className="flex items-center gap-4 rounded-3xl border border-white bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                              <img
                                src={product.images?.[0]}
                                alt={product.title}
                                className="h-20 w-20 rounded-2xl object-cover"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-slate-900 dark:text-white">
                                  {product.title}
                                </p>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                  {product.category}
                                </p>
                                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                                  ${product.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/90"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <Search className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                No orders match your search
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try a different product keyword or switch the status filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PageTransition>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-center dark:border-slate-700 dark:bg-slate-950/60">
      <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}
