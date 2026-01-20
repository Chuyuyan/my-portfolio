export default function Footer() {
    return (
      <footer className="w-full text-center py-6 mt-20 border-t border-slate-200/60 text-slate-500 text-sm bg-white/80 backdrop-blur-sm transition-colors">
        © {new Date().getFullYear()} 宝贝 · Built with ❤️ using Next.js + Tailwind CSS
      </footer>
    );
  }
  