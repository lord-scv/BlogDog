import React from "react";

export default function Hero() {
  return (
    <section className="py-16 md:py-24 border-b border-neutral-border">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-primary mb-3">
          The Journal
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-text leading-tight mb-6">
          Thoughts on development, design, and modern web experiences.
        </h1>
        <p className="text-base md:text-lg text-neutral-muted leading-relaxed max-w-2xl">
          An editorial platform documenting the craft of software development, digital interface engineering, and cohesive design philosophy. Written by builders, for builders.
        </p>
      </div>
    </section>
  );
}
