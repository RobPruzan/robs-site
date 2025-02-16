"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

interface Project {
  title: string;
  description: string;
  link: string;
  size: "large" | "medium";
}

interface ProjectMasonryProps {
  projects: Project[];
}

export function ProjectMasonry({ projects }: ProjectMasonryProps) {
  const columns = [
    projects.filter((_, i) => i % 2 === 0),
    projects.filter((_, i) => i % 2 === 1),
  ];

  return (
    <div className="relative py-8 md:py-12 mb-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="md:hidden flex flex-col gap-6">
            {projects.map((project, projectIndex) => (
              <ProjectCard
                key={project.title}
                {...project}
                index={projectIndex}
              />
            ))}
          </div>

          {columns.map((columnProjects, columnIndex) => (
            <div
              key={columnIndex}
              className="hidden md:flex flex-col gap-12"
              style={{
                transform: `translateY(${columnIndex * 80}px)`,
              }}
            >
              {columnProjects.map((project, projectIndex) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  index={
                    projectIndex + columnIndex * Math.ceil(projects.length / 2)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
