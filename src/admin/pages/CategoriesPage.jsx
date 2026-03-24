import { motion } from "framer-motion";
import { Layers3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdminCard, SectionTitle, StatusBadge } from "@/admin/components/AdminPrimitives";
import { initialCategories } from "@/admin/data/mockData";
export default function CategoriesPage() {
    const navigate = useNavigate();
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Catalog" title="Categories" description="A visual grid of collection groups with a premium, editorial-style presentation."/>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {initialCategories.map((category, index) => (<motion.button key={category.id} type="button" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ rotateX: 3, rotateY: -5, scale: 1.02 }} style={{ transformStyle: "preserve-3d" }} className="text-left" onClick={() => navigate(`/dashboard/products?category=${encodeURIComponent(category.title)}`)}>
            <AdminCard className="group overflow-hidden p-0">
              <div className="relative h-52 overflow-hidden">
                <img src={category.image} alt={category.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"/>
                <div className="absolute left-4 top-4">
                  <StatusBadge tone="info" className="px-2.5 py-1 text-[11px]">{category.count} products</StatusBadge>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">Click to view related products</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Layers3 size={18}/>
                </div>
              </div>
            </AdminCard>
          </motion.button>))}
      </div>
    </div>);
}
