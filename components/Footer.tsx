export default function Footer() {
    return (
      <footer className="w-full text-center py-6 mt-20 border-t border-slate-200/60 dark:border-gray-800 text-slate-500 dark:text-slate-400 text-sm bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm transition-colors">
        © {new Date().getFullYear()} Chuyu Yan · Built with Next.js + Tailwind CSS
      </footer>
    );
  }
  