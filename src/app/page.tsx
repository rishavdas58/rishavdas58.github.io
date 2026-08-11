import { getProjects } from "@/lib/projects";
import HomeContent from "@/components/home-content";

export default function Page() {
  const projects = getProjects();
  // Get all featured projects
  const featuredProjects = projects.filter((p) => p.featured);
  
  // If we don't have enough featured projects, just use the latest 4
  const displayProjects = featuredProjects.length > 0 
    ? featuredProjects.slice(0, 4) 
    : projects.slice(0, 4);

  return <HomeContent featuredProjects={displayProjects} />;
}
