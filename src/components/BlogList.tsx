import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";
import { Post } from "../types";
import PostCard from "./PostCard";
import { motion } from "motion/react";

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex justify-center py-20 font-mono text-[10px] uppercase tracking-widest opacity-30 animate-pulse">Scanning Archive...</div>;

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-10 py-20 md:py-32">
      <header className="mb-20 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="px-2 py-1 border border-black text-[10px] font-bold uppercase tracking-widest">Selected Works</span>
          <div className="h-[1px] flex-grow bg-gray-100"></div>
          <span className="text-[10px] text-gray-400 font-mono">EST. 2026</span>
        </motion.div>
        
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-black leading-[0.85] mb-12">
          THE ART OF<br />
          <span className="text-gray-200">PRECISION.</span>
        </h1>
        
        <p className="max-w-xl text-lg text-gray-500 leading-relaxed font-medium">
          A publication dedicated to long-form excellence and AI-distilled brevity. We explore complex narratives through a minimalist lens.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
        {featuredPost && <PostCard post={featuredPost} featured={true} />}
        {regularPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <footer className="mt-40 py-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight">LSS.</span>
          <span className="text-[10px] text-gray-400 font-mono mt-1">© 2026 COLLECTIVE</span>
        </div>
        <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#" className="hover:text-black transition-colors">Newsletter</a>
          <a href="#" className="hover:text-black transition-colors">Masthead</a>
          <a href="#" className="hover:text-black transition-colors">Archives</a>
        </div>
      </footer>
    </div>
  );
}
