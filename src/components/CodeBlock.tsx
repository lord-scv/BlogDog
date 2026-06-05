"use client";

import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative border border-neutral-border rounded-lg bg-neutral-card my-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-border bg-neutral-bg/50">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-muted">
          {language || "code"}
        </span>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded hover:bg-neutral-border text-neutral-muted hover:text-neutral-text transition-colors duration-200 cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check size={13} className="text-emerald-500" /> : <Clipboard size={13} />}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed text-neutral-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
