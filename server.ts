import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data-posts.json");

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

interface Post {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string;
  author: string;
  imageUrl?: string;
}

async function initData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

async function startServer() {
  await initData();
  const app = express();
  const PORT = process.env.PORT ||3000;

  app.use(express.json());

  // API Routes
  app.post("/api/summarize", async (req, res) => {
    try {
      const { title, content } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      const prompt = `You are an expert editor for a high-end blog called "The Long Story Short". 
      Your job is to provide a compelling, concise "Short" summary of the following long-form article.
      The summary should be around 2-3 sentences and capture the main insight or provocative thought of the piece.
      
      Article Title: ${title}
      Article Content: ${content}
      
      Summary:`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      const summary = result.text?.trim() || "";
      
      res.json({ summary });
    } catch (error) {
      console.error("Gemini summarization failed:", error);
      res.status(500).json({ error: "Failed to generate summary" });
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      const posts = JSON.parse(data);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to read posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const { title, content, summary, author, imageUrl } = req.body;
      const data = await fs.readFile(DATA_FILE, "utf-8");
      const posts = JSON.parse(data);
      
      const newPost: Post = {
        id: Date.now().toString(),
        title,
        content,
        summary,
        author,
        imageUrl,
        createdAt: new Date().toISOString(),
      };

      posts.unshift(newPost);
      await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to save post" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
