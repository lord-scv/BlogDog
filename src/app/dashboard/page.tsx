"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodeBlock from "@/components/CodeBlock";
import { mockPosts, Post } from "@/data/posts";
import { Save, CheckCircle, Layout, Eye, Edit2 } from "lucide-react";

// Inline parser helper specifically for the markdown editor preview
function parseInlineFormatting(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-neutral-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="bg-neutral-card border border-neutral-border px-1.5 py-0.5 rounded font-mono text-xs text-accent-primary"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderContent(content: string): React.ReactNode {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const language = match ? match[1] : "";
          const code = match ? match[2].trim() : part.replace(/```/g, "").trim();

          return <CodeBlock key={index} code={code} language={language} />;
        }

        const paragraphs = part.split("\n\n");
        return (
          <React.Fragment key={index}>
            {paragraphs.map((para, paraIndex) => {
              const trimmed = para.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={paraIndex}
                    className="text-lg md:text-xl font-bold tracking-tight text-neutral-text mt-6 mb-2 first:mt-0"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }

              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={paraIndex}
                    className="text-base md:text-lg font-bold tracking-tight text-neutral-text mt-4 mb-2"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={paraIndex}
                    className="border-l-2 border-accent-primary pl-3 italic text-neutral-muted my-4"
                  >
                    {trimmed.replace(/^>\s*/, "")}
                  </blockquote>
                );
              }

              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split(/\n[-*]\s+/);
                return (
                  <ul
                    key={paraIndex}
                    className="list-disc list-inside space-y-1 text-neutral-muted my-3 text-sm"
                  >
                    {items.map((item, itemIdx) => {
                      const cleanItem = itemIdx === 0 ? item.replace(/^[-*]\s+/, "") : item;
                      return <li key={itemIdx}>{parseInlineFormatting(cleanItem)}</li>;
                    })}
                  </ul>
                );
              }

              if (trimmed === "---") {
                return <hr key={paraIndex} className="border-neutral-border my-6" />;
              }

              return (
                <p key={paraIndex} className="text-neutral-muted leading-relaxed text-sm mb-4">
                  {parseInlineFormatting(trimmed)}
                </p>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"Design" | "Engineering" | "Product" | "Culture">("Engineering");
  const [content, setContent] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !content) {
      alert("Please fill in all fields before publishing.");
      return;
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newPost: Post = {
      slug,
      title,
      description,
      category,
      author: {
        name: "Local Author",
        role: "Contributor",
      },
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      readTime: `${Math.max(1, Math.round(content.split(/\s+/).length / 200))} min read`,
      coverImage: `/images/${category.toLowerCase()}_post_cover.png`,
      featured: false,
      content,
    };

    // Save to localStorage
    const savedPostsStr = localStorage.getItem("blogdog_posts");
    let currentPosts = mockPosts;
    
    if (savedPostsStr) {
      try {
        currentPosts = JSON.parse(savedPostsStr);
      } catch (err) {
        console.error(err);
      }
    }

    // Add new post to top of list
    const updatedPosts = [newPost, ...currentPosts.filter((p) => p.slug !== slug)];
    localStorage.setItem("blogdog_posts", JSON.stringify(updatedPosts));

    setSuccessMsg("Article published successfully! Redirecting...");
    
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 w-full py-12 flex flex-col">
        {/* Header */}
        <header className="mb-8 border-b border-neutral-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-text">
              Writer Studio
            </h1>
            <p className="text-xs text-neutral-muted">
              Draft your thoughts in Markdown format and publish them instantly.
            </p>
          </div>

          {successMsg ? (
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-md border border-emerald-500/20">
              <CheckCircle size={14} />
              <span>{successMsg}</span>
            </div>
          ) : (
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-neutral-text text-neutral-bg rounded-md hover:bg-neutral-text/90 transition-colors duration-200 cursor-pointer"
            >
              <Save size={13} />
              <span>Publish Post</span>
            </button>
          )}
        </header>

        {/* Layout Tabs for Mobile */}
        <div className="flex md:hidden border border-neutral-border rounded-lg overflow-hidden mb-6 bg-neutral-card">
          <button
            onClick={() => setActiveTab("write")}
            className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-2 ${
              activeTab === "write" ? "bg-neutral-bg text-neutral-text" : "text-neutral-muted"
            }`}
          >
            <Edit2 size={13} />
            <span>Write</span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-2 ${
              activeTab === "preview" ? "bg-neutral-bg text-neutral-text" : "text-neutral-muted"
            }`}
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
        </div>

        {/* Editor Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch min-h-[450px]">
          {/* Left: Input fields */}
          <div
            className={`md:col-span-6 flex flex-col gap-4 ${
              activeTab === "write" ? "block" : "hidden md:flex"
            }`}
          >
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted">
                  Post Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="The Future of CSS Variables..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-border bg-neutral-card rounded-md focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 border border-neutral-border bg-neutral-card rounded-md focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text cursor-pointer"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Culture">Culture</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted">
                Excerpt / Description
              </label>
              <input
                type="text"
                required
                placeholder="A short summary of the article contents for card lists."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-neutral-border bg-neutral-card rounded-md focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text"
              />
            </div>

            {/* Body Editor */}
            <div className="flex-1 flex flex-col space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted">
                Body Content (Markdown)
              </label>
              <textarea
                required
                placeholder="Write your article body here... Use ## for headings, > for quotes, and standard text paragraphs."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full text-xs p-4 border border-neutral-border bg-neutral-card rounded-md focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text font-mono resize-none min-h-[300px]"
              />
            </div>
          </div>

          {/* Right: Live Preview */}
          <div
            className={`md:col-span-6 border border-neutral-border rounded-xl bg-neutral-card p-6 md:p-8 flex flex-col overflow-y-auto max-h-[600px] ${
              activeTab === "preview" ? "block" : "hidden md:block"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-primary mb-2 block border-b border-neutral-border pb-2">
              Live Reading Preview
            </span>
            
            {title || content ? (
              <div className="reading-prose flex-1">
                {title && (
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-text mb-6">
                    {title}
                  </h1>
                )}
                {content ? (
                  renderContent(content)
                ) : (
                  <p className="text-xs text-neutral-muted italic">Draft body content to view formatted rendering.</p>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-muted">
                <Layout size={32} className="stroke-1 mb-2" />
                <p className="text-xs">Your rendered article will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
