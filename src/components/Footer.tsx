import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-border bg-neutral-card mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Column: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm font-bold tracking-tight text-neutral-text">
              Blog<span className="text-accent-primary">Dog</span>
            </span>
            <p className="text-xs text-neutral-muted">
              © {currentYear} BlogDog. All rights reserved. Designed with restraint.
            </p>
          </div>

          {/* Right Column: Links */}
          <div className="flex items-center gap-6 text-xs text-neutral-muted">
            <Link href="/" className="hover:text-neutral-text transition-colors duration-200">
              Home
            </Link>
            <Link href="/categories" className="hover:text-neutral-text transition-colors duration-200">
              Categories
            </Link>
            <Link href="/about" className="hover:text-neutral-text transition-colors duration-200">
              About
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-text transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-text transition-colors duration-200"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
