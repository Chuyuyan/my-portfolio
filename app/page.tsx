export default function Home() {
  return (
    <main
      id="home"
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 px-6 pt-24"
    >
      {/* 头像 */}
      <img
        src="/avatar.jpg"
        alt="Profile photo"
        className="w-32 h-32 rounded-full object-cover shadow-md border border-gray-300/30"
      />

      {/* 自我介绍 */}
      <h1 className="text-4xl font-bold mb-2">Hi, I’m Chuyu Yan</h1>
      <h2 className="text-lg text-blue-600 font-medium mb-6">
        Software Developer · Product Designer
      </h2>

      {/* 简介 */}
      <p className="text-center text-gray-600 max-w-xl mb-8 leading-relaxed">
        I build elegant, user-focused digital experiences with Python,
        JavaScript, and AI-powered automation. Currently crafting smart tools
        that combine design and deep learning to make innovation easier.
      </p>

      {/* 技能标签 */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {["Python", "JavaScript", "Next.js", "Tailwind", "Flask", "Selenium"].map(
          (skill) => (
            <span
              key={skill}
              className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
            >
              {skill}
            </span>
          )
        )}
      </div>

      {/* 社交链接 */}
      <div className="flex gap-6 text-gray-600">
        <a
          href="https://github.com/yourname"
          target="_blank"
          className="hover:text-blue-600 transition"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourname"
          target="_blank"
          className="hover:text-blue-600 transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:youremail@example.com"
          className="hover:text-blue-600 transition"
        >
          Email
        </a>
      </div>

      {/* 精选项目 */}
      <section id="projects" className="mt-20 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Featured Projects
        </h2>
        <div className="grid gap-6">
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">
              Patent & Scholar Assistant
            </h3>
            <p className="text-gray-600 mb-3">
              A WeChat Mini Program that crawls Google Patents and Scholar data,
              integrates AI summarization, and supports PDF caching.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Next.js", "Flask", "Selenium", "Tailwind", "DeepSeek"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">AI Resume Analyzer</h3>
            <p className="text-gray-600 mb-3">
              An NLP-based tool that analyzes resumes and matches job
              descriptions using machine learning models.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Python", "Flask", "OpenAI API"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/projects" className="text-blue-600 hover:underline">
            View all projects →
          </a>
        </div>
      </section>

      {/* 联系我 */}
      <section id="contact" className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          Interested in collaborating or just want to say hi?
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Contact Me →
        </a>
      </section>
    </main>
  );
}
