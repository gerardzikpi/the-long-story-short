import { motion } from "motion/react";
import { Search, Menu, Feather } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="border-b border-border-light py-6 px-10 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-50">
      <div className="flex flex-col">
        <Link to="/" className="text-2xl font-bold tracking-tight text-black hover:opacity-80 transition-opacity">
          THE LONG STORY SHORT
        </Link>
        <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-1">
          Just cut it short.No long talks.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6 text-[11px] font-bold tracking-widest uppercase text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Stories</Link>
          <Link to="/about" className="hover:text-black transition-colors">Philosophy</Link>
          <Link to="/admin" className="hover:text-black transition-colors flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5" /> Admin
          </Link>
        </div>
        <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500">
            LATEST: MAY 2026
          </span>
          <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center text-white shadow-sm">
            <span className="text-[10px] font-bold">LSS</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
