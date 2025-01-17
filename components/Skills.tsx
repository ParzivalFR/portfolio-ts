"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  FaCheck,
  // FaGitAlt,
  FaGithub,
  // FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
// import { IoLogoCss3 } from "react-icons/io";

import {
  // RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiMongodb } from "react-icons/si";

const Skills = () => {
  const skills = [
    // { icon: FaHtml5, name: "HTML", value: "Intermédiaire" },
    // { icon: IoLogoCss3, name: "CSS", value: "Intermédiaire" },
    // { icon: RiJavascriptFill, name: "Javascript", value: "Débutant" },
    { icon: RiTailwindCssFill, name: "Tailwind", value: "Débutant" },
    { icon: FaReact, name: "React", value: "Débutant" },
    { icon: RiNextjsFill, name: "Nextjs", value: "Débutant" },
    { icon: FaNodeJs, name: "Nodejs", value: "Débutant" },
    // { icon: FaSass, name: "SASS", value: "Intermédiaire" },
    { icon: SiMongodb, name: "Mongodb", value: "Intermédiaire" },
    { icon: FaGithub, name: "Github", value: "Intermédiaire" },
    // { icon: FaGitAlt, name: "Git", value: "Intermédiaire" },
  ];

  return (
    <TooltipProvider>
      <section id="skills" className="w-full p-2 sm:p-0 sm:w-4/5 m-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 p-5 m-auto bg-foreground/5 rounded-lg sm:p-10 shadow-pxl">
          {skills.map((skill, index) => (
            <Tooltip key={index}>
              <TooltipTrigger className="cursor-default">
                <div className="flex justify-center items-center">
                  <div className="flex flex-col items-center gap-2 p-4 md:p-10 w-2/3 hover:bg-primary/10 rounded-lg transition-colors duration-500 ease-in-out">
                    <skill.icon className="size-12" />
                    <Badge className={"text-white text-[10px] sm:text-xs"}>
                      {skill.name}
                    </Badge>
                    <Badge
                      className={
                        "flex bg-foreground text-background text-[10px] md:text-xs"
                      }
                    >
                      {skill.value}
                    </Badge>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-primary/80">
                <p className="flex gap-1 items-center">
                  <FaCheck />
                  {skill.value}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Skills;
