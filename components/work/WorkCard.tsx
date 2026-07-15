import Link from "next/link";
import type { CaseStudy } from "@/data/work";

export default function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block rounded-2xl border border-slate-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-gray-700 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
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

      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
        <span className="relative">
          Read case study
          <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out group-hover:w-full" />
        </span>
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
