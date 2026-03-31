import { AdminCard, SectionTitle, StatusBadge } from "@/features/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/features/admin/context/AdminDashboardContext";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function CouponsPage() {
    const { coupons, toggleCoupon } = useAdminDashboard();
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Promotions" title="Coupons" description="Discount controls with status tags and toggle-based activation."/>

      <AdminCard className="overflow-hidden p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enabled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (<TableRow key={coupon.id} className="hover:bg-primary/5">
                <TableCell className="font-semibold">{coupon.code}</TableCell>
                <TableCell>{coupon.discount}</TableCell>
                <TableCell>{coupon.expiry}</TableCell>
                <TableCell>
                  <StatusBadge tone={coupon.status === "Active" ? "success" : coupon.status === "Paused" ? "danger" : "warning"}>
                    {coupon.status}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <Switch checked={coupon.enabled} onCheckedChange={() => toggleCoupon(coupon.id)}/>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </AdminCard>
    </div>);
}

