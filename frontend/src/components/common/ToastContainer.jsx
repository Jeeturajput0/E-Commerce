import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Info, TriangleAlert } from "lucide-react";
import { useApp } from "../../context/AppContext";

const iconMap = {
  success: CircleCheck,
  warning: TriangleAlert,
  info: Info,
};

const ToastContainer = () => {
  const { toasts } = useApp();

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[90] space-y-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="flex max-w-xs items-center gap-3 rounded-2xl border border-secondary-200/40 bg-white px-4 py-3 text-sm shadow-lg dark:border-secondary-700 dark:bg-secondary-900"
            >
              <Icon className="h-4 w-4 text-primary-500" />
              <span className="text-secondary-700 dark:text-secondary-200">{toast.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;

