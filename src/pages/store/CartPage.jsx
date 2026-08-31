import { Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";
import { api } from "../../lib/api";

const CartPage = () => {
  const { cartDetails, cartTotal, updateCartQty, removeCartItem, clearCart, addToast } = useApp();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    customerMobile: "",
    customerEmail: "",
    shippingAddress: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.customerMobile || !form.shippingAddress) {
      addToast("Please fill in required shipping details", "warning");
      return;
    }

    try {
      setLoading(true);
      const items = cartDetails.map((item) => ({
        product: item.product._id || item.product.id,
        name: item.product.title,
        image: item.product.images?.[0] || item.product.image || "",
        price: item.product.price,
        quantity: item.quantity,
      }));

      const payload = {
        customerName: form.customerName,
        customerMobile: form.customerMobile,
        customerEmail: form.customerEmail,
        shippingAddress: form.shippingAddress,
        items,
        totalAmount: cartTotal + 12,
        paymentMethod: "COD",
      };

      const res = await api("/orders", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccessOrder(res);
      clearCart();
      setCheckoutOpen(false);
      addToast("Cash on Delivery order placed successfully!");
    } catch (err) {
      addToast(err.message || "Failed to place order", "warning");
    } finally {
      setLoading(false);
    }
  };

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
            <Button className="mt-5 w-full" onClick={() => setCheckoutOpen(true)}>
              Proceed to Checkout (COD)
            </Button>
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

      {/* Checkout Modal */}
      {checkoutOpen && (
        <Modal
          title="Cash on Delivery Checkout"
          description="Please fill in your delivery details below."
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        >
          <form onSubmit={handlePlaceOrder} className="space-y-4 pt-2">
            <label className="grid gap-1 text-sm font-semibold">
              Full Name *
              <input
                required
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="John Doe"
                className="rounded-xl border p-2.5 font-normal outline-none focus:border-primary-500"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Mobile Number *
              <input
                required
                name="customerMobile"
                value={form.customerMobile}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="rounded-xl border p-2.5 font-normal outline-none focus:border-primary-500"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Email Address (Optional)
              <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                className="rounded-xl border p-2.5 font-normal outline-none focus:border-primary-500"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Delivery Address *
              <textarea
                required
                rows="3"
                name="shippingAddress"
                value={form.shippingAddress}
                onChange={handleChange}
                placeholder="House No, Street, City, Pincode"
                className="rounded-xl border p-2.5 font-normal outline-none focus:border-primary-500"
              />
            </label>

            <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-sm flex justify-between items-center">
              <div>
                <p className="font-semibold">Payment Method</p>
                <p className="text-xs text-slate-500">Pay cash upon delivery</p>
              </div>
              <span className="font-bold text-primary-600">Cash on Delivery</span>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t">
              <Button type="button" variant="ghost" onClick={() => setCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Placing Order..." : `Confirm Order ($${(cartTotal + 12).toFixed(2)})`}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Success Modal */}
      {successOrder && (
        <Modal
          title="Order Confirmed!"
          isOpen={Boolean(successOrder)}
          onClose={() => setSuccessOrder(null)}
        >
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Thank You for Your Order!
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Your Cash on Delivery order has been successfully placed.
            </p>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-left space-y-2 text-sm">
              <p><span className="font-semibold">Order ID:</span> {successOrder._id}</p>
              <p><span className="font-semibold">Customer:</span> {successOrder.customerName} ({successOrder.customerMobile})</p>
              <p><span className="font-semibold">Address:</span> {successOrder.shippingAddress}</p>
              <p><span className="font-semibold">Total Amount:</span> ${successOrder.totalAmount}</p>
              <p><span className="font-semibold">Payment Method:</span> Cash on Delivery</p>
            </div>
            <div className="flex justify-center pt-2">
              <Button onClick={() => { setSuccessOrder(null); navigate("/"); }}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </PageTransition>
  );
};

export default CartPage;
