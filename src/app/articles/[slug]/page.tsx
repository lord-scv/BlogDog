"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodeBlock from "@/components/CodeBlock";
import { mockPosts, Post } from "@/data/posts";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Inline Markdown-like parser helper
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
    <div className="space-y-6">
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
                    className="text-xl md:text-2xl font-bold tracking-tight text-neutral-text mt-8 mb-4 first:mt-0"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }

              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={paraIndex}
                    className="text-lg md:text-xl font-bold tracking-tight text-neutral-text mt-6 mb-3"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={paraIndex}
                    className="border-l-2 border-accent-primary pl-4 italic text-neutral-muted my-6"
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
                    className="list-disc list-inside space-y-2 text-neutral-muted my-4"
                  >
                    {items.map((item, itemIdx) => {
                      const cleanItem = itemIdx === 0 ? item.replace(/^[-*]\s+/, "") : item;
                      return <li key={itemIdx}>{parseInlineFormatting(cleanItem)}</li>;
                    })}
                  </ul>
                );
              }

              if (trimmed === "---") {
                return <hr key={paraIndex} className="border-neutral-border my-8" />;
              }

              return (
                <p key={paraIndex} className="text-neutral-muted leading-relaxed mb-6">
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

export default function ArticlePage({ params }: PageProps) {
  const { slug } = React.use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPosts = localStorage.getItem("blogdog_posts");
    let currentPosts = mockPosts;
    if (savedPosts) {
      try {
        currentPosts = JSON.parse(savedPosts);
      } catch (err) {
        console.error("Failed to parse local blogdog_posts:", err);
      }
    }
    const foundPost = currentPosts.find((p) => p.slug === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto px-6 w-full py-8 md:py-12 flex items-center justify-center">
          <span className="text-sm text-neutral-muted">Loading article...</span>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 w-full py-8 md:py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-muted hover:text-neutral-text mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          <span>Back to Articles</span>
        </Link>

        {/* Header Metadata */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-primary mb-3">
            <span>{post.category}</span>
            <span className="text-neutral-muted">•</span>
            <span className="text-neutral-muted">{post.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-text leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Block */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-neutral-border flex items-center justify-center font-bold text-sm text-neutral-text">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-neutral-text block text-sm">
                  {post.author.name}
                </span>
                <span className="text-xs text-neutral-muted block">
                  {post.author.role}
                </span>
              </div>
            </div>
            <span className="text-xs text-neutral-muted">{post.readTime}</span>
          </div>
        </div>

        {/* Cover Image (16:9 aspect ratio) */}
        <div className="relative aspect-video w-full overflow-hidden border border-neutral-border rounded-xl mb-12 bg-neutral-bg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content Layout */}
        <article className="reading-prose max-w-none">
          {renderContent(post.content)}
        </article>
      </main>

      <Footer />
    </div>
  );
}
