import Link from "next/link";
import type { CaseStudy } from "@/data/work";

// Full class strings per accent (Tailwind can't build these dynamically).
const accentStyles: Record<
  CaseStudy["accent"],
  { text: string; bar: string; glow: string; underline: string }
> = {
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    bar: "from-blue-500/60",
    glow: "hover:shadow-[0_16px_48px_-16px_rgba(37,99,235,0.35)]",
    underline: "bg-blue-600 dark:bg-blue-400",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    bar: "from-amber-500/60",
    glow: "hover:shadow-[0_16px_48px_-16px_rgba(217,119,6,0.35)]",
    underline: "bg-amber-600 dark:bg-amber-400",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    bar: "from-violet-500/60",
    glow: "hover:shadow-[0_16px_48px_-16px_rgba(124,58,237,0.35)]",
    underline: "bg-violet-600 dark:bg-violet-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "from-emerald-500/60",
    glow: "hover:shadow-[0_16px_48px_-16px_rgba(5,150,105,0.35)]",
    underline: "bg-emerald-600 dark:bg-emerald-400",
  },
};

export default function WorkCard({ study }: { study: CaseStudy }) {
  const accent = accentStyles[study.accent];

  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group relative block overflow-hidden rounded-2xl border border-slate-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-gray-700 ${accent.glow}`}
    >
      {/* Left accent bar — faint at rest, brightens on hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent.bar} to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="flex items-start justify-between gap-4">
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${accent.text}`}
        >
          {study.kicker}
        </p>
        <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
          {study.year}
        </span>
      </div>

      <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {study.title}
      </h3>

      <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
        {study.tagline}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {study.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>

      <div
        className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium ${accent.text}`}
      >
        <span className="relative">
          Read case study
          <span
            className={`absolute -bottom-0.5 left-0 h-0.5 w-0 ${accent.underline} transition-all duration-300 ease-out group-hover:w-full`}
          />
        </span>
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
