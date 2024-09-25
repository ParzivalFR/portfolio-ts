"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgress } from "@mui/material";
import { confetti } from "@tsparticles/confetti";
import ky from "ky";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import ProjectCard from "./ProjectCard";
import Spacing from "./Spacing";
import { Button } from "./ui/button";

// Define the Project type
export interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  cover: string;
  timestamp: string;
  skills?: string[];
}

const Projects: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [heartStates, setHeartStates] = useState<Record<string, boolean>>({});
  const [userIp, setUserIp] = useState<string>("");
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [showProjects, setShowProjects] = useState<number>(3);
  const [selectedTab, setSelectedTab] = useState<"descending" | "ascending">(
    "descending"
  );

  useEffect(() => {
    const localUserIp = localStorage.getItem("userIp") || uuidv4();
    setUserIp(localUserIp);
    localStorage.setItem("userIp", localUserIp);

    const fetchData = async () => {
      try {
        const response = await ky.get(`${process.env.HOST}/api/projects`);
        const data: Project[] = await response.json();

        // Sort by timestamp initially
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setFetchedData(sortedData);

        // Fetch likes for each project
        const likesData = await Promise.all(
          data.map(async (project) => {
            const response = await ky.get(
              `${process.env.HOST}/api/likes/${project._id}`
            );
            const likes: number[] = await response.json();
            return { id: project._id, count: likes.length };
          })
        );

        const likesObj = likesData.reduce(
          (acc, { id, count }) => ({ ...acc, [id]: count }),
          {}
        );
        setLikes(likesObj);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleColor = async (id: string) => {
    const newHeartState = !heartStates[id];
    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [id]: newHeartState,
    }));

    try {
      const method = newHeartState ? "POST" : "DELETE";
      const likeEndpoint = `${process.env.HOST}/api/likes/${id}`;

      await ky(likeEndpoint, {
        method,
        json: { userIp, postId: id },
      });

      if (newHeartState) {
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      const response = await ky.get(`${process.env.HOST}/api/likes/${id}`);
      const data: number[] = await response.json();
      setLikes((prevLikes) => ({ ...prevLikes, [id]: data.length }));
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleShowMoreProjects = () => {
    setShowProjects((prevShowMoreProjects) => prevShowMoreProjects + 2);
  };

  const handleShowHideProjects = () => {
    setShowProjects(3);
  };

  const handleSort = (tab: "ascending" | "descending") => {
    if (selectedTab === tab) return; // No need to sort again if already selected

    setSelectedTab(tab);

    setFetchedData((prevFetchedData) => {
      const sortedData = prevFetchedData.sort((a, b) => {
        return tab === "descending"
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
      return [...sortedData]; // Return a new array to trigger re-render
    });
  };

  return (
    <section id="projects">
      <Tabs
        defaultValue="descending"
        className="w-full flex flex-col justify-center items-center gap-8"
      >
        <TabsList>
          <TabsTrigger
            value="descending"
            onClick={() => handleSort("descending")}
          >
            Le plus récent
          </TabsTrigger>
          <TabsTrigger
            value="ascending"
            onClick={() => handleSort("ascending")}
          >
            Le plus ancien
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          {isLoading ? (
            <div className="size-full m-auto flex justify-center items-center">
              <CircularProgress
                color="secondary"
                className="m-auto"
                size={100}
              />
            </div>
          ) : error ? (
            <div className="w-full flex justify-center items-center">
              <Alert variant="destructive" className="min-w-[300px] m-auto ">
                <RiErrorWarningFill className="text-2xl md:text-xl" />
                <AlertTitle className="font-bold text-xs underline md:text-base">
                  Erreur
                </AlertTitle>
                <AlertDescription className="text-[10px] leading-tight md:text-sm">
                  Une erreur s'est produite lors du chargement des projets.
                  Veuillez contacter l'
                  <Link href="#contact" className="text-red-500">
                    administrateur{" "}
                  </Link>
                  du site.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-10 w-4/5 m-auto">
              {fetchedData.slice(0, showProjects).map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  heartState={heartStates[project._id]}
                  likes={likes[project._id]}
                  onToggleHeart={toggleColor}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Spacing size={20} />
      <div className="flex flex-col justify-center items-center">
        {showProjects < fetchedData.length ? (
          <>
            <p className="text-xs text-center text-green-500">
              Il reste {fetchedData.length - showProjects} projets à découvrir.
            </p>
            <Button
              onClick={handleShowMoreProjects}
              className="w-[250px] bg-primary text-white font-bold p-2 rounded-lg shadow-pxl hover:bg-primary/80 transition-all duration-500"
            >
              Voir plus
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs text-center text-red-500">
              Vous avez découvert tous les projets.
            </p>
            <Button
              onClick={handleShowHideProjects}
              className="w-[250px] bg-primary text-white font-bold p-2 rounded-lg shadow-pxl hover:bg-primary/80 transition-all duration-500"
            >
              Voir moins
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
