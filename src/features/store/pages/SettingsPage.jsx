import { motion } from "framer-motion";
import { Bell, LockKeyhole, MoonStar, ShieldCheck, SunMedium } from "lucide-react";
import { useState } from "react";
import Button from "../../../components/common/Button";
import PageTransition from "../../../components/common/PageTransition";
import { useApp } from "../../../context/AppContext";

const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

const inputClasses =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-500 dark:focus:ring-primary-500/20";

export default function SettingsPage() {
  const { addToast, currentUser, theme, toggleTheme } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    newsletter: false,
    offers: true,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const savePassword = (event) => {
    event.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      addToast("Fill in all password fields", "warning");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast("New password and confirm password must match", "warning");
      return;
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    addToast("Password updated");
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <PageTransition className="mx-auto max-w-6xl space-y-6">
      <motion.section
        {...sectionMotion}
        className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_90px_-42px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Account Settings
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          Control how your account feels
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Update password security, notification behavior, theme mode, and account
          preferences from one clean settings workspace.
        </p>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          {...sectionMotion}
          transition={{ ...sectionMotion.transition, delay: 0.05 }}
          className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900/95"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Change password
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Keep your {currentUser?.email || "account"} protected with a stronger
                password.
              </p>
            </div>
          </div>

          <form className="mt-6 grid gap-4" onSubmit={savePassword}>
            <input
              type="password"
              placeholder="Current password"
              className={inputClasses}
              value={passwordForm.currentPassword}
              onChange={(event) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  currentPassword: event.target.value,
                }))
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="password"
                placeholder="New password"
                className={inputClasses}
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }))
                }
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className={inputClasses}
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
              />
            </div>
            <div className="pt-2">
              <Button type="submit">Save Password</Button>
            </div>
          </form>
        </motion.section>

        <motion.section
          {...sectionMotion}
          transition={{ ...sectionMotion.transition, delay: 0.1 }}
          className="space-y-6"
        >
          <SettingsCard
            icon={Bell}
            title="Notifications"
            description="Turn storefront alerts on or off with one switch."
            trailing={
              <ToggleSwitch
                enabled={notificationsEnabled}
                onChange={() => setNotificationsEnabled((prev) => !prev)}
              />
            }
          >
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">
              {notificationsEnabled
                ? "You’ll keep receiving alerts for order changes and account activity."
                : "Notifications are paused for this session until you switch them back on."}
            </div>
          </SettingsCard>

          <SettingsCard
            icon={theme === "dark" ? MoonStar : SunMedium}
            title="Theme"
            description="Switch between light and dark storefront modes."
            trailing={<ToggleSwitch enabled={theme === "dark"} onChange={toggleTheme} />}
          >
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-950/70">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                Active theme
              </span>
              <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-100">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
            </div>
          </SettingsCard>
        </motion.section>
      </div>

      <motion.section
        {...sectionMotion}
        transition={{ ...sectionMotion.transition, delay: 0.15 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <SettingsCard
          icon={ShieldCheck}
          title="Account preferences"
          description="Choose what matters most in your customer experience."
        >
          <div className="mt-5 space-y-4">
            <PreferenceRow
              title="Order updates"
              description="Shipment, delivery, and cancellation notices."
              enabled={preferences.orderUpdates}
              onChange={() => togglePreference("orderUpdates")}
            />
            <PreferenceRow
              title="Newsletter"
              description="New arrivals, editor picks, and helpful guides."
              enabled={preferences.newsletter}
              onChange={() => togglePreference("newsletter")}
            />
            <PreferenceRow
              title="Exclusive offers"
              description="Member-only promos and limited-time deals."
              enabled={preferences.offers}
              onChange={() => togglePreference("offers")}
            />
          </div>
        </SettingsCard>

        <SettingsCard
          icon={Bell}
          title="Preference summary"
          description="A quick snapshot of your current account setup."
        >
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MiniStat
              label="Notifications"
              value={notificationsEnabled ? "Enabled" : "Muted"}
            />
            <MiniStat label="Theme mode" value={theme === "dark" ? "Dark" : "Light"} />
            <MiniStat
              label="Order alerts"
              value={preferences.orderUpdates ? "On" : "Off"}
            />
            <MiniStat
              label="Offers"
              value={preferences.offers ? "Subscribed" : "Paused"}
            />
          </div>
        </SettingsCard>
      </motion.section>
    </PageTransition>
  );
}

function SettingsCard({ icon: Icon, title, description, trailing, children }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900/95">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
        {trailing}
      </div>
      {children}
    </section>
  );
}

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
        enabled ? "bg-slate-900 dark:bg-primary-500" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function PreferenceRow({ title, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
