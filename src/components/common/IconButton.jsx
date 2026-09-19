const toneClass = {
  default:
    "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white",
  primary:
    "border-primary-200 text-primary-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-primary-500/30 dark:text-primary-400 dark:hover:bg-primary-500/10",
  danger:
    "border-rose-200 text-rose-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-500/30 dark:text-rose-400 dark:hover:bg-rose-500/10",
  success:
    "border-emerald-200 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400 dark:hover:bg-emerald-500/10",
};

const IconButton = ({
  title,
  label,
  onClick,
  tone = "default",
  disabled = false,
  className = "",
  children,
}) => (
  <span className="group/tooltip relative inline-flex">
    <button
      type="button"
      title={title || label}
      aria-label={title || label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 dark:bg-slate-900 ${toneClass[tone] || toneClass.default} ${className}`}
    >
      {children}
    </button>
    {(title || label) && (
      <span className="pointer-events-none absolute -top-9 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-150 group-hover/tooltip:-top-10 group-hover/tooltip:opacity-100 dark:bg-slate-700">
        {title || label}
      </span>
    )}
  </span>
);

export default IconButton;
