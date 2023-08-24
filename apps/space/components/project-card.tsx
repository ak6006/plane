"use client";

// next imports
import Link from "next/link";
import Image from "next/image";
// types
import { IProject } from "store/types";

interface ProjectCardProps {
  project: IProject;
  workspace_slug: string;
}

const renderEmoji = (emoji: string | { name: string; color: string }) => {
  if (!emoji) return;

  if (typeof emoji === "object")
    return (
      <span style={{ color: emoji.color }} className="material-symbols-rounded text-lg">
        {emoji.name}
      </span>
    );
  else return isNaN(parseInt(emoji)) ? emoji : String.fromCodePoint(parseInt(emoji));
};

export const ProjectCard = ({ project, workspace_slug }: ProjectCardProps) => (
  <Link href={`/${workspace_slug}/${project.id}`}>
    <div className="p-2 relative flex gap-2 items-center cursor-pointer bg-white group hover:bg-gray-100/40 transition-all">
      <div className="flex-shrink-0 w-[24px] h-[24px] flex justify-center items-center overflow-hidden">
        {project?.emoji ? (
          renderEmoji(project?.emoji)
        ) : (
          <Image src="/plane-logo.webp" alt="plane logo" className="w-[24px] h-[24px]" height="24" width="24" />
        )}
      </div>
      <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{project?.name || ""}</div>
    </div>
  </Link>
);
