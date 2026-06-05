"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 w-full py-12">
        <header className="mb-12 border-b border-neutral-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-text mb-4">
            About BlogDog
          </h1>
          <p className="text-sm text-neutral-muted">
            The story behind our minimalist, developer-focused editorial platform.
          </p>
        </header>

        {/* Content Section */}
        <section className="space-y-8 text-neutral-muted leading-relaxed text-sm md:text-base">
          <p>
            BlogDog was founded in 2026 out of frustration with the state of the modern web. In a landscape filled with aggressive pop-ups, bouncing UI elements, neon gradients, and cookie banners, reading has become a secondary experience.
          </p>
          <p>
            We believe that content should carry the design. When you remove visual noise, you allow the thoughts, logic, and structure of the author to stand out. Our design philosophy is simple: **remove everything until there is nothing left to remove.**
          </p>

          <h2 className="text-lg md:text-xl font-bold text-neutral-text pt-4">
            Our Principles
          </h2>
          <ul className="list-disc list-inside space-y-3 pl-2">
            <li>
              <strong className="text-neutral-text font-semibold">Quality over Quantity:</strong> We do not publish for the sake of SEO rankings or social media clicks. We write about real lessons from production code and interface details.
            </li>
            <li>
              <strong className="text-neutral-text font-semibold">Strict Visual Consistency:</strong> Restrained layout spacing, curated typography, and an intentional dark/light color palette.
            </li>
            <li>
              <strong className="text-neutral-text font-semibold">Performance First:</strong> Fast load times, small bundles, and minimal Client Component hydration.
            </li>
          </ul>

          <h2 className="text-lg md:text-xl font-bold text-neutral-text pt-4">
            Get in Touch
          </h2>
          <p>
            Have a question, feedback, or want to contribute? Use the minimal form below to reach our editorial desk.
          </p>

          {/* Minimalist Contact Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! (Mockup demonstration)");
            }}
            className="border border-neutral-border bg-neutral-card p-6 rounded-lg space-y-4 max-w-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-semibold text-neutral-text">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Jane Doe"
                  className="w-full text-xs px-3 py-2 border border-neutral-border bg-neutral-bg rounded-md focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-semibold text-neutral-text">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="jane@domain.com"
                  className="w-full text-xs px-3 py-2 border border-neutral-border bg-neutral-bg rounded-md focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="message" className="text-xs font-semibold text-neutral-text">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="What's on your mind?"
                className="w-full text-xs px-3 py-2 border border-neutral-border bg-neutral-bg rounded-md focus:border-neutral-muted focus:outline-none transition-colors duration-200 text-neutral-text resize-none"
              />
            </div>

            <button
              type="submit"
              className="text-xs font-semibold px-4 py-2 rounded-md bg-neutral-text text-neutral-bg border border-neutral-text hover:bg-neutral-text/90 transition-colors duration-200 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
