import { motion } from "framer-motion";

const styles = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-600",
  secondary:
    "bg-white text-secondary-900 border border-secondary-200 hover:bg-secondary-50 dark:bg-secondary-800 dark:text-accent-white dark:border-secondary-700 dark:hover:bg-secondary-700",
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
    whileHover={{ scale: 1.02 }}
    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default Button;

