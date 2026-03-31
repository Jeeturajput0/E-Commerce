import {
  Bell,
  ChevronDown,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Moon,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Settings2,
  Sun,
  Truck,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { customerLinks as rawCustomerLinks, headerIconButton } from "../constants";

const iconMap = {
  LayoutDashboard,
  Truck,
  Heart,
  ShoppingCart,
  MapPin,
  CreditCard,
  UserCircle2,
  SlidersHorizontal,
  Settings2,
};

export const customerLinks = rawCustomerLinks.map((link) => ({
  ...link,
  icon: iconMap[link.icon],
  groupIcon: link.groupIcon ? iconMap[link.groupIcon] : undefined,
}));

const CustomerHeaderContent = () => {
  const { currentUser, theme, toggleTheme, logout } = useApp();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
          Customer Overview
        </p>
        <h2 className="font-display text-2xl font-semibold">Dashboard</h2>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
        <label className="flex min-w-[230px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search orders, wishlist, cart..."
          />
        </label>
        <button className={headerIconButton}>
          <Settings2 className="h-4 w-4" />
        </button>
        <button className={headerIconButton}>
          <Bell className="h-4 w-4" />
        </button>
        <button
          className={headerIconButton}
          onClick={toggleTheme}
          title="Toggle black theme"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left dark:border-slate-700 dark:bg-slate-800"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
              {currentUser?.name?.[0] || "C"}
            </span>
            <div className="text-xs">
              <p className="font-semibold leading-none">{currentUser?.name || "Customer"}</p>
              <p className="mt-1 text-slate-500 dark:text-slate-300">Account Holder</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          {profileOpen ? (
            <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <button
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/user/dashboard/profile");
                }}
              >
                <UserCircle2 className="h-4 w-4" />
                Profile
              </button>
              <button
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                onClick={() => {
                  setProfileOpen(false);
                  logout();
                  navigate("/");
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CustomerHeaderContent;
