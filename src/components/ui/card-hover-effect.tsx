"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Project } from "@/lib/projects";

const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ExternalLink = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export const HoverEffect = ({
  items,
  className,
}: {
  items: Project[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.slug}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-zinc-200/60 block rounded-3xl z-0 shadow-sm"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.image && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 bg-zinc-100 border border-zinc-200/60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            )}
            <div className="flex justify-between items-start mb-3 gap-3">
              <CardTitle>{item.title}</CardTitle>
              <div className="flex gap-2.5 text-zinc-400 group-hover:text-zinc-600 transition-colors z-30">
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-600 transition-colors p-1"
                    title="View GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 transition-colors p-1"
                    title="View Live Site"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            <CardDescription>{item.description}</CardDescription>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-zinc-100">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-zinc-100/70 border border-zinc-200/60 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-5 overflow-hidden bg-white border border-zinc-200/70 group-hover:border-zinc-300 relative z-20 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-md",
        className
      )}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-900 font-extrabold tracking-tight mt-1 text-base md:text-lg leading-tight", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2.5 text-zinc-600 tracking-wide leading-relaxed text-xs md:text-sm min-h-[50px] font-normal",
        className
      )}
    >
      {children}
    </p>
  );
};
