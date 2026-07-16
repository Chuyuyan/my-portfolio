import type { CaseStudy } from "@/data/work";
import CodeSearchDiagram from "@/components/diagrams/CodeSearchDiagram";
import MultiAgentDiagram from "@/components/diagrams/MultiAgentDiagram";

function Diagram({ kind }: { kind: CaseStudy["diagram"] }) {
  if (kind === "code-search") return <CodeSearchDiagram />;
  if (kind === "arthur") return <MultiAgentDiagram />;
  return null;
}

// Per-study accent — the only color allowed to draw the eye.
const accentText: Record<CaseStudy["accent"], string> = {
  blue: "text-blue-600 dark:text-blue-400",
  amber: "text-amber-600 dark:text-amber-400",
  violet: "text-violet-600 dark:text-violet-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
};

const accentBorder: Record<CaseStudy["accent"], string> = {
  blue: "border-blue-500/70 dark:border-blue-400/70",
  amber: "border-amber-500/70 dark:border-amber-400/70",
  violet: "border-violet-500/70 dark:border-violet-400/70",
  emerald: "border-emerald-500/70 dark:border-emerald-400/70",
};

const accentDot: Record<CaseStudy["accent"], string> = {
  blue: "bg-blue-500/70",
  amber: "bg-amber-500/70",
  violet: "bg-violet-500/70",
  emerald: "bg-emerald-500/70",
};

export default function CaseStudyBody({ study }: { study: CaseStudy }) {
  const accent = study.accent;

  return (
    <div className="space-y-16">
      {study.sections.map((section, i) => {
        const heading = section.heading.trim().toLowerCase();
        const isProblem = heading === "the problem";
        const isReflection = heading === "reflection";
        const isRole = heading === "my role";

        return (
          <section key={i}>
            {/* Muted eyebrow — no more wall of blue headings */}
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              {section.heading}
            </h2>

            {/* Problem: a single large lead statement */}
            {isProblem && section.body && (
              <p className="mt-4 text-xl sm:text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                {section.body}
              </p>
            )}

            {/* Reflection: short pull-quote */}
            {isReflection && section.body && (
              <blockquote className={`mt-4 border-l-2 pl-6 ${accentBorder[accent]}`}>
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                  {section.body}
                </p>
              </blockquote>
            )}

            {/* My role: intentionally quiet — it's context, not the headline */}
            {isRole && section.body && (
              <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                {section.body}
              </p>
            )}

            {/* Any other prose section (Architecture, etc.).
                Sections with metrics render their body *below* the numbers instead. */}
            {section.body &&
              !isProblem &&
              !isReflection &&
              !isRole &&
              !section.metrics && (
                <p className="mt-3 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {section.body}
                </p>
              )}

            {/* Bullet sections (Constraints, Tradeoffs) */}
            {section.bullets && (
              <ul className="mt-4 space-y-2.5">
                {section.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300"
                  >
                    <span
                      className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${accentDot[accent]}`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Repeatable loop: numbered vertical flow with connectors */}
            {section.flow && (
              <ol className="mt-5">
                {section.flow.map((f, j) => (
                  <li key={j} className="relative flex gap-4 pb-6 last:pb-0">
                    {j < section.flow!.length - 1 && (
                      <span className="absolute left-[15px] top-9 bottom-0 w-px bg-slate-200 dark:bg-gray-800" />
                    )}
                    <span
                      className={`relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full border bg-white dark:bg-gray-950 text-sm font-bold tabular-nums ${accentBorder[accent]} ${accentText[accent]}`}
                    >
                      {j + 1}
                    </span>
                    <div className="pt-1">
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {f.step}
                      </p>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        {f.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {/* Key engineering decisions: numbered Decision → Why → Tradeoff cards */}
            {section.decisions && (
              <div className="mt-5 space-y-3">
                {section.decisions.map((d, j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/40 p-5 sm:p-6"
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`text-sm font-bold tabular-nums ${accentText[accent]}`}
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <p className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                        {d.decision}
                      </p>
                    </div>
                    <div className="mt-3 space-y-2 pl-8 text-base leading-relaxed">
                      <p className="text-slate-600 dark:text-slate-300">
                        <span
                          className={`mr-2 text-xs font-semibold uppercase tracking-wider ${accentText[accent]}`}
                        >
                          Why
                        </span>
                        {d.why}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Tradeoff
                        </span>
                        {d.tradeoff}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Why this is difficult: labelled difficulty cards */}
            {section.cards && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {section.cards.map((c, j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/40 p-5"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 flex-none translate-y-[-1px] rounded-full ${accentDot[accent]}`}
                      />
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {c.title}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {c.note}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Before / after comparison */}
            {section.comparison && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/40 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Before
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-700 dark:text-slate-200">
                    {section.comparison.before.label}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {section.comparison.before.points.map((p, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-300 dark:bg-gray-600" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`rounded-xl border bg-slate-50/60 dark:bg-gray-900/40 p-5 sm:p-6 ${accentBorder[accent]}`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${accentText[accent]}`}
                  >
                    After
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                    {section.comparison.after.label}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {section.comparison.after.points.map((p, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                      >
                        <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${accentDot[accent]}`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Outcome: big-number metric cards a recruiter can read at a glance */}
            {section.metrics && (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {section.metrics.map((m, j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/40 p-5"
                  >
                    <div
                      className={`text-3xl sm:text-4xl font-bold tracking-tight ${accentText[accent]}`}
                    >
                      {m.value}
                    </div>
                    <div className="mt-1.5 text-sm leading-snug text-slate-500 dark:text-slate-400">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Forward-looking note that belongs *under* the metric cards */}
            {section.metrics && section.body && (
              <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {section.body}
              </p>
            )}

            {section.showDiagram && study.diagram && (
              <Diagram kind={study.diagram} />
            )}
          </section>
        );
      })}
    </div>
  );
}
