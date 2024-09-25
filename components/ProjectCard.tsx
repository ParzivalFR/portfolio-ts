import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { HiHashtag } from "react-icons/hi";
import { Project } from "./Projects"; // Importe l'interface Project

interface ProjectCardProps {
  project: Project;
  heartState: boolean;
  likes: number;
  onToggleHeart: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  heartState,
  likes,
  onToggleHeart,
}) => {
  return (
    <Card className="relative flex flex-col justify-between h-full bg-foreground/5 border-none shadow-pxl">
      <CardHeader className="p-4">
        <Link href={`/pages/projects/${project._id}`}>
          <div className="shadow-pxl w-full h-36 rounded-xl flex justify-center items-center overflow-hidden">
            <Image
              src={project.cover}
              alt={project.title}
              width={400}
              height={200}
              className="object-cover w-full"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-grow p-4">
        <div className="flex flex-col">
          <h2 className="flex items-center gap-1 lg:gap-2 font-black text-xl md:text-2xl">
            <HiHashtag className="text-primary" />
            {project.title}
          </h2>
          <q className="text-xs md:text-sm text-wrap line-clamp-4">
            {project.shortDescription}
          </q>
        </div>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-between gap-2 p-4">
        {project.skills && (
          <ul className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <li
                key={skill}
                className="bg-foreground/80 rounded px-1 sm:px-2 text-background text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-2">
          <p className="text-[12px]">{likes}</p>
          <FaHeart
            className={`text-2xl cursor-pointer transition-all transform hover:scale-110 duration-500 ${
              heartState ? "text-primary/80" : "text-primary/20"
            }`}
            onClick={() => onToggleHeart(project._id)}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
