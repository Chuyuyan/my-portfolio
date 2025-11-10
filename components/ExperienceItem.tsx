// components/ExperienceItem.tsx
import type { Experience } from "@/data/experience";
import Link from "next/link";

export default function ExperienceItem({ item }: { item: Experience }) {
  return (
    <div className="rounded-lg border border-gray-200/70 bg-white/80 backdrop-blur px-5 py-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="text-lg font-semibold">
          {item.role} · {item.company}
        </h3>
        <span className="text-sm text-gray-500">
          {item.time}{item.location ? ` · ${item.location}` : ""}
        </span>
      </div>

      <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
        {item.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      {item.link && (
        <div className="mt-3 text-sm">
          <Link href={item.link} target="_blank" className="text-blue-600 underline">
            Link
          </Link>
        </div>
      )}
    </div>
  );
}
