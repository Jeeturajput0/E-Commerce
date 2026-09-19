import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { resolveImage } from "../../../lib/api";
import { wishlistService } from "../../../services/api.services";
import { panelClass, sectionTitleClass } from "../constants";

const CustomerWishlist = () => {
  const { addToCart, addToast } = useApp();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setItems(await wishlistService.get());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (productId) => {
    try {
      const data = await wishlistService.remove(productId);
      setItems(data);
      addToast("Removed from wishlist", "warning");
    } catch (e) {
      setError(e.message);
    }
  };

  const filtered = items.filter((product) =>
    (product.name || "").toLowerCase().includes(query.toLowerCase())
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
      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-500">Loading wishlist...</p>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((product) => (
            <Card key={product._id}>
              <div className="flex items-start gap-3">
                <img
                  src={resolveImage(product.images?.[0] || product.image)}
                  alt={product.name}
                  className="h-20 w-20 rounded-xl object-cover"
                  onError={(e) => { e.currentTarget.src = "/logo.jpg"; }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">${product.saleprice}</p>
                  <div className="mt-3 flex gap-2">
                    <Button className="px-3 py-1.5 text-xs" onClick={() => addToCart(product._id)}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-3 py-1.5 text-xs text-primary-600"
                      onClick={() => remove(product._id)}
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
