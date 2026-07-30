import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  date: string;
  content: string;
  links?: { label: string; url: string }[];
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

/**
 * Reads all project markdown files from /content/projects, parses their frontmatter
 * metadata, and returns them sorted by date descending.
 */
export function getProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames
      .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Parse frontmatter metadata and markdown content
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || "Untitled Project",
          description: data.description || "",
          tags: Array.isArray(data.tags) ? data.tags : [],
          liveUrl: data.liveUrl || undefined,
          githubUrl: data.githubUrl || undefined,
          image: data.image || undefined,
          featured: typeof data.featured === "boolean" ? data.featured : false,
          date: data.date || "",
          content,
          links: Array.isArray(data.links) ? data.links : [],
        } as Project;
      });

    // Sort projects by date descending (latest first)
    return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}
