import { motion } from "framer-motion";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

export default function Orders() {
  const { currentUser, orders } = useApp();
  const myOrders = orders.filter((order) => order.customerId === currentUser?.id);

  return (
    <PageTransition className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track your current order history from the existing shared order dataset.
        </p>
      </motion.div>

      <div className="grid gap-4">
        {myOrders.length > 0 ? (
          myOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">
                    {order.id}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {order.date}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
                  {order.status}
                </span>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
                <p>Total: ${order.amount}</p>
                <p>Tracking: {order.tracking}</p>
                <p>Items: {order.items.length}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-300">No orders yet.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
