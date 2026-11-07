"use client";

import React, { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export default function SocialShareButtons({
  title,
  url,
  className="",
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return url || window.location.href;
    }
    return url || "https://sarhatenergy.com";
  };

  const handleCopy = async () => {
    const fullUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleLinkedIn = () => {
    const fullUrl = encodeURIComponent(getShareUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${fullUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleTwitter = () => {
    const fullUrl = encodeURIComponent(getShareUrl());
    const tweetText = encodeURIComponent(`${title} — Sarhat Energy`);
    window.open(
      `https://x.com/intent/tweet?url=${fullUrl}&text=${tweetText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline-flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-slate-400" /> Share:
      </span>

      {/* LinkedIn */}
      <button
        onClick={handleLinkedIn}
        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-slate-200/80 hover:border-[#0A66C2] text-slate-700 hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 text-xs font-medium transition-all shadow-sm flex items-center gap-1.5"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      {/* X (Twitter) */}
      <button
        onClick={handleTwitter}
        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-slate-200/80 hover:border-black text-slate-700 hover:text-black hover:bg-slate-50 text-xs font-medium transition-all shadow-sm flex items-center gap-1.5"
        title="Share on X"
        aria-label="Share on X">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="hidden sm:inline">Post</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-medium transition-all shadow-sm flex items-center gap-1.5 ${
          copied
            ? "bg-[#6DAD45]/15 border-[#6DAD45] text-[#4d7d2f]"
            : "bg-white border-slate-200/80 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
        }`}
        title="Copy link"
        aria-label="Copy link">
        {copied ? (
          <>
            <Check className="w-4 h-4 text-[#6DAD45]" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}

