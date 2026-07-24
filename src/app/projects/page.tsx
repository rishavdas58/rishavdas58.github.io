import { getProjects } from "@/lib/projects";
import ProjectsGrid from "@/components/projects-grid";

export const metadata = {
  title: "Projects | Rishav Das",
  description: "Browse through my local markdown-driven software projects, tools, and social campaigns.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="relative min-h-screen w-full text-zinc-800 overflow-hidden py-24 px-6 md:px-12 lg:px-16">
      {/* Aceternity UI Grid Background */}
      <div className="absolute inset-0 w-full h-full bg-grid-pattern bg-mask-radial opacity-45 pointer-events-none z-0" />
      
      {/* Decorative Top spotlight/glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold bg-white border border-zinc-200/80 text-zinc-600 shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
            Showcasing {projects.length} Works
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4">
            Key <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-600">Projects & Campaigns</span>
          </h1>
          
          <p className="text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed font-normal">
            A curated list of my technical work, public health initiatives, and community campaigns. Loaded dynamically from local MDX templates.
          </p>
        </div>

        {/* Dynamic Project Filtering Grid */}
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
