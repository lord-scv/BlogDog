import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockPosts } from "@/data/posts";

const categoryMeta = [
  {
    name: "Design",
    description: "Insights on minimalism, design restraint, user experience, typography, and interface layout.",
    color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
  },
  {
    name: "Engineering",
    description: "Technical articles on modern React, Next.js, code optimization, and software development practices.",
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    name: "Product",
    description: "Cohesive product strategies, crafting principles, building opinionated tools, and roadmapping.",
    color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
  },
  {
    name: "Culture",
    description: "Engineering and startup workspace methodologies, high-ownership cultures, and work-life balance.",
    color: "text-rose-500 bg-rose-50 dark:bg-rose-950/20",
  },
];

export const metadata = {
  title: "Categories — BlogDog",
  description: "Browse articles by topic: Design, Engineering, Product Management, and Engineering Culture.",
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 w-full py-12">
        <header className="mb-12 border-b border-neutral-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-text mb-4">
            Categories
          </h1>
          <p className="text-sm text-neutral-muted max-w-xl">
            Explore articles and insights organized by domain. Deep dives into the craft of creating excellent digital products.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryMeta.map((cat) => {
            const postsInCategory = mockPosts.filter((post) => post.category === cat.name);

            return (
              <div
                key={cat.name}
                className="flex flex-col border border-neutral-border bg-neutral-card rounded-xl p-8 hover:border-neutral-muted transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md mb-3 ${cat.color}`}>
                      {cat.name}
                    </span>
                    <h2 className="text-xl font-bold text-neutral-text">
                      {cat.name}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-neutral-muted border border-neutral-border/60 bg-neutral-bg px-2 py-0.5 rounded-full">
                    {postsInCategory.length} {postsInCategory.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-muted leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Latest Articles list */}
                <div className="mt-auto">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-muted mb-3">
                    Recent Articles
                  </h3>
                  {postsInCategory.length > 0 ? (
                    <ul className="space-y-3">
                      {postsInCategory.slice(0, 3).map((post) => (
                        <li key={post.slug} className="group/item">
                          <Link
                            href={`/articles/${post.slug}`}
                            className="flex flex-col gap-0.5"
                          >
                            <span className="text-sm font-semibold text-neutral-text group-hover/item:text-accent-primary transition-colors duration-200">
                              {post.title}
                            </span>
                            <span className="text-[10px] text-neutral-muted">
                              {post.date}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-neutral-muted italic">No articles yet in this category.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
