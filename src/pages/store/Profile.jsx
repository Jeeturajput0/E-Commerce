import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

export default function Profile() {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    setForm({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      mobile: currentUser?.mobile || "",
      address: currentUser?.address || "",
    });
  }, [currentUser]);

  return (
    <PageTransition className="mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Update your basic account details without changing any existing user data
          structure.
        </p>

        <form
          className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateCurrentUserProfile(form);
          }}
        >
          <input
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Phone"
            value={form.mobile}
            onChange={(event) => setForm((prev) => ({ ...prev, mobile: event.target.value }))}
          />
          <input
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Address"
            value={form.address}
            onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
          />

          <div className="md:col-span-2">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </motion.div>
    </PageTransition>
  );
}
