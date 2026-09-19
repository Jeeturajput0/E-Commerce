import Table from "../../../components/common/Table";
import { useApp } from "../../../context/AppContext";
import { sectionTitleClass } from "../constants";
import { VendorMetricCard } from "../widgets/vendorWidgets";

const VendorReturns = () => {
  const { orders, currentUser, users } = useApp();
  const vendorOrders = orders.filter((order) => order.vendorId === currentUser?.id);
  const returnRequests = vendorOrders.filter((order) => ["Delivered", "Cancelled"].includes(order.status)).slice(0, 6);

  const rows = returnRequests.map((order, index) => [
    order.id,
    users.find((user) => user.id === order.customerId)?.name || "Customer",
    order.status === "Delivered" ? "Size mismatch" : "Order cancelled before dispatch",
    order.status === "Delivered" ? "Pending review" : "Closed",
    `${index + 1} day${index === 0 ? "" : "s"} ago`,
  ]);

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Returns</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <VendorMetricCard label="Open Requests" value={rows.filter((row) => row[3] === "Pending review").length} hint="Needs vendor action" />
        <VendorMetricCard label="Resolved" value={rows.filter((row) => row[3] === "Closed").length} hint="Closed this cycle" />
        <VendorMetricCard label="Return Rate" value={`${returnRequests.length ? Math.round((returnRequests.length / Math.max(vendorOrders.length, 1)) * 100) : 0}%`} hint="Across recent vendor orders" />
      </div>
      <Table headers={["Order ID", "Customer", "Reason", "Status", "Requested"]} rows={rows} emptyMessage="No return requests found." />
    </div>
  );
};

export default VendorReturns;
