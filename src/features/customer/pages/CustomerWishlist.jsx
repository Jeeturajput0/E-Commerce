import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";

const CustomerWishlist = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useApp();
  const [query, setQuery] = useState("");
  const entries = useMemo(
    () => products.filter((product) => wishlist.includes(product.id)),
    [wishlist, products]
  );
  const filteredEntries = entries.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Wishlist</h2>
      <div className={panelClass}>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search saved items"
          />
        </label>
      </div>
      {filteredEntries.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredEntries.map((product) => (
            <Card key={product.id}>
              <div className="flex items-start gap-3">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">${product.price}</p>
                  <div className="mt-3 flex gap-2">
                    <Button className="px-3 py-1.5 text-xs" onClick={() => addToCart(product.id)}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-3 py-1.5 text-xs text-primary-600"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-slate-600 dark:text-slate-300">No saved products yet.</p>
        </Card>
      )}
    </div>
  );
};

export default CustomerWishlist;
