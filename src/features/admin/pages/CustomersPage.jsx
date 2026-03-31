import { SectionTitle, StatusBadge, AdminCard } from "@/features/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/features/admin/context/AdminDashboardContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function CustomersPage() {
    const { customers } = useAdminDashboard();
    return (<div className="space-y-8">
      <SectionTitle eyebrow="CRM" title="Customers" description="High-value buyers, order counts, and account health at a glance."/>

      <AdminCard className="overflow-hidden p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (<TableRow key={customer.id} className="hover:bg-primary/5">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-yellow-300 text-sm font-semibold text-primary-foreground">
                      {customer.name.split(" ").map((part) => part[0]).join("")}
                    </div>
                    <p className="font-medium">{customer.name}</p>
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.spend}</TableCell>
                <TableCell>
                  <StatusBadge tone={customer.status === "Active" ? "success" : "danger"}>{customer.status}</StatusBadge>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </AdminCard>
    </div>);
}

