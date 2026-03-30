import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LayoutDashboard, Menu, Moon, Search, Sun, UserCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";
import { AdminInput, StatusBadge } from "@/admin/components/AdminPrimitives";
import { adminNavItems } from "@/admin/data/mockData";
import { cn } from "@/lib/utils";
export function AdminNavbar({ onMobileMenu, }) {
    const { theme, setTheme } = useTheme();
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const currentPage = useMemo(() => adminNavItems.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to))), [location.pathname]);
    return (<div className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMobileMenu} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-card/70 text-foreground lg:hidden">
            <Menu size={18}/>
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Admin overview</p>
            <h2 className="text-2xl font-semibold">{currentPage?.label ?? "Dashboard"}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
            <AdminInput placeholder="Search products, orders, customers..." className="pl-11 pr-4"/>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-card/70 text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg">
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                <LayoutDashboard size={18}/>
              </motion.div>
            </Link>

            <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-card/70 text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg">
              <motion.div whileHover={{ scale: 1.08, rotate: 12 }}>
                {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
              </motion.div>
            </button>

            <button type="button" className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-card/70 text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg">
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                <Bell size={18}/>
              </motion.div>
              <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"/>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"/>
              </span>
            </button>

            <div className="relative">
              <button type="button" onClick={() => setProfileOpen((current) => !current)} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <UserCircle2 size={22}/>
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold">Admin</p>
                  <p className="text-xs text-muted-foreground">Super Manager</p>
                </div>
              </button>

              <AnimatePresence>
                {profileOpen ? (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 8 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-full z-40 mt-2 w-60 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">Tech Haven Admin</p>
                        <p className="text-sm text-muted-foreground">admin@techhaven.store</p>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-secondary/70 px-3 py-2">
                        <span className="text-sm">Access level</span>
                        <StatusBadge tone="warning">Full</StatusBadge>
                      </div>
                      <Link to="/" onClick={() => setProfileOpen(false)} className={cn("block rounded-2xl px-3 py-2 text-sm transition-colors", "hover:bg-secondary hover:text-foreground")}>
                        Back to storefront
                      </Link>
                    </div>
                  </motion.div>) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
