import Link from "next/link";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ScrollReveal";
import WorkCard from "@/components/work/WorkCard";
import { caseStudies } from "@/data/work";

const socials = [
  { label: "GitHub", href: "https://github.com/Chuyuyan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chuyu-yan-611a32365/" },
  { label: "Email", href: "mailto:c29yan@uwaterloo.ca" },
];

const proofPoints = [
  "3 internships",
  "60+ real clinical reports",
  "5× latency reduction",
  "2,000+ repositories indexed",
];

const flow = ["Unstructured input", "Structured system", "Actionable outcome"];

const experienceSnapshot = [
  {
    company: "Arthur Health",
    role: "AI Agent Developer",
    blurb:
      "Built a multi-agent clinical QA platform from architecture through internal demo and pilot preparation.",
  },
  {
    company: "Dingke Medical Technology",
    role: "Software Engineering Intern",
    blurb:
      "Developed hybrid search infrastructure across 2,000+ repositories and 50k+ code chunks.",
  },
  {
    company: "Kangyu Medical",
    role: "R&D Assistant Intern",
    blurb:
      "Built OCR and automation pipelines for low-quality medical documents.",
  },
];

const workingStyle = [
  {
    title: "Understand the user",
    body: "Start from the real use case and the failure that matters, before choosing any technology.",
  },
  {
    title: "Design the whole system",
    body: "Think in contracts, fallbacks, and boundaries — not just the happy path or a single model call.",
  },
  {
    title: "Build for reliability",
    body: "Optimize for systems that stay understandable, maintainable, and trustworthy as they grow.",
  },
];

export default function Home() {
  const featured = caseStudies.slice(0, 3);

  return (
    <main className="bg-white dark:bg-gray-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* one soft, static glow — no motion */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-3xl"
        />
        <Container size="md" className="relative flex min-h-[88vh] flex-col justify-center py-24">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Chuyu Yan · Software Engineer
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white">
            I build systems that make{" "}
            <span className="text-blue-600 dark:text-blue-400">complex problems</span>{" "}
            approachable.
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Software Engineer at the University of Waterloo, building reliable AI
            platforms, developer tools, and interactive learning products.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              View selected work
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href="/Chuyu-Yan-Resume.pdf"
              download="Chuyu-Yan-Resume.pdf"
              className="inline-flex items-center rounded-lg border border-slate-300 dark:border-gray-700 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-gray-900"
            >
              Download résumé
            </a>
          </div>

          {/* Light, static "system flow" visual — reinforces the thesis without motion */}
          <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 text-sm font-medium">
            {flow.map((step, i) => (
              <div key={step} className="flex items-center gap-3 sm:gap-2">
                <span className="rounded-lg border border-slate-200 dark:border-gray-800 bg-slate-50/70 dark:bg-gray-900/50 px-4 py-2 text-slate-700 dark:text-slate-200">
                  {step}
                </span>
                {i < flow.length - 1 && (
                  <span
                    aria-hidden
                    className="rotate-90 text-blue-500 dark:text-blue-400 sm:mx-1 sm:rotate-0"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {s.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof strip */}
      <section className="border-y border-slate-200/70 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/40">
        <Container size="md" className="py-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-slate-500 dark:text-slate-400 sm:justify-between">
            {proofPoints.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                <span className="font-medium text-slate-700 dark:text-slate-200">{p}</span>
                {i < proofPoints.length - 1 && (
                  <span aria-hidden className="hidden text-slate-300 dark:text-gray-700 sm:inline">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Selected work */}
      <section>
        <Container size="md" className="py-20 sm:py-28">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Selected work
            </h2>
            <Link
              href="/work"
              className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
            >
              All work
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6">
            {featured.map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 100}>
                <WorkCard study={study} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
            >
              All work
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Experience snapshot */}
      <section className="border-t border-slate-200/70 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/40">
        <Container size="md" className="py-20 sm:py-28">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Experience
            </h2>
            <Link
              href="/experience"
              className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
            >
              Full experience
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-10 divide-y divide-slate-200/70 dark:divide-gray-800">
            {experienceSnapshot.map((e) => (
              <div
                key={e.company}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div className="sm:w-64 shrink-0">
                  <p className="font-semibold text-slate-900 dark:text-white">{e.company}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{e.role}</p>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{e.blurb}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/experience"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
            >
              Full experience
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Working style */}
      <section>
        <Container size="md" className="py-20 sm:py-28">
          <h2 className="max-w-3xl text-2xl sm:text-3xl font-semibold leading-relaxed tracking-tight text-slate-800 dark:text-slate-100">
            I work at the intersection of engineering, product thinking, and user
            trust — understanding the real use case before choosing the technology,
            and designing systems that stay understandable as they grow.
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {workingStyle.map((s) => (
              <div key={s.title}>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-slate-200/70 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/40">
        <Container size="md" className="py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Interested in building useful systems together?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            I&apos;m open to internships and collaborations in AI systems, developer
            tooling, and interactive learning products.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:c29yan@uwaterloo.ca"
              className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              Email me
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/chuyu-yan-611a32365/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-slate-300 dark:border-gray-700 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-200 transition-colors hover:bg-white dark:hover:bg-gray-900"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Chuyuyan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-slate-300 dark:border-gray-700 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-200 transition-colors hover:bg-white dark:hover:bg-gray-900"
            >
              GitHub
            </a>
            <a
              href="/Chuyu-Yan-Resume.pdf"
              download="Chuyu-Yan-Resume.pdf"
              className="inline-flex items-center rounded-lg border border-slate-300 dark:border-gray-700 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-200 transition-colors hover:bg-white dark:hover:bg-gray-900"
            >
              Résumé
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
