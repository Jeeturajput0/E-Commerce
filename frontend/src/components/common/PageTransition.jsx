import { motion } from "framer-motion";

const PageTransition = ({ children, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

export default PageTransition;

