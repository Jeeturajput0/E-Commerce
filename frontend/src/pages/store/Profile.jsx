import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Pencil, Phone, UserCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

const fieldClasses =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-primary-500 dark:focus:ring-primary-500/20 dark:disabled:bg-slate-900";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: "easeOut" },
  }),
};

export default function Profile() {
  const { currentUser, updateCurrentUserProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
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

  const avatarLabel = useMemo(() => {
    const parts = (form.name || currentUser?.name || "User").trim().split(/\s+/);
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  }, [currentUser?.name, form.name]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCurrentUserProfile(form);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setForm({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      mobile: currentUser?.mobile || "",
      address: currentUser?.address || "",
    });
    setIsEditing(false);
  };

  return (
    <PageTransition className="mx-auto max-w-5xl">
      <div className="space-y-6">
        <motion.section
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_24px_90px_-42px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
        >
          <div className="bg-gradient-to-r from-amber-100 via-white to-sky-100 px-6 py-8 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 sm:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-2xl font-extrabold text-white shadow-lg dark:bg-primary-500">
                  {avatarLabel}
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Customer Profile
                  </p>
                  <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {form.name || "Your account"}
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-slate-800">
                      <Mail className="h-4 w-4" />
                      {form.email || "Email not set"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-slate-800">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Active account
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button type="submit" form="profile-form">
                      <CheckCircle2 className="h-4 w-4" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.form
          id="profile-form"
          custom={0.08}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          onSubmit={handleSubmit}
          layout
          className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900/95 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
              <UserCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Personal information
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Review and update your account details with smooth inline editing.
              </p>
            </div>
          </div>

          <motion.div
            layout
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Name
              </span>
              <div className="relative">
                <UserCircle2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className={`${fieldClasses} pl-11`}
                  placeholder="Enter your full name"
                  value={form.name}
                  disabled={!isEditing}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className={`${fieldClasses} pl-11`}
                  placeholder="Enter your email"
                  value={form.email}
                  disabled={!isEditing}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Phone
              </span>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className={`${fieldClasses} pl-11`}
                  placeholder="Enter your phone number"
                  value={form.mobile}
                  disabled={!isEditing}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, mobile: event.target.value }))
                  }
                />
              </div>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Address
              </span>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-5 h-4 w-4 text-slate-400" />
                <textarea
                  rows="4"
                  className={`${fieldClasses} resize-none pl-11`}
                  placeholder="Add your delivery address"
                  value={form.address}
                  disabled={!isEditing}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, address: event.target.value }))
                  }
                />
              </div>
            </label>
          </motion.div>
        </motion.form>
      </div>
    </PageTransition>
  );
}
