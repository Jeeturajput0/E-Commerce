import { motion } from "framer-motion";
import { Check, Star, Trash2 } from "lucide-react";
import { AdminButton, AdminCard, SectionTitle, StatusBadge } from "@/features/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/features/admin/context/AdminDashboardContext";
export default function ReviewsPage() {
    const { reviews, approveReview, deleteReview } = useAdminDashboard();
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Social proof" title="Reviews moderation" description="Approve or remove customer feedback with quick actions and soft animations."/>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review, index) => (<motion.div key={review.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <AdminCard className="h-full p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.product}</p>
                </div>
                <StatusBadge tone={review.status === "Approved" ? "success" : "warning"}>{review.status}</StatusBadge>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (<motion.div key={starIndex} whileHover={{ scale: 1.15 }} className="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.45)]">
                    <Star size={18} fill={starIndex < review.rating ? "currentColor" : "none"}/>
                  </motion.div>))}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{review.text}</p>
              <div className="mt-6 flex gap-3">
                <AdminButton variant="outline" onClick={() => approveReview(review.id)} className="flex-1 rounded-2xl">
                  <Check size={16}/>
                  Approve
                </AdminButton>
                <AdminButton variant="destructive" onClick={() => deleteReview(review.id)} className="flex-1 rounded-2xl">
                  <Trash2 size={16}/>
                  Delete
                </AdminButton>
              </div>
            </AdminCard>
          </motion.div>))}
      </div>
    </div>);
}

