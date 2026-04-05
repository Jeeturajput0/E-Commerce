import { motion } from "framer-motion";

export default function Orders() {
  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold"
      >
        My Orders
      </motion.h1>

      <div className="mt-4 bg-white p-4 shadow rounded-xl">
        <p>No orders yet 😅</p>
      </div>
    </div>
  );
}