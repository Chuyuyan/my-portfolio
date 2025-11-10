import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm fixed top-0 left-0 z-50">
        <h1 className="text-xl font-semibold text-gray-800">宝贝’s Portfolio 💫</h1>
        <ul className="flex space-x-6 text-gray-600">
          
          <li>
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>

          
          <li>
            <Link href="/projects" className="hover:text-blue-600 transition">
              Projects
            </Link>
          </li>

          
          <li>
            <Link href="/experience" className="hover:text-blue-600 transition">
             Experience
           </Link>
          </li>

          
          <li><Link href="/contact"    className="hover:text-blue-600 transition">Contact</Link></li>
          <li>
           <a href="/resume.pdf" download className="hover:text-blue-600 transition">
            Resume
           </a>
          </li>
        </ul>
      </nav>
    );
  }
  
  