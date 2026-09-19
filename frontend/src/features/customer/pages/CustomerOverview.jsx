import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { panelClass } from "../constants";

const CustomerOverview = () => {
  const { currentUser, orders, wishlist, cartDetails, products } = useApp();
  const myOrders = orders.filter((order) => order.customerId === currentUser?.id);
  const latestOrders = myOrders.slice(0, 4);
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id)).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className={`${panelClass} space-y-4`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-primary-600">Account Snapshot</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Quick overview of your recent orders, saved items, and delivery progress.
              </p>
            </div>
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              Active
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Delivered</p>
              <p className="mt-2 text-lg font-semibold">
                {myOrders.filter((order) => order.status === "Delivered").length}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">In Transit</p>
              <p className="mt-2 text-lg font-semibold">
                {myOrders.filter((order) => ["Shipped", "Processing", "Pending"].includes(order.status)).length}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Saved Items</p>
              <p className="mt-2 text-lg font-semibold">{wishlist.length}</p>
            </div>
          </div>
        </div>
        <div className={panelClass}>
          <h3 className="mb-4 font-display text-xl font-semibold text-primary-600">Wishlist Picks</h3>
          <div className="space-y-3">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-700/60"
              >
                <img src={product.images[0]} alt={product.title} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">My Orders</p>
          <p className="mt-2 text-3xl font-bold">{myOrders.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Wishlist Items</p>
          <p className="mt-2 text-3xl font-bold">{wishlist.length}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Cart Items</p>
          <p className="mt-2 text-3xl font-bold">{cartDetails.length}</p>
        </Card>
      </div>

      <Card>
        <h3 className="mb-3 font-display text-xl font-semibold text-primary-600">Latest Tracking Updates</h3>
        <div className="space-y-3">
          {latestOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/70 p-3 text-sm dark:border-slate-700/60"
            >
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-slate-500 dark:text-slate-300">{order.tracking}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CustomerOverview;
