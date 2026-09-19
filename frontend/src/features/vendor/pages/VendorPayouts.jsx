import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import { sectionTitleClass } from "../constants";
import { VendorMetricCard } from "../widgets/vendorWidgets";

const VendorPayouts = () => {
  const { currentUser, orders } = useApp();
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const total = vendorOrders.reduce((acc, order) => acc + order.amount, 0);
  const payoutRows = [
    ["PAYOUT-1001", "Bank transfer", `$${Math.round(total * 0.42)}`, "Paid", "2026-03-08"],
    ["PAYOUT-1002", "Bank transfer", `$${Math.round(total * 0.21)}`, "Processing", "2026-03-18"],
    ["PAYOUT-1003", "UPI", `$${Math.round(total * 0.13)}`, "Scheduled", "2026-03-31"],
  ];

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Payouts</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Withdrawable" value={`$${Math.round(total * 0.18)}`} hint="Available for next request" />
        <VendorMetricCard label="In Transit" value={`$${Math.round(total * 0.21)}`} hint="Processing with finance" />
        <VendorMetricCard label="Paid This Month" value={`$${Math.round(total * 0.42)}`} hint="Already settled" />
      </div>
      <Table headers={["Payout ID", "Method", "Amount", "Status", "Date"]} rows={payoutRows} />
    </div>
  );
};

export default VendorPayouts;
