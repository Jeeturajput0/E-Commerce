import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Name" />
          <input className="border p-2 rounded" placeholder="Email" />
          <input className="border p-2 rounded" placeholder="Phone" />
          <input className="border p-2 rounded" placeholder="Address" />
        </div>

        <button className="mt-4 bg-black text-white px-4 py-2 rounded-xl">
          Save Changes
        </button>
      </motion.div>
    </div>
  );
}