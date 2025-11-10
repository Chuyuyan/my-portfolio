import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Projects
      </h1>
      <div className="grid gap-8 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </main>
  );
}
