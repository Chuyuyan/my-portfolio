// components/ExperienceItem.tsx
import type { Experience } from "@/data/experience";
import Link from "next/link";
import Card from "./ui/Card";
import MultiAgentDiagram from "./diagrams/MultiAgentDiagram";

export default function ExperienceItem({ item }: { item: Experience }) {
  return (
    <Card hover={false} padding="md">
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {item.role} · {item.company}
        </h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {item.time}{item.location ? ` · ${item.location}` : ""}
        </span>
      </div>

      <ul className="mt-2 list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
        {item.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      {item.diagram === "arthur" && <MultiAgentDiagram />}

      {item.link && (
        <div className="mt-3 text-sm">
          <Link
            href={item.link}
            target="_blank"
            className="text-blue-600 hover:text-blue-700 group relative inline-block transition-colors"
          >
            <span className="relative">
              Link
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
            </span>
          </Link>
        </div>
      )}
    </Card>
  );
}
