import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Boxes, ChevronDown, FolderTree, Grid2x2, Hash, Image as ImageIcon, MessageCircle, Package2, Palette, Settings, ShoppingCart, TicketPercent, UsersRound, X, } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AdminNavbar } from "@/admin/components/AdminNavbar";
import { AdminSidebar } from "@/admin/components/AdminSidebar";
import { AdminDashboardProvider } from "@/admin/context/AdminDashboardContext";
import { cn } from "@/lib/utils";
const mobilePrimaryItems = [
    { label: "Dashboard", to: "/dashboard", icon: Grid2x2, end: true },
    { label: "Orders", to: "/dashboard/orders", icon: ShoppingCart },
    { label: "Users", to: "/dashboard/customers", icon: UsersRound },
    { label: "Products", to: "/dashboard/products", icon: Package2 },
    { label: "Messgae", to: "/dashboard/messages", icon: MessageCircle },
    { label: "Coupons", to: "/dashboard/coupons", icon: TicketPercent },
    { label: "Settings", to: "/dashboard/settings", icon: Settings },
];
const mobileMasterDataItems = [
    { label: "Categories", to: "/dashboard/categories", icon: FolderTree, clickable: true },
    { label: "Colors", icon: Palette, clickable: true },
    { label: "Sizes", icon: Hash, clickable: false },
    { label: "Banners", icon: ImageIcon, clickable: false },
    { label: "Offers", icon: TicketPercent, clickable: false },
];
export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMasterDataOpen, setMobileMasterDataOpen] = useState(true);
    const location = useLocation();
    return (<AdminDashboardProvider>
      <div className="min-h-screen bg-white">
        <div className="flex min-h-screen">
          <motion.div aria-hidden="true" animate={{ width: collapsed ? 92 : 280 }} transition={{ type: "spring", stiffness: 220, damping: 24 }} className="hidden shrink-0 lg:block"/>
          <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed((current) => !current)}/>

          <AnimatePresence>
            {mobileOpen ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden">
                <motion.div initial={{ x: -40 }} animate={{ x: 0 }} exit={{ x: -40 }} className="h-full w-72 overflow-y-auto bg-white px-4 py-5 text-slate-700">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Tech Haven</p>
                      <h2 className="text-lg font-semibold text-slate-900">Admin Panel</h2>
                    </div>
                    <button type="button" onClick={() => setMobileOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                      <X size={18}/>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {mobilePrimaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
                return (<NavLink key={`${item.label}-${item.to}`} to={item.to} end={item.end} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors", isActive ? "bg-[#f8f05b] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}>
                          <Icon size={19} strokeWidth={2}/>
                          <span>{item.label}</span>
                        </NavLink>);
            })}

                    <div className="pt-1">
                      <button type="button" onClick={() => setMobileMasterDataOpen((current) => !current)} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                        <Boxes size={19} strokeWidth={2}/>
                        <span className="flex-1 text-left">Master data</span>
                        <ChevronDown size={18} className={cn("transition-transform duration-200", mobileMasterDataOpen && "rotate-180")}/>
                      </button>

                      {mobileMasterDataOpen ? (<div className="mt-1 space-y-1 pl-6">
                          {mobileMasterDataItems.map((item) => {
                    const ItemIcon = item.icon;
                    const itemActive = item.clickable ? location.pathname === item.to : false;
                    if (item.clickable && item.to) {
                        return (<NavLink key={item.label} to={item.to} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm transition-colors", itemActive ? "bg-[#fff1ef] font-medium text-[#f8695b]" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")}>
                                  <ItemIcon size={17} strokeWidth={2}/>
                                  <span>{item.label}</span>
                                </NavLink>);
                    }
                    return (<button key={item.label} type="button" className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                                <ItemIcon size={17} strokeWidth={2}/>
                                <span>{item.label}</span>
                              </button>);
                })}
                        </div>) : null}
                    </div>
                  </div>
                </motion.div>
              </motion.div>) : null}
          </AnimatePresence>

          <div className="flex min-w-0 flex-1 flex-col">
            <AdminNavbar onMobileMenu={() => setMobileOpen(true)}/>
            <main className="flex-1 bg-white px-4 py-6 sm:px-6 lg:px-8">
              <AnimatePresence mode="wait">
                <motion.div key={location.pathname} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.28, ease: "easeOut" }}>
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </AdminDashboardProvider>);
}
