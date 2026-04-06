import { Link } from "react-router-dom";

const Footer = () => (
  <footer className=" px-4 pb-6 lg:px-8">
    <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-secondary-700/60 dark:bg-secondary-900/80">
      <div className="grid gap-8 px-6 py-9 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-lg font-bold text-white dark:bg-primary-500 dark:text-white">
              E
            </span>
            <div>
              <h3 className="font-display text-xl font-bold">E-Commerces</h3>
              <p className="text-xs uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-400">
                Premium Storefront
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-secondary-600 dark:text-secondary-300">
            Modern e-commerce experience with elevated visuals, clean interactions, and a
            storefront that feels like a serious brand.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-300">
            Navigation
          </h4>
          <div className="mt-3 grid gap-2 text-sm text-secondary-600 dark:text-secondary-300">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/Category">Categories</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-300">
            Dashboards
          </h4>
          <div className="mt-3 grid gap-2 text-sm text-secondary-600 dark:text-secondary-300">
            <Link to="/admin/dashboard">Admin</Link>
            <Link to="/vendor/dashboard">Vendor</Link>
            <Link to="/user/dashboard">Customer</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-300">
            Contact
          </h4>
          <p className="mt-3 text-sm leading-7 text-secondary-600 dark:text-secondary-300">
            hello@ecommerces.io
            <br />
            +1 (555) 884-2201
          </p>
          <div className="mt-5 flex gap-2">
            {["Instagram", "Twitter", "Dribbble"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-secondary-200/80 px-3 py-1.5 text-xs font-semibold text-secondary-600 dark:border-secondary-700 dark:text-secondary-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-200/70 px-6 py-4 text-sm text-secondary-500 dark:border-secondary-700/70 dark:text-secondary-400 lg:px-10">
        Crafted for premium storefront presentation and smooth customer journeys.
      </div>
    </div>
  </footer>
);

export default Footer;
