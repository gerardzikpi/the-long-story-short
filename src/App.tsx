/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import BlogList from "./components/BlogList";
import PostDetail from "./components/PostDetail";
import AdminPanel from "./components/AdminPanel";
import Philosophy from "./components/Philosophy";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-paper overflow-x-hidden selection:bg-accent/40 selection:text-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/about" element={<Philosophy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
