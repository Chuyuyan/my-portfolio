import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-slate-50/50 to-white dark:from-gray-900 dark:to-gray-800 text-slate-900 dark:text-gray-100 px-6 pt-24 pb-16 relative overflow-hidden">
      {/* 微妙的网格背景 */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      {/* 装饰性渐变光晕 - 增强可见度 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 左上角蓝色光晕 */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        {/* 右上角紫色光晕 */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-200/25 dark:bg-purple-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        {/* 中间底部蓝色光晕 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blue-100/30 dark:bg-blue-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>
      <section id="home" className="flex flex-col items-center justify-center min-h-screen w-full relative z-10">
        <Container size="lg" className="flex flex-col items-center text-center w-full">
        {/* 头像 */}
        <div className="mb-8 group">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-200 dark:bg-blue-800 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
            <img
              src="/avatar.jpg?v=5"
              alt="Profile photo"
              className="w-32 h-32 rounded-full object-cover shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-2 border-slate-200 dark:border-gray-700 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* 自我介绍 */}
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 tracking-tight">
          Hi, I'm Chuyu Yan
        </h1>
        <h2 className="text-lg md:text-xl text-blue-600 font-medium mb-8">
          Software Engineer · Document Intelligence & Automation
        </h2>

        {/* 简介 - 修复挤压问题 */}
        <p className="text-slate-600 text-base md:text-lg leading-relaxed text-center max-w-4xl w-full mb-10">
          I build automation, document intelligence, and AI-assisted systems
          that turn messy real-world data into structured, usable workflows.
        </p>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed text-center max-w-4xl w-full mb-10">
          From hospital intranet automation to semantic code search platforms,
          I focus on building systems that actually run in production.
        </p>

        {/* 技能标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            "Python Automation",
            "Backend APIs & Services",
            "Web Automation (Selenium)",
            "Document Intelligence",
            "Semantic Search & Retrieval",
            "LLM Systems",
            "Full-stack React (Next.js)"
          ].map(
            (skill, index) => (
              <span
                key={skill}
                className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:scale-105 transition-all duration-200 cursor-default"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {skill}
              </span>
            )
          )}
        </div>

        {/* 社交链接 */}
        <div className="flex gap-8 text-slate-600 mb-20">
          <a
            href="https://github.com/Chuyuyan"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-blue-600 transition-all duration-300 hover:scale-110 relative"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 ease-out"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline relative">
              GitHub
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/chuyu-yan-611a32365/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-blue-600 transition-all duration-300 hover:scale-110 relative"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 ease-out"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="hidden sm:inline relative">
              LinkedIn
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
            </span>
          </a>
          <a
            href="mailto:c29yan@uwaterloo.ca"
            className="group flex items-center gap-2 hover:text-blue-600 transition-all duration-300 hover:scale-110 relative"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 ease-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden sm:inline relative">
              Email
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
            </span>
          </a>
        </div>
        </Container>
      </section>

      {/* 精选项目 */}
      <section id="projects" className="w-full mb-20 bg-transparent dark:bg-transparent">
        <Container size="lg" className="w-full">
        <ScrollReveal>
          <h2 className="text-3xl font-semibold text-center mb-12 text-slate-900 tracking-tight">
            Featured Projects
          </h2>
        </ScrollReveal>
        <div className="grid gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            // Generate project ID from title
            const projectId = project.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <ScrollReveal key={project.title} delay={(index + 1) * 100}>
                <ProjectCard {...project} projectId={projectId} />
              </ScrollReveal>
            );
          })}
        </div>

          <div className="text-center">
            <Button variant="ghost" href="/projects" size="sm">
              View detailed projects →
            </Button>
          </div>
        </Container>
      </section>

      {/* 联系我 */}
      <section id="contact" className="w-full bg-transparent dark:bg-transparent">
        <Container size="md" className="text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold mb-4 text-slate-900 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              Interested in collaborating or just want to say hi?
            </p>
            <Button href="/contact" size="lg">
              Contact Me →
            </Button>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
