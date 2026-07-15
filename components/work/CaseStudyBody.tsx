import type { CaseStudy } from "@/data/work";
import CodeSearchDiagram from "@/components/diagrams/CodeSearchDiagram";
import MultiAgentDiagram from "@/components/diagrams/MultiAgentDiagram";

function Diagram({ kind }: { kind: CaseStudy["diagram"] }) {
  if (kind === "code-search") return <CodeSearchDiagram />;
  if (kind === "arthur") return <MultiAgentDiagram />;
  return null;
}

export default function CaseStudyBody({ study }: { study: CaseStudy }) {
  return (
    <div className="space-y-12">
      {study.sections.map((section, i) => (
        <section key={i}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {section.heading}
          </h2>

          {section.body && (
            <p className="mt-3 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {section.body}
            </p>
          )}

          {section.bullets && (
            <ul className="mt-3 space-y-2.5">
              {section.bullets.map((b, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-lg leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue-500/70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {section.showDiagram && study.diagram && (
            <Diagram kind={study.diagram} />
          )}
        </section>
      ))}
    </div>
  );
}
