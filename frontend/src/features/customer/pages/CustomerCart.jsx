import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";

const CustomerCart = () => {
  const { cartDetails, cartTotal, removeCartItem, updateCartQty } = useApp();
  const [query, setQuery] = useState("");
  const filteredCart = cartDetails.filter((item) =>
    item.product.title.toLowerCase().includes(query.toLowerCase())
  );
  const rows = filteredCart.map((item) => [
    item.product.title,
    `$${item.product.price}`,
    <input
      key={item.productId}
      type="number"
      min={1}
      value={item.quantity}
      onChange={(event) => updateCartQty(item.productId, Number(event.target.value))}
      className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
    />,
    `$${item.subtotal.toFixed(2)}`,
    <Button
      key={`remove-${item.productId}`}
      variant="ghost"
      className="px-2 py-1 text-xs text-primary-600"
      onClick={() => removeCartItem(item.productId)}
    >
      Remove
    </Button>,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Cart</h2>
      <div className={panelClass}>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search cart products"
          />
        </label>
      </div>
      <Table headers={["Product", "Price", "Qty", "Subtotal", "Action"]} rows={rows} />
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold">Total: ${cartTotal.toFixed(2)}</p>
        <Link to="/cart">
          <Button>Open Full Cart</Button>
        </Link>
      </Card>
    </div>
  );
};

export default CustomerCart;
