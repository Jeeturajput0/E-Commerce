import Card from "../../../components/common/Card";
import { useApp } from "../../../context/AppContext";
import { sectionTitleClass } from "../constants";
import { VendorProductForm } from "../widgets/vendorWidgets";

const VendorAddProduct = () => {
  const { addProduct, currentUser } = useApp();

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Add Product</h2>
      <Card>
        <VendorProductForm
          onSubmit={(form) =>
            addProduct({
              ...form,
              vendorId: currentUser?.id,
              sold: 0,
              rating: 4.5,
            })
          }
        />
      </Card>
    </div>
  );
};

export default VendorAddProduct;
