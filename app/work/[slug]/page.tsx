import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CaseStudyBody from "@/components/work/CaseStudyBody";
import type { CaseStudy } from "@/data/work";
import { caseStudies, getCaseStudy } from "@/data/work";

const accentText: Record<CaseStudy["accent"], string> = {
  blue: "text-blue-600 dark:text-blue-400",
  amber: "text-amber-600 dark:text-amber-400",
  violet: "text-violet-600 dark:text-violet-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Work — Chuyu Yan" };
  return {
    title: `${study.title} — Chuyu Yan`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 pt-28 pb-24 transition-colors">
      <Container size="sm">
        {/* Back link */}
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
            ←
          </span>
          All work
        </Link>

        {/* Hero */}
        <header className="mt-8 border-b border-slate-200 dark:border-gray-800 pb-10">
          <p className={`text-xs font-semibold uppercase tracking-wider ${accentText[study.accent]}`}>
            {study.kicker}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {study.title}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            {study.tagline}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            {study.role && (
              <div>
                <dt className="text-slate-400 dark:text-slate-500">Role</dt>
                <dd className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">
                  {study.role}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-slate-400 dark:text-slate-500">Year</dt>
              <dd className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">
                {study.year}
              </dd>
            </div>
            {study.status && (
              <div>
                <dt className="text-slate-400 dark:text-slate-500">Status</dt>
                <dd className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">
                  {study.status}
                </dd>
              </div>
            )}
            {(study.liveUrl || study.repoUrl) && (
              <div>
                <dt className="text-slate-400 dark:text-slate-500">Links</dt>
                <dd className="mt-0.5 flex gap-3 font-medium">
                  {study.liveUrl && (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Live ↗
                    </a>
                  )}
                  {study.repoUrl && (
                    <a
                      href={study.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Code ↗
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Body */}
        <div className="mt-12">
          <CaseStudyBody study={study} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 border-t border-slate-200 dark:border-gray-800 pt-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
              ←
            </span>
            All work
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            Get in touch
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
