import { motion } from "framer-motion";

const styles = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400 shadow-[0_18px_40px_-18px_rgba(37,99,235,0.5)]",
  secondary:
    "bg-white/90 text-secondary-900 border border-secondary-200/80 hover:bg-white dark:bg-secondary-800 dark:text-accent-white dark:border-secondary-700 dark:hover:bg-secondary-700",
  ghost:
    "bg-transparent text-secondary-700 hover:bg-secondary-100 dark:text-secondary-200 dark:hover:bg-secondary-800",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => (
  <motion.button
    type={type}
    whileTap={{ scale: 0.96 }}
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 ${styles[variant]} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default Button;

