import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-20 border-t border-secondary-200/40 bg-white/70 dark:border-secondary-700/60 dark:bg-secondary-900/70">
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-4 lg:px-8">
      <div>
        <h3 className="font-display text-xl font-bold">E-Commerces</h3>
        <p className="mt-3 text-sm text-secondary-600 dark:text-secondary-300">
          Premium multi-vendor marketplace UX for modern digital commerce teams.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-500 dark:text-secondary-300">
          Navigation
        </h4>
        <div className="mt-3 grid gap-2 text-sm text-secondary-600 dark:text-secondary-300">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-500 dark:text-secondary-300">
          Dashboards
        </h4>
        <div className="mt-3 grid gap-2 text-sm text-secondary-600 dark:text-secondary-300">
          <Link to="/admin/dashboard">Admin</Link>
          <Link to="/vendor/dashboard">Vendor</Link>
          <Link to="/user/dashboard">Customer</Link>
        </div>
      </div>
      <div> 
        
        <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-500 dark:text-secondary-300">
          Contact
        </h4>
        <p className="mt-3 text-sm text-secondary-600 dark:text-secondary-300">
          hello@ecommerces.io
          <br />
          +1 (555) 884-2201
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

