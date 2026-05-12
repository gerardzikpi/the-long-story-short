import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const date = new Date(post.createdAt);
  const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group ${featured ? 'md:col-span-2 grid md:grid-cols-2 gap-12' : 'flex flex-col'}`}
    >
      <Link to={`/post/${post.id}`} className="block overflow-hidden bg-gray-100 aspect-[16/10]">
        <motion.img 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={post.imageUrl || `https://picsum.photos/seed/${post.id}/800/500`}
          alt={post.title}
          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
      </Link>

      <div className="pt-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono text-gray-400">{formattedDate}</span>
            <div className="h-[1px] w-8 bg-gray-100"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">Observation</span>
          </div>

          <Link to={`/post/${post.id}`}>
            <h2 className={`font-bold tracking-tight text-black group-hover:text-gray-500 transition-colors ${featured ? 'text-4xl md:text-5xl lg:text-6xl leading-[1.1]' : 'text-2xl md:text-3xl leading-tight'}`}>
              {post.title}
            </h2>
          </Link>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 border border-black text-[8px] font-black uppercase tracking-tighter">Short</span>
              <div className="h-[1px] flex-grow bg-gray-50"></div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed line-clamp-3">
              {post.summary}
            </p>
          </div>
        </div>

        <Link 
          to={`/post/${post.id}`}
          className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black group-hover:gap-5 transition-all"
        >
          Explore the Depth <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
