import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Boxes, ChevronDown, ChevronLeft, FolderTree, Grid2x2, Hash, Image as ImageIcon, Package2, Palette, Settings, ShoppingCart, Store, TicketPercent, UsersRound, } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
export function AdminSidebar({ collapsed, onToggle, }) {
    const location = useLocation();
    const [masterDataOpen, setMasterDataOpen] = useState(true);
    const primaryItems = useMemo(() => [
        { label: "Overview", to: "/dashboard/messages", icon: Grid2x2 },
        { label: "Dashboard", to: "/dashboard", icon: Grid2x2, end: true },
        { label: "Products", to: "/dashboard/products", icon: Package2 },
        { label: "Orders", to: "/dashboard/orders", icon: ShoppingCart },
        { label: "Users", to: "/dashboard/customers", icon: UsersRound },
        { label: "Coupons", to: "/dashboard/coupons", icon: TicketPercent },
        { label: "Settings", to: "/dashboard/settings", icon: Settings },
    ], []);
    const masterDataItems = useMemo(() => [
        { label: "Categories", to: "/dashboard/categories", icon: FolderTree, clickable: true },
        { label: "Colors", icon: Palette, clickable: false },
        { label: "Sizes", icon: Hash, clickable: false },
        { label: "Banners", icon: ImageIcon, clickable: false },
        { label: "Offers", icon: TicketPercent, clickable: false },
    ], []);
    return (<motion.aside animate={{ width: collapsed ? 92 : 280 }} transition={{ type: "spring", stiffness: 220, damping: 24 }} className="fixed left-0 top-0 z-40 hidden h-screen overflow-hidden border-r border-slate-200 bg-white text-slate-700 lg:block">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-5">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "justify-between")}>
          {collapsed ? (<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8695b] text-white shadow-lg shadow-[#f8695b]/25">
              <Store size={20}/>
            </div>) : (<div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Tech Haven</p>
              <h2 className="text-lg font-semibold text-slate-900">Admin Panel</h2>
            </div>)}

          {!collapsed ? (<button type="button" onClick={onToggle} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
              <ChevronLeft size={18}/>
            </button>) : null}
        </div>

        {collapsed ? (<button type="button" onClick={onToggle} className="mt-6 flex h-10 w-10 items-center justify-center self-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
            <ChevronLeft className="rotate-180" size={18}/>
          </button>) : null}

        <div className="mt-8 space-y-1.5 pb-6">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (<NavLink key={`${item.label}-${item.to}`} to={item.to} end={item.end} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors", collapsed && "justify-center px-2", isActive ? "bg-[#f8695b] text-white shadow-sm shadow-[#f8695b]/30" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}>
                <Icon size={19} strokeWidth={2}/>
                {!collapsed ? <span>{item.label}</span> : null}
              </NavLink>);
        })}

          <div className="pt-1">
            <button type="button" onClick={() => setMasterDataOpen((current) => !current)} className={cn("flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900", collapsed && "justify-center px-2")}>
              <Boxes size={19} strokeWidth={2}/>
              {!collapsed ? (<>
                  <span className="flex-1 text-left">Master data</span>
                  <ChevronDown size={18} className={cn("transition-transform duration-200", masterDataOpen && "rotate-180")}/>
                </>) : null}
            </button>

            {!collapsed && masterDataOpen ? (<div className="mt-1 space-y-1 pl-6">
                {masterDataItems.map((item) => {
                const ItemIcon = item.icon;
                const itemActive = item.clickable ? location.pathname === item.to : false;
                if (item.clickable && item.to) {
                    return (<NavLink key={item.label} to={item.to} className={cn("flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm transition-colors", itemActive ? "bg-[#fff1ef] font-medium text-[#f8695b]" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")}>
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
      </div>
    </motion.aside>);
}
