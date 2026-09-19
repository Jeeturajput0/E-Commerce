export const headerIconButton =
  "rounded-xl border border-slate-300/80 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800";

export const panelClass =
  "rounded-2xl border border-slate-300/80 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900";

export const sectionTitleClass = "font-display text-2xl font-semibold text-primary-600";

export const customerLinks = [
  { path: "/user/dashboard", label: "Dashboard", icon: "LayoutDashboard", exact: true },
  { path: "/user/dashboard/orders", label: "My Orders", icon: "Truck" },
  { path: "/user/dashboard/wishlist", label: "Wishlist", icon: "Heart" },
  { path: "/user/dashboard/cart", label: "Cart", icon: "ShoppingCart" },
  { path: "/user/dashboard/address", label: "Address", icon: "MapPin" },
  { path: "/user/dashboard/payment", label: "Payment", icon: "CreditCard" },
  {
    path: "/user/dashboard/profile",
    label: "Profile",
    icon: "UserCircle2",
    group: "master",
    groupIcon: "SlidersHorizontal",
    groupLabel: "Account tools",
  },
  {
    path: "/user/dashboard/settings",
    label: "Settings",
    icon: "Settings2",
    group: "master",
    groupIcon: "SlidersHorizontal",
    groupLabel: "Account tools",
  },
];
