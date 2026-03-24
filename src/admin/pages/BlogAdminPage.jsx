import { motion } from "framer-motion";
import { Edit3, Eye } from "lucide-react";
import { AdminCard, SectionTitle, StatusBadge } from "@/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/admin/context/AdminDashboardContext";
export default function BlogAdminPage() {
    const { blogs } = useAdminDashboard();
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Content" title="Blog manager" description="Editorial cards for publishing campaigns, buying guides, and trend articles."/>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((post, index) => (<motion.div key={post.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6 }}>
            <AdminCard className="group h-full overflow-hidden p-0">
              <div className="h-56 overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"/>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge tone={post.status === "Published" ? "success" : "warning"}>{post.status}</StatusBadge>
                  <div className="flex gap-2 text-muted-foreground">
                    <button type="button" className="rounded-full bg-secondary p-2">
                      <Eye size={16}/>
                    </button>
                    <button type="button" className="rounded-full bg-secondary p-2">
                      <Edit3 size={16}/>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.description}</p>
                </div>
              </div>
            </AdminCard>
          </motion.div>))}
      </div>
    </div>);
}
