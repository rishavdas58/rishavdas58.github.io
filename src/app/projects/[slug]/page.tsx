import { getProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return notFound();
  }

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#202124" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e8eaed", background: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/projects" style={{ fontSize: 14, fontWeight: 600, color: "#1a73e8", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to Projects
          </Link>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#5f6368" }}>
            {project.title}
          </span>
        </div>
      </nav>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40, borderBottom: "1px solid #e8eaed", paddingBottom: 32 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a73e8", background: "#e8f0fe", padding: "4px 10px", borderRadius: 12 }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#202124", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            {project.title}
          </h1>
          <p style={{ fontSize: 18, color: "#5f6368", lineHeight: 1.6, marginBottom: 24 }}>
            {project.description}
          </p>

          {project.image && (
            <img 
              src={project.image} 
              alt={project.title} 
              style={{ width: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: 16, marginBottom: 24 }} 
            />
          )}

          {/* Project Links */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", background: "#1a73e8", padding: "8px 20px", borderRadius: 24, textDecoration: "none" }}>
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: "#1a73e8", background: "#f8f9fa", border: "1px solid #dadce0", padding: "8px 20px", borderRadius: 24, textDecoration: "none" }}>
                GitHub ↗
              </a>
            )}
            {project.links?.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: "#1a73e8", background: "#f8f9fa", border: "1px solid #dadce0", padding: "8px 20px", borderRadius: 24, textDecoration: "none" }}>
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <article style={{ lineHeight: 1.8, fontSize: 16, color: "#3c4043" }}>
          <MDXRemote source={project.content} />
        </article>
      </main>
      
      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e8eaed", background: "#f8f9fa", padding: "24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#9aa0a6" }}>© 2026 Rishav Das</p>
        </div>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
