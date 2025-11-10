export default function ProjectCard({
    title,
    description,
    tech,
    link,
  }: {
    title: string;
    description: string;
    tech: string[];
    link?: string;
  }) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tech.map((item) => (
            <span
              key={item}
              className="text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-500 hover:underline"
          >
            GitHub →
          </a>
        )}
      </div>
    );
  }
  