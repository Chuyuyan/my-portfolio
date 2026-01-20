export default function Section({
    id, title, children
  }: { id?: string; title?: string; children: React.ReactNode }) {
    return (
      <section id={id} className="max-w-5xl mx-auto px-6 py-16">
        {title && <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-gray-100 tracking-tight">{title}</h2>}
        {children}
      </section>
    );
  }
  