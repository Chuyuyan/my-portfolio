"use client";

import Card from "./ui/Card";
import Link from "next/link";

interface ProjectDetailCardProps {
  title: string;
  description: string;
  details?: string;
  tech: string[];
  link?: string;
  projectId: string;
}

export default function ProjectDetailCard({
  title,
  description,
  details,
  tech,
  projectId,
}: ProjectDetailCardProps) {
  // Use details if available, otherwise fall back to description
  const displayText = details || description;

  return (
    <Link href={`/projects#project-${projectId}`} className="block">
      <Card hover className="group cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-xl mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:rotate-45 transition-all duration-300 ease-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed whitespace-pre-line">{displayText}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}

