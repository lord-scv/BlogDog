import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/data/posts";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col h-full bg-neutral-card border border-neutral-border rounded-lg overflow-hidden transition-all duration-300 hover:border-neutral-muted hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      {/* Image Container (16:9) */}
      <Link href={`/articles/${post.slug}`} className="relative block aspect-video w-full overflow-hidden border-b border-neutral-border bg-neutral-bg">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-102"
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          priority={post.featured}
        />
      </Link>

      {/* Content Area */}
      <div className="flex-1 flex flex-col p-6">
        {/* Category & Date */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-muted mb-3">
          <span className="text-accent-primary">{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-neutral-text mb-2 line-clamp-2 leading-snug group-hover:text-accent-primary transition-colors duration-200">
          <Link href={`/articles/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-muted leading-relaxed line-clamp-3 mb-6">
          {post.description}
        </p>

        {/* Footer info (Author & Read time) */}
        <div className="mt-auto pt-4 border-t border-neutral-border/50 flex items-center justify-between text-xs text-neutral-muted">
          <div className="flex items-center gap-2">
            {post.author.avatarUrl ? (
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-neutral-border flex items-center justify-center font-bold text-[9px] text-neutral-text">
                {post.author.name.charAt(0)}
              </div>
            )}
            <span className="font-medium text-neutral-text">{post.author.name}</span>
          </div>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}
