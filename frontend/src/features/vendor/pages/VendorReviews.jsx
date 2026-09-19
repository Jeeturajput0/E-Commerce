import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { sectionTitleClass } from "../constants";

const VendorReviews = () => {
  const { reviews, currentUser, products } = useApp();
  const vendorReviews = reviews.filter((review) => review.vendorId === currentUser?.id);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Customer Reviews</h2>
      <div className="grid gap-4">
        {vendorReviews.map((review) => (
          <Card key={review.id}>
            <div className="flex items-center justify-between">
              <p className="font-semibold">{products.find((product) => product.id === review.productId)?.title}</p>
              <p className="text-primary-500">{"*".repeat(review.rating)}</p>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{review.message}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">by {review.user}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorReviews;
