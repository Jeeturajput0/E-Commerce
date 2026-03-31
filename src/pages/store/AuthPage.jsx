import { useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, Mail, Phone, User } from "lucide-react";

const features = [
  "Fast checkout and order tracking",
  "Wishlist and saved addresses",
  "Exclusive member-only offers",
];

const inputClassName =
  "w-full rounded-2xl border border-secondary-200 bg-white px-4 py-3 text-sm text-secondary-900 outline-none transition placeholder:text-secondary-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:border-secondary-700 dark:bg-secondary-950 dark:text-secondary-100 dark:placeholder:text-secondary-500 dark:focus:border-primary-400 dark:focus:ring-primary-950/40";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-secondary-200/80 bg-white/90 shadow-glass dark:border-secondary-700/80 dark:bg-secondary-950/80">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-primary-600/15 via-sky-400/10 to-emerald-400/15 blur-3xl" />

      <div className="relative grid gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
        <div className="flex flex-col justify-between rounded-[1.75rem] bg-slate-950 px-7 py-8 text-white">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
              Welcome back
            </span>
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Shop smarter with one secure account.
              </h1>
              <p className="max-w-xl text-sm text-slate-300 sm:text-base">
                Login to continue shopping or create a new account in a few seconds.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-secondary-200 bg-secondary-50/80 p-4 shadow-sm dark:border-secondary-700 dark:bg-secondary-900/60 sm:p-6">
          <div className="grid grid-cols-2 rounded-2xl bg-white p-1 shadow-sm dark:bg-secondary-950">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                  : "text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                  : "text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-6 space-y-2">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              {mode === "login" ? "Login to your account" : "Create your account"}
            </h2>
            <p className="text-sm text-secondary-600 dark:text-secondary-300">
              {mode === "login"
                ? "Enter your email and password to access your orders and wishlist."
                : "Fill in your details to create a new customer account."}
            </p>
          </div>

          <form className="mt-6 space-y-4">
            {mode === "signup" && (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-200">
                  <User className="h-4 w-4" />
                  Full Name
                </span>
                <input type="text" placeholder="Enter your full name" className={inputClassName} />
              </label>
            )}

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-200">
                <Mail className="h-4 w-4" />
                Email Address
              </span>
              <input type="email" placeholder="you@example.com" className={inputClassName} />
            </label>

            {mode === "signup" && (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-200">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </span>
                <input type="tel" placeholder="+91 98765 43210" className={inputClassName} />
              </label>
            )}

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-200">
                <LockKeyhole className="h-4 w-4" />
                Password
              </span>
              <input type="password" placeholder="Enter your password" className={inputClassName} />
            </label>

            {mode === "signup" && (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-200">
                  <LockKeyhole className="h-4 w-4" />
                  Confirm Password
                </span>
                <input type="password" placeholder="Confirm your password" className={inputClassName} />
              </label>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              {mode === "login" ? "Login Now" : "Create Account"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-secondary-600 dark:text-secondary-300">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {mode === "login" ? "Create an account" : "Login instead"}
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-secondary-300 px-4 py-3 text-xs text-secondary-500 dark:border-secondary-700 dark:text-secondary-400">
            Demo page is ready. Backend auth integration can be connected here later.
            <Link to="/shop" className="ml-1 font-semibold text-primary-600 dark:text-primary-400">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
