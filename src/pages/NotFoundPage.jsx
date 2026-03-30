import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import Button from "../components/common/Button";

const NotFoundPage = () => (
  <PageTransition className="mx-auto max-w-2xl py-24 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-300">
      Error 404
    </p>
    <h1 className="mt-3 font-display text-5xl font-bold">Page Not Found</h1>
    <p className="mt-4 text-slate-600 dark:text-slate-300">
      The page you requested does not exist or has been moved.
    </p>
    <Link to="/" className="mt-7 inline-block">
      <Button>Return Home</Button>
    </Link>
  </PageTransition>
);

export default NotFoundPage;

