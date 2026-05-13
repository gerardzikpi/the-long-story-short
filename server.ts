import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data-posts.json");

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
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Routes
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
