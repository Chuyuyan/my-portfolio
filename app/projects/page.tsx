"use client";

import ProjectDetailCard from "@/components/ProjectDetailCard";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Function to scroll to hash
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash && !hasScrolled) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const offset = 100; // Offset for navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });

            // Highlight the element briefly
            element.classList.add("ring-4", "ring-blue-500", "ring-opacity-50", "rounded-xl", "transition-all");
            setTimeout(() => {
              element.classList.remove("ring-4", "ring-blue-500", "ring-opacity-50", "rounded-xl");
            }, 2000);

            setHasScrolled(true);
          }
        }, 300); // Wait a bit longer for page to fully render
      }
    };

    // Initial scroll
    scrollToHash();

    // Also listen for hash changes (in case user navigates via browser buttons)
    const handleHashChange = () => {
      setHasScrolled(false);
      scrollToHash();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [hasScrolled]);

  // Generate project ID from title
  const getProjectId = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 py-20 transition-colors">
      <Container size="md">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Projects
        </h1>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              id={`project-${getProjectId(project.title)}`}
              className="scroll-mt-24 transition-all duration-300"
            >
              <ProjectDetailCard {...project} projectId={getProjectId(project.title)} />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
