import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CartesianGrid, Bar, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminCard, SectionTitle, StatusBadge } from "@/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/admin/context/AdminDashboardContext";
import { categoryDistribution, recentOrders, salesData, statsCards } from "@/admin/data/mockData";
import { Skeleton } from "@/components/ui/skeleton";
const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};
const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0 },
};
export default function DashboardHome() {
    const [loading, setLoading] = useState(true);
    const { products } = useAdminDashboard();
    const featuredProducts = useMemo(() => products.slice(0, 5), [products]);
    useEffect(() => {
        const timeout = window.setTimeout(() => setLoading(false), 700);
        return () => window.clearTimeout(timeout);
    }, []);
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Performance" title="Premium commerce command center" description="Track revenue, orders, customer movement, and category performance in one polished workspace."/>

      {loading ? (<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (<Skeleton key={index} className="h-32 rounded-[1.5rem]"/>))}
        </div>) : (<motion.div variants={container} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statsCards.map((card) => {
                const Icon = card.icon;
                const isUp = card.trend === "up";
                return (<motion.div key={card.title} variants={item} whileHover={{ scale: 1.05 }}>
                <AdminCard className="overflow-hidden border border-primary/20 bg-white text-black dark:bg-white dark:text-black">
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-black/60">{card.title}</p>
                        <h3 className="mt-3 text-2xl font-bold text-black">{card.value}</h3>
                      </div>
                      <div className="rounded-xl bg-primary/15 p-2.5 text-primary backdrop-blur-md">
                        <Icon size={20}/>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-xs text-black/70 sm:text-sm">
                      {isUp ? <ArrowUpRight size={14} className="text-primary"/> : <ArrowDownRight size={14} className="text-black"/>}
                      <span>{card.change} vs last month</span>
                    </div>
                  </div>
                </AdminCard>
              </motion.div>);
            })}
        </motion.div>)}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <AdminCard className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Sales trend</h3>
              <p className="text-sm text-muted-foreground">Monthly GMV growth across the last 6 months</p>
            </div>
            <StatusBadge tone="warning">+19.4%</StatusBadge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))"/>
                <YAxis stroke="hsl(var(--muted-foreground))"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--primary))" }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Category share</h3>
            <p className="text-sm text-muted-foreground">Breakdown of revenue by core catalog</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" innerRadius={68} outerRadius={102} paddingAngle={4}>
                  {categoryDistribution.map((entry) => (<Cell key={entry.name} fill={entry.fill}/>))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Orders performance</h3>
            <p className="text-sm text-muted-foreground">Bar view of monthly order velocity</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))"/>
                <YAxis stroke="hsl(var(--muted-foreground))"/>
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        <div className="space-y-6">
          <AdminCard className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Recent orders</h3>
                <p className="text-sm text-muted-foreground">Latest customer activity</p>
              </div>
              <StatusBadge tone="info">Live</StatusBadge>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (<motion.div key={order.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-border/60 bg-secondary/40 p-4 transition-all hover:border-primary/40 hover:bg-secondary/60">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <StatusBadge tone={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "info" : "warning"}>
                      {order.status}
                    </StatusBadge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{order.date}</span>
                    <span className="font-semibold">{order.total}</span>
                  </div>
                </motion.div>))}
            </div>
          </AdminCard>

          <AdminCard className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Products list</h3>
                <p className="text-sm text-muted-foreground">Quick view of at least 5 inventory items</p>
              </div>
              <StatusBadge tone="warning">{featuredProducts.length} items</StatusBadge>
            </div>
            <div className="space-y-3">
              {featuredProducts.map((product, index) => (<motion.div key={product.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-3">
                  <img src={product.image} alt={product.name} className="h-14 w-14 rounded-2xl object-cover"/>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${product.price}</p>
                    <p className="text-xs text-muted-foreground">Stock {product.stock}</p>
                  </div>
                </motion.div>))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>);
}
