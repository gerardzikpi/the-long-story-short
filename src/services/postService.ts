import { Post } from "../types";

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

export async function createPost(post: Omit<Post, "id" | "createdAt">): Promise<Post> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
}
