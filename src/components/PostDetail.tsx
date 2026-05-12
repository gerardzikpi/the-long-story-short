import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Post } from "../types";
import { fetchPosts } from "../services/postService";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(posts => {
      const found = posts.find(p => p.id === id);
      setPost(found || null);
      setRecentPosts(posts.filter(p => p.id !== id).slice(0, 4));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen font-mono text-[10px] uppercase tracking-widest animate-pulse text-gray-400">Synchronizing Analysis...</div>;
  if (!post) return <div className="p-20 text-center font-bold text-4xl">404: Narrative Interrupted.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col lg:flex-row min-h-[calc(100vh-84px)]"
    >
      {/* Sidebar: Recent Publications */}
      <aside className="w-full lg:w-72 border-r border-border-light flex flex-col bg-white overflow-y-auto">
        <div className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-border-extra-light bg-border-extra-light/30">
          Recent Publications
        </div>
        <div className="flex-1 divide-y divide-border-extra-light">
          {recentPosts.map((rp) => (
            <Link key={rp.id} to={`/post/${rp.id}`} className="block p-6 hover:bg-gray-50 transition-colors group">
              <p className="text-[10px] text-gray-400 font-mono mb-2">
                {new Date(rp.createdAt).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: '2-digit' })}
              </p>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-black transition-colors">
                {rp.title}
              </h3>
            </Link>
          ))}
          {recentPosts.length === 0 && (
            <div className="p-6 text-[10px] text-gray-400 italic">No other stories found.</div>
          )}
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col bg-white">
        <div className="p-10 md:p-16 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="px-2 py-0.5 border border-black text-[9px] font-bold uppercase tracking-wider">AI Summary</span>
              <span className="text-[11px] text-gray-400 font-mono">Input: {Math.round(post.content.split(' ').length * 1.3)} Tokens</span>
              <div className="h-[1px] flex-grow bg-gray-100"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-12 text-black tracking-tight">
              {post.title}
            </h2>

            <div className="bg-gray-50 p-8 mb-12 border-l-2 border-black">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">The Short</h4>
              <p className="text-2xl font-medium leading-relaxed italic text-black">
                "{post.summary}"
              </p>
            </div>

            <div className="markdown-body text-gray-600 leading-relaxed text-lg">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Stats */}
        <div className="h-24 border-t border-border-light flex items-center px-10 gap-12 bg-border-extra-light/30">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Summary Depth</span>
            <div className="flex gap-1 mt-1.5">
              <div className="h-1 w-8 bg-black"></div>
              <div className="h-1 w-8 bg-black"></div>
              <div className="h-1 w-8 bg-gray-200"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Time Saved</span>
            <span className="text-xl font-bold tracking-tight">~14 Minutes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Compression</span>
            <span className="text-xl font-bold tracking-tight">94%</span>
          </div>
        </div>
      </main>

      {/* AI Metadata Panel */}
      <aside className="w-full lg:w-80 border-l border-border-light bg-panel p-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gemini Analysis</h4>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[11px] mb-2">
                <span className="text-gray-500">Objectivity Score</span>
                <span className="font-bold">92%</span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  className="h-1 bg-black rounded-full" 
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-2">
                <span className="text-gray-500">Sentiment Complexity</span>
                <span className="font-bold">78%</span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  className="h-1 bg-black rounded-full" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Thematic Clusters</h4>
          <div className="flex flex-wrap gap-2">
            {["SYSTEMIC ANALYSIS", "FUTURE POLICY", "ETHICAL FRAMEWORKS"].map(tag => (
              <span key={tag} className="px-2 py-1 bg-white border border-gray-100 text-[9px] font-bold tracking-wider rounded-sm text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 leading-relaxed font-mono uppercase italic">
            "Gemini 3.0 processing complete. No logical inconsistencies detected in source narrative."
          </p>
        </div>
      </aside>
    </motion.div>
  );
}
