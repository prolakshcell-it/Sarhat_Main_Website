"use client";

import React from "react";
import { Search, X, RotateCcw } from "lucide-react";

interface FilterSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: readonly string[] | string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  placeholder?: string;
  totalCount: number;
  resultCount: number;
}

export default function FilterSearchBar({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  placeholder = "Search by keywords, topic, or location...",
  totalCount,
  resultCount,
}: FilterSearchBarProps) {
  const isFiltered = searchQuery.trim().length> 0 || selectedCategory !== "All";

  const handleReset = () => {
    onSearchChange("");
    onCategoryChange("All");
  };

  return (
    <div className="w-full space-y-5">
      {/* Search Input Bar */}
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-white rounded-2xl border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6DAD45]/40 focus:border-[#6DAD45] transition-all shadow-sm" />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Clear search">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Tabs & Counter Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Category Pills with horizontal scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md shadow-slate-900/10"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                }`}>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status Count and Reset */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs sm:text-sm text-slate-500 font-mono shrink-0">
          <span>
            Showing <strong className="text-slate-900">{resultCount}</strong> of {totalCount}
          </span>
          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#528732] hover:text-[#3d6824] bg-[#6DAD45]/10 hover:bg-[#6DAD45]/20 rounded-lg transition-colors font-sans font-medium">
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

