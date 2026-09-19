import Card from "../../../components/common/Card";
import { sectionTitleClass } from "../constants";

const CustomerAddress = () => (
  <div className="space-y-4">
    <h2 className={sectionTitleClass}>Saved Addresses</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Home</p>
        <p className="mt-2 text-sm">124 Westlake Ave, Seattle, WA 98109</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Phone: +1 555 948 1002</p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Office</p>
        <p className="mt-2 text-sm">880 Mission Street, San Francisco, CA 94103</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Phone: +1 555 904 2280</p>
      </Card>
    </div>
  </div>
);

export default CustomerAddress;
