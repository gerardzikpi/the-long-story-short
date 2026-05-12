import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Send, Loader2, Image as ImageIcon } from "lucide-react";
import { summarizeArticle } from "../services/geminiService";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (!title || !content) return;
    setIsSummarizing(true);
    try {
      const result = await summarizeArticle(title, content);
      setSummary(result);
    } catch (error) {
      alert("Summarization failed. Please check your article content.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!title || !content || !summary || !author) return;
    
    setIsSubmitting(true);
    try {
      await createPost({ title, content, summary, author, imageUrl });
      navigate("/");
    } catch (error) {
      alert("Failed to publish story.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-10">
      <header className="mb-20">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest">Admin Control</span>
          <div className="h-[1px] flex-grow bg-gray-100"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-4 uppercase">Content Engine</h1>
        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Processing complex narratives into distilled insights</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Article Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-gray-100 focus:border-black outline-none text-4xl font-bold py-4 transition-colors placeholder:opacity-20"
            placeholder="THE FUTURE OF..."
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Author Signature</label>
            <input 
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-transparent border-b border-gray-100 focus:border-black outline-none font-mono py-2 text-sm"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Cover Asset (URL)</label>
            <div className="relative">
              <input 
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-transparent border-b border-gray-100 focus:border-black outline-none font-mono py-2 text-sm pl-6"
                placeholder="https://..."
              />
              <ImageIcon className="absolute left-0 bottom-2.5 w-3.5 h-3.5 opacity-20" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Source Narrative (MD)</label>
          <textarea 
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-panel border border-border-light focus:border-black outline-none p-8 text-lg font-medium leading-relaxed transition-all rounded-sm placeholder:opacity-20"
            placeholder="Paste or write your long-form publication here..."
            required
          />
        </div>

        <div className="bg-white p-10 rounded-sm border border-border-light relative">
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-center bg-panel -mx-10 -mt-10 px-10 py-4 border-b border-border-light mb-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-black" />
                <label className="text-[10px] font-bold uppercase tracking-widest text-black">Distillation Output</label>
              </div>
              <button 
                type="button"
                onClick={handleSummarize}
                disabled={isSummarizing || !content}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-all shadow-sm"
              >
                {isSummarizing ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  "Initialize Magic✨"
                )}
              </button>
            </div>
            
            <textarea 
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-2xl font-bold leading-tight text-black placeholder:opacity-20 italic"
              placeholder="The distilled essence will appear here..."
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !summary}
          className="w-full py-6 bg-black text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-4"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
          Finalize Publication
        </button>
      </form>
    </div>
  );
}
