export const headerIconButton =
  "rounded-xl border border-slate-300/80 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800";

export const panelClass =
  "rounded-2xl border border-slate-300/80 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900";

export const sectionTitleClass = "font-display text-2xl font-semibold text-primary-600";

export const vendorLinks = [
  { path: "/vendor/dashboard", label: "Dashboard", icon: "LayoutDashboard", exact: true },
  { path: "/vendor/dashboard/products", label: "Products", icon: "Package" },
  { path: "/vendor/dashboard/add-product", label: "Add Product", icon: "PlusCircle" },
  { path: "/vendor/dashboard/orders", label: "Orders", icon: "ShoppingCart" },
  { path: "/vendor/dashboard/earnings", label: "Earnings", icon: "BadgeDollarSign" },
  { path: "/vendor/dashboard/reviews", label: "Reviews", icon: "MessageSquareMore" },
  {
    path: "/vendor/dashboard/returns",
    label: "Returns",
    icon: "Receipt",
    group: "master",
    groupIcon: "ClipboardCheck",
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/payouts",
    label: "Payouts",
    icon: "Wallet",
    group: "master",
    groupIcon: "ClipboardCheck",
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/analytics",
    label: "Analytics",
    icon: "ChartColumnBig",
    group: "master",
    groupIcon: "ClipboardCheck",
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/coupons",
    label: "Coupons",
    icon: "TicketPercent",
    group: "master",
    groupIcon: "ClipboardCheck",
    groupLabel: "Store tools",
  },
  {
    path: "/vendor/dashboard/settings",
    label: "Settings",
    icon: "Settings2",
    group: "master",
    groupIcon: "ClipboardCheck",
    groupLabel: "Store tools",
  },
];
