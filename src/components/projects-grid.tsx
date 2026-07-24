"use client";

import { useState, useMemo } from "react";
import { Project } from "@/lib/projects";
import { HoverEffect } from "./ui/card-hover-effect";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 1. Get unique tags across all projects
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((project) => {
      if (project.tags) {
        project.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet).sort();
  }, [projects]);

  // 2. Filter projects based on search query and selected tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  return (
    <div className="w-full">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 z-30 relative">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 rounded-xl blur-md group-focus-within:from-violet-500/10 group-focus-within:to-fuchsia-500/10 transition-all duration-300" />
          <div className="relative flex items-center bg-white border border-zinc-200 focus-within:border-zinc-300 rounded-xl px-4 py-3 shadow-sm transition-colors duration-300">
            <Search className="w-5 h-5 text-zinc-400 mr-2.5 group-focus-within:text-zinc-600 transition-colors" />
            <input
              type="text"
              placeholder="Search projects by title, description or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-zinc-800 placeholder-zinc-400 w-full text-sm font-normal"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-zinc-400 hover:text-zinc-600 p-1"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tag Filters list */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-start md:justify-end">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
              selectedTag === null
                ? "bg-zinc-900 text-white border-zinc-950 shadow-sm"
                : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-800 hover:border-zinc-300 shadow-sm"
            }`}
          >
            All Projects
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-zinc-900 text-white border-zinc-950 shadow-sm"
                  : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-800 hover:border-zinc-300 shadow-sm"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of items */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HoverEffect items={filteredProjects} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4 text-zinc-400">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-800 mb-1">No projects found</h3>
              <p className="text-sm text-zinc-500 max-w-xs">
                We couldn&apos;t find any projects matching &quot;{searchQuery || selectedTag}&quot;. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
