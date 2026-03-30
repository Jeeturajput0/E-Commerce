import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

const CartPage = () => {
  const { cartDetails, cartTotal, updateCartQty, removeCartItem } = useApp();

  return (
    <PageTransition className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Your Cart</h1>
      {cartDetails.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {cartDetails.map((item) => (
              <div
                key={item.productId}
                className="grid gap-4 rounded-2xl border border-slate-200/70 bg-white/85 p-4 dark:border-slate-700/60 dark:bg-slate-900/70 sm:grid-cols-[120px_1fr]"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="h-28 w-full rounded-xl object-cover"
                />
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.product.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-300">${item.product.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        updateCartQty(item.productId, Number(event.target.value))
                      }
                      className="w-16 rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
                    />
                    <button
                      onClick={() => removeCartItem(item.productId)}
                      className="rounded-xl border border-slate-200 p-2 text-rose-500 dark:border-slate-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="glass h-fit rounded-2xl p-5">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>$12.00</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-semibold dark:border-slate-700">
                <span>Total</span>
                <span>${(cartTotal + 12).toFixed(2)}</span>
              </div>
            </div>
            <Button className="mt-5 w-full">Proceed to Checkout</Button>
          </aside>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300">Your cart is empty.</p>
          <Link to="/shop" className="mt-3 inline-block text-primary-600 dark:text-primary-400">
            Continue shopping
          </Link>
        </div>
      )}
    </PageTransition>
  );
};

export default CartPage;
