import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import WorkCard from "@/components/work/WorkCard";
import { caseStudies } from "@/data/work";

export const metadata: Metadata = {
  title: "Work — Chuyu Yan",
  description:
    "Case studies: multi-agent clinical QA, semantic code search, a behavioral investing game, and production automation.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 pt-28 pb-24 transition-colors">
      <Container size="md">
        <header className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Work
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            A few systems I&apos;ve built, written up as case studies — the
            problem, the constraints, the architecture, and the tradeoffs I made
            on purpose.
          </p>
        </header>

        <div className="mt-12 grid gap-6">
          {caseStudies.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
      </Container>
    </main>
  );
}
