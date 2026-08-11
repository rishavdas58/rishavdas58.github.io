"use client";

import { useState, useMemo } from "react";
import { Project } from "@/lib/projects";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProjectsGridProps {
  projects: Project[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Environment: "#34a853",
  "Public Health": "#1a73e8",
  "Women's Empowerment": "#9c27b0",
  Research: "#ea4335",
  Education: "#fbbc04",
  Leadership: "#ff6d00",
};

function getColor(tags: string[]): string {
  for (const tag of tags) {
    if (CATEGORY_COLORS[tag]) return CATEGORY_COLORS[tag];
  }
  return "#1a73e8";
}

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const router = useRouter();

  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = !selectedTag || p.tags.includes(selectedTag);
      return matchSearch && matchTag;
    });
  }, [projects, searchQuery, selectedTag]);

  return (
    <div>
      {/* Search + filter bar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
        {/* Search */}
        <div style={{ position: "relative", maxWidth: 440 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9aa0a6" }}>
            <IconSearch />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
              fontSize: 14, color: "#202124", background: "#ffffff",
              border: "1px solid #dadce0", borderRadius: 24,
              outline: "none", fontFamily: "inherit",
            }}
          />
        </div>
        {/* Tag filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button
            onClick={() => setSelectedTag(null)}
            style={{
              fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, cursor: "pointer",
              border: "1px solid " + (selectedTag === null ? "#1a73e8" : "#dadce0"),
              background: selectedTag === null ? "#e8f0fe" : "#ffffff",
              color: selectedTag === null ? "#1a73e8" : "#5f6368",
              fontFamily: "inherit",
            }}
          >
            All
          </button>
          {allTags.map((tag) => {
            const color = CATEGORY_COLORS[tag] || "#1a73e8";
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, cursor: "pointer",
                  border: `1px solid ${active ? color : "#dadce0"}`,
                  background: active ? color + "18" : "#ffffff",
                  color: active ? color : "#5f6368",
                  fontFamily: "inherit",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}
          >
            {filtered.map((p, i) => {
              const color = getColor(p.tags);
              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{
                    border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden",
                    background: "#ffffff", cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onHoverStart={(e) => {
                    const el = (e.target as HTMLElement).closest("[data-card]") as HTMLElement;
                    if (el) { el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"; el.style.transform = "translateY(-2px)"; }
                  }}
                  onHoverEnd={(e) => {
                    const el = (e.target as HTMLElement).closest("[data-card]") as HTMLElement;
                    if (el) { el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }
                  }}
                  onClick={(e) => {
                    // Prevent navigation if clicking on an inner link
                    if ((e.target as HTMLElement).tagName.toLowerCase() !== 'a') {
                      router.push(`/projects/${p.slug}`);
                    }
                  }}
                  data-card="true"
                >
                  {/* Color band top */}
                  <div style={{ height: 4, background: color }} />
                  {p.image && (
                    <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
                      <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ padding: "20px" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color }}>
                      {p.tags[0] || "Project"}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#202124", marginTop: 8, marginBottom: 8, lineHeight: 1.35 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "#5f6368", lineHeight: 1.65, marginBottom: 16 }}>
                      {p.description}
                    </p>
                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {p.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: 11, fontWeight: 500, color: CATEGORY_COLORS[tag] || "#5f6368",
                          background: (CATEGORY_COLORS[tag] || "#9aa0a6") + "12",
                          borderRadius: 12, padding: "2px 10px",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Links */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 12, fontWeight: 600, color: "#1a73e8", textDecoration: "none" }}>
                          Live ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 12, fontWeight: 600, color: "#5f6368", textDecoration: "none" }}>
                          GitHub ↗
                        </a>
                      )}
                      {p.links?.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 12, fontWeight: 600, color: "#5f6368", textDecoration: "none" }}>
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "60px 0" }}
          >
            <p style={{ fontSize: 16, fontWeight: 600, color: "#202124", marginBottom: 8 }}>No projects found</p>
            <p style={{ fontSize: 14, color: "#9aa0a6", marginBottom: 20 }}>
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
              style={{ fontSize: 13, fontWeight: 600, color: "#1a73e8", background: "#e8f0fe", border: "none", borderRadius: 20, padding: "8px 20px", cursor: "pointer", fontFamily: "inherit" }}
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
