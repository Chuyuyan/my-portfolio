import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "How I work — Chuyu Yan",
  description:
    "The principles behind how I approach problems — understand why a system fails, then redesign it. Chuyu Yan, Computer Engineering at the University of Waterloo.",
};

const principles = [
  {
    n: "01",
    title: "Start with people.",
    body: "I try to understand what makes a problem difficult before choosing any technology.",
  },
  {
    n: "02",
    title: "Respect constraints.",
    body: "Every tool has limits. Understanding those limits is often more valuable than replacing the tool.",
  },
  {
    n: "03",
    title: "Design complete systems.",
    body: "The interesting work usually happens between components, not inside them.",
  },
  {
    n: "04",
    title: "Make complexity usable.",
    body: "Technology only matters when people feel comfortable actually using it.",
  },
];

const curiousAbout = [
  "How much uncertainty can users tolerate before they stop trusting AI?",
  "Why do people delay important financial decisions even when they know the right answer?",
  "When should software explain itself, and when should it stay invisible?",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 pt-28 pb-24 transition-colors">
      <Container size="sm">
        {/* Header: photo + framing */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
          <img
            src="/avatar.jpg?v=5"
            alt="Chuyu Yan"
            className="h-40 w-40 shrink-0 rounded-2xl object-cover border border-slate-200 dark:border-gray-800 shadow-sm sm:h-48 sm:w-48"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              How I work
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Why I build the way I do
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              The projects look unrelated — healthcare AI, developer tools, a
              game about investing. The through-line is how I approach them:
              understand why a system fails, then redesign it.
            </p>
          </div>
        </div>

        {/* Principles */}
        <section className="mt-16 border-t border-slate-200 dark:border-gray-800 pt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Principles
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-200 dark:border-gray-800 bg-slate-200 dark:bg-gray-800 sm:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.n}
                className="bg-white dark:bg-gray-950 p-6 sm:p-8"
              >
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {p.n}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {p.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* A story that shows the principles in action */}
        <section className="mt-16 border-t border-slate-200 dark:border-gray-800 pt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Understanding the edges
          </h2>
          <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              One of the biggest lessons I&apos;ve learned is that tools are
              rarely simply &ldquo;good&rdquo; or &ldquo;bad.&rdquo; While
              building a PHI redaction system, I found that Microsoft Presidio
              and Azure de-identification each solved different parts of the
              problem — but neither met the precision we needed on their own.
            </p>
            <p>
              The solution wasn&apos;t choosing a different model. It was
              redesigning the workflow around their strengths and limitations.
              That experience changed how I approach almost every engineering
              problem since.
            </p>
          </div>
        </section>

        {/* What I'm curious about */}
        <section className="mt-16 border-t border-slate-200 dark:border-gray-800 pt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            What I&apos;m curious about
          </h2>
          <ul className="mt-8 max-w-2xl space-y-4">
            {curiousAbout.map((q) => (
              <li key={q} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400"
                />
                <span className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                  {q}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing */}
        <section className="mt-16 border-t border-slate-200 dark:border-gray-800 pt-12">
          <p className="max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-200">
            If anything here resonates with you — whether it&apos;s reliable AI
            systems, product design, or making difficult things easier to
            understand — I&apos;d love to chat.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-base font-medium text-blue-600 dark:text-blue-400"
            >
              Get in touch
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
