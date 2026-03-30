import { AnimatePresence, motion } from "framer-motion";
import { Boxes, ChevronDown, ChevronUp, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ToastContainer from "../common/ToastContainer";

const DashboardLayout = ({ title, links, role, headerContent = null }) => {
  const [open, setOpen] = useState(false);
  const [masterOpen, setMasterOpen] = useState(true);
  const { theme, toggleTheme } = useApp();
  const location = useLocation();

  const mainLinks = links.filter((link) => link.group !== "master");
  const masterLinks = links.filter((link) => link.group === "master");
  const hasActiveMasterItem = masterLinks.some((link) => location.pathname.startsWith(link.path));
  const MasterIcon = masterLinks[0]?.groupIcon || Boxes;
  const masterLabel = masterLinks[0]?.groupLabel || "Master data";

  const itemClassName = ({ isActive }) =>
    `flex w-full items-center gap-3 rounded-r-2xl px-5 py-2.5 text-[15px] font-semibold transition ${
      isActive
        ? "bg-[#2563eb] text-white"
        : "text-slate-600 hover:bg-white/90 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  const subItemClassName = ({ isActive }) =>
    `flex w-full items-center gap-3 rounded-r-xl px-4 py-2 text-sm transition ${
      isActive
        ? "bg-[#2563eb] text-white"
        : "text-slate-500 hover:bg-white/90 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  const renderSidebarMenu = (onNavigate) => (
    <nav className="space-y-1 pr-3">
      {mainLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.exact}
          onClick={onNavigate}
          className={itemClassName}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}

      {masterLinks.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setMasterOpen((prev) => !prev)}
            className={`flex w-full items-center justify-between rounded-r-2xl px-5 py-2.5 text-[15px] font-semibold transition ${
              hasActiveMasterItem
                ? "bg-[#2563eb] text-white"
                : "text-slate-600 hover:bg-white/90 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            <span className="flex items-center gap-3">
              {MasterIcon ? <MasterIcon className="h-4 w-4" /> : null}
              {masterLabel}
            </span>
            {masterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {masterOpen && (
            <div className="ml-9 mt-1 space-y-1 border-l border-slate-300 pl-2 dark:border-slate-700">
              {masterLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.exact}
                  onClick={onNavigate}
                  className={subItemClassName}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen max-w-full gap-0 lg:h-full lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-slate-300/80 bg-slate-100 py-4 dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto">
          <div className="mb-5 px-5">
            <h2 className="font-display text-xl font-bold">E-Commerces</h2>
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">
              {role}
            </p>
          </div>
          {renderSidebarMenu(undefined)}
        </aside>

        <section className="dashboard-shell min-h-screen rounded-none shadow-none lg:h-screen lg:overflow-y-auto">
          {headerContent ? (
            <div className="sticky top-0 z-20 hidden border-b border-secondary-300/80 bg-white/95 backdrop-blur-sm dark:border-secondary-700/80 dark:bg-secondary-900/95 lg:block">
              <div className="px-6 py-4">{headerContent}</div>
            </div>
          ) : null}

          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-secondary-300/80 bg-white/95 px-4 py-3 backdrop-blur-sm dark:border-secondary-700/80 dark:bg-secondary-900/95 lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-slate-200 p-2 dark:border-slate-700"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>

          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </section>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/35 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              className="absolute left-0 top-0 h-full w-72 rounded-none rounded-r-3xl border-r border-slate-300/80 bg-slate-100 py-4 dark:border-slate-800 dark:bg-slate-950"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
            >
              <div className="mb-6 flex items-center justify-between px-5">
                <h3 className="font-display text-lg font-bold">{role}</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-200 p-2 dark:border-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {renderSidebarMenu(() => setOpen(false))}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
