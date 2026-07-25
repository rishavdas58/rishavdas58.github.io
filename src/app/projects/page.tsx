import { getProjects } from "@/lib/projects";
import ProjectsGrid from "@/components/projects-grid";
import Link from "next/link";

export const metadata = {
  title: "Projects | Rishav Das",
  description: "Social impact projects in environment, public health, women empowerment, and biotechnology research.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#202124" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e8eaed", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 15, fontWeight: 700, color: "#202124", letterSpacing: "-0.3px", textDecoration: "none" }}>
            ← Rishav Das
          </Link>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#5f6368", letterSpacing: "1px", textTransform: "uppercase" }}>
            Projects
          </span>
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Page header */}
        <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid #e8eaed" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#1a73e8", marginBottom: 12 }}>
            Portfolio
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#202124", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
            Projects & Initiatives
          </h1>
          <p style={{ fontSize: 16, color: "#5f6368", lineHeight: 1.7, maxWidth: 560 }}>
            Social impact programs spanning environment, public health, women&apos;s empowerment, and biotechnology research across Nepal and globally.
          </p>
        </div>

        <ProjectsGrid projects={projects} />

      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e8eaed", background: "#f8f9fa", padding: "24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#9aa0a6" }}>© 2026 Rishav Das</p>
          <Link href="/" style={{ fontSize: 13, color: "#5f6368", textDecoration: "none" }}>← Back to Profile</Link>
        </div>
      </footer>
    </div>
  );
}
