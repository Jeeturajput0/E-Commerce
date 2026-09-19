import { useState } from "react";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import { panelClass, sectionTitleClass } from "../constants";

const VendorCoupons = () => {
  const { coupons, addCoupon, updateCouponStatus } = useApp();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(10);

  const rows = coupons.map((coupon) => [
    coupon.code,
    `${coupon.discount}%`,
    coupon.status,
    <Button
      key={coupon.id}
      variant={coupon.status === "active" ? "secondary" : "primary"}
      className="px-3 py-1.5 text-xs"
      onClick={() => updateCouponStatus(coupon.id, coupon.status === "active" ? "inactive" : "active")}
    >
      {coupon.status === "active" ? "Disable" : "Enable"}
    </Button>,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Coupons</h2>
      <form
        className={`${panelClass} grid gap-3 sm:grid-cols-[1fr_140px_auto]`}
        onSubmit={(event) => {
          event.preventDefault();
          addCoupon({ code, discount: Number(discount), status: "active" });
          setCode("");
          setDiscount(10);
        }}
      >
        <input required value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="Coupon code" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <input type="number" min={1} max={90} value={discount} onChange={(event) => setDiscount(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <Button type="submit">Create Coupon</Button>
      </form>
      <Table headers={["Code", "Discount", "Status", "Action"]} rows={rows} />
    </div>
  );
};

export default VendorCoupons;
