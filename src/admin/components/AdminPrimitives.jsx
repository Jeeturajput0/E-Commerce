import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export function AdminCard({ className, ...props }) {
    return (<Card className={cn("rounded-[1.5rem] border-slate-200 bg-white shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl", className)} {...props}/>);
}
export const AdminButton = forwardRef(({ className, ...props }, ref) => (<Button ref={ref} className={cn("rounded-xl shadow-lg shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl", className)} {...props}/>));
AdminButton.displayName = "AdminButton";
export function AdminInput({ className, ...props }) {
    return (<Input className={cn("h-11 rounded-xl border-slate-200 bg-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50", className)} {...props}/>);
}
export function StatusBadge({ tone = "default", className, ...props }) {
    const toneClasses = {
        default: "bg-secondary text-secondary-foreground",
        success: "bg-primary/15 text-primary dark:text-primary",
        warning: "bg-primary/20 text-[#7c5a00] dark:text-primary",
        info: "bg-black/10 text-black dark:bg-white/10 dark:text-white",
        danger: "bg-black text-white dark:bg-white dark:text-black",
    };
    return <Badge className={cn("rounded-full border-0 px-3 py-1 text-xs font-semibold", toneClasses[tone], className)} {...props}/>;
}
export function SectionTitle({ eyebrow, title, description, action, }) {
    return (<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p> : null}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>);
}
export function AdminModal({ open, onOpenChange, title, description, children, footer, }) {
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-[1.75rem] border-slate-200 bg-white p-0 shadow-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="p-6">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
          <div className="mt-6">{children}</div>
          {footer ? <DialogFooter className="mt-6">{footer}</DialogFooter> : null}
        </motion.div>
      </DialogContent>
    </Dialog>);
}
