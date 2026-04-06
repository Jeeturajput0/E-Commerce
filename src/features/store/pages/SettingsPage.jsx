import PageTransition from "../../../components/common/PageTransition";

export default function SettingsPage() {
  return (
    <PageTransition className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage account preferences and storefront notifications.
        </p>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Account settings are ready for extension here without affecting your existing
          dashboard logic.
        </p>
      </section>
    </PageTransition>
  );
}
