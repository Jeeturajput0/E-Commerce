import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";

const ContactPage = () => (
  <PageTransition className="space-y-6">
    <div>
      <h1 className="font-display text-3xl font-bold">Contact Us</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Reach out for partnership, support, or onboarding help.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <form className="glass space-y-4 rounded-2xl p-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <textarea
          rows={5}
          placeholder="Tell us what you need..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <Button type="submit">Send Message</Button>
      </form>

      <div className="glass overflow-hidden rounded-2xl p-4">
        <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 dark:border-slate-600 dark:bg-slate-800/40 dark:text-slate-300">
          Map Placeholder
        </div>
      </div>
    </div>
  </PageTransition>
);

export default ContactPage;

