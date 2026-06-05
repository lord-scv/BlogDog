"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { mockPosts, Post } from "@/data/posts";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Design", "Engineering", "Product", "Culture"];

  // Load posts from localStorage or initialize with mockPosts
  useEffect(() => {
    const savedPosts = localStorage.getItem("blogdog_posts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
        return;
      } catch (err) {
        console.error("Failed to parse local blogdog_posts:", err);
      }
    }
    setPosts(mockPosts);
    localStorage.setItem("blogdog_posts", JSON.stringify(mockPosts));
  }, []);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  // Find featured post (only show if category is "All")
  const featuredPost = useMemo(() => {
    return posts.find((post) => post.featured);
  }, [posts]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 w-full pb-16">
        <Hero />

        {/* Featured Post - Only show when "All" is selected */}
        {selectedCategory === "All" && featuredPost && (
          <section className="py-12 border-b border-neutral-border">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-muted mb-6">
              Featured Article
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-neutral-border rounded-xl overflow-hidden bg-neutral-card hover:border-neutral-muted transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              {/* Image Side */}
              <Link
                href={`/articles/${featuredPost.slug}`}
                className="relative block aspect-video lg:aspect-auto lg:h-[380px] lg:col-span-7 w-full overflow-hidden bg-neutral-bg"
              >
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-101"
                  priority
                />
              </Link>

              {/* Text Side */}
              <div className="p-6 md:p-8 lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-muted mb-4">
                    <span className="text-accent-primary">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-text mb-4 leading-tight hover:text-accent-primary transition-colors duration-200">
                    <Link href={`/articles/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm md:text-base text-neutral-muted leading-relaxed mb-6">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-border/50 text-xs text-neutral-muted mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-border flex items-center justify-center font-bold text-[10px] text-neutral-text">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-text block text-sm">{featuredPost.author.name}</span>
                      <span className="text-[10px] text-neutral-muted block">{featuredPost.author.role}</span>
                    </div>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Feed Section */}
        <section id="articles" className="py-12 border-b border-neutral-border">
          {/* Section Header with Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-lg font-bold tracking-tight text-neutral-text">
              Latest Articles
            </h2>
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs font-medium px-3 py-1.5 rounded-md border transition-all duration-200 cursor-pointer whitespace-nowrap bg-transparent text-neutral-muted border-neutral-border hover:border-neutral-muted hover:text-neutral-text data-[active=true]:bg-neutral-text data-[active=true]:text-neutral-bg data-[active=true]:border-neutral-text"
                    data-active={isActive}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.div
                    layout
                    key={post.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16 border border-dashed border-neutral-border rounded-lg bg-neutral-card">
              <p className="text-sm text-neutral-muted">No articles found in this category.</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup (Strictly Minimal) */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto text-center border border-neutral-border bg-neutral-card p-8 md:p-12 rounded-xl">
            <h3 className="text-xl font-bold tracking-tight text-neutral-text mb-3">
              Subscribe to the Journal
            </h3>
            <p className="text-sm text-neutral-muted leading-relaxed mb-6 max-w-md mx-auto">
              Get minimal, high-quality analysis on design and front-end engineering delivered directly to your inbox. No spam. Ever.
            </p>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscription feature is a mockup, but thank you!");
              }} 
              className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="flex-1 text-sm px-4 py-2.5 rounded-md border border-neutral-border bg-neutral-bg focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text"
              />
              <button
                type="submit"
                className="text-xs font-semibold px-5 py-2.5 rounded-md bg-neutral-text text-neutral-bg border border-neutral-text hover:bg-neutral-text/90 transition-colors duration-200 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
