import { motion } from "framer-motion";
import { SectionTitle, StatusBadge, AdminCard } from "@/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/admin/context/AdminDashboardContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const deliveryOptions = ["Pending", "Processing", "In Transit", "Delivered"];
export default function OrdersPage() {
    const { orders, updateOrderDelivery } = useAdminDashboard();
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Fulfillment" title="Orders pipeline" description="Track order states, payments, and delivery progress from one interactive table."/>

      <AdminCard className="overflow-hidden p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (<motion.tr key={order.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="border-b transition-colors hover:bg-primary/5">
                <TableCell className="font-semibold">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <StatusBadge tone={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "info" : "warning"}>
                    {order.status}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <StatusBadge tone={order.payment === "Paid" ? "success" : order.payment === "Refunded" ? "danger" : "warning"}>
                    {order.payment}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <motion.select whileFocus={{ scale: 1.02 }} value={order.delivery} onChange={(event) => updateOrderDelivery(order.id, event.target.value)} className="h-10 rounded-xl border border-border/60 bg-background px-3 text-sm">
                    {deliveryOptions.map((option) => (<option key={option}>{option}</option>))}
                  </motion.select>
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.date}</TableCell>
              </motion.tr>))}
          </TableBody>
        </Table>
      </AdminCard>
    </div>);
}
