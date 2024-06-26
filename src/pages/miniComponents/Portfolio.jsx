import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { server } from "@/constants/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(`${server}/api/v1/project/getall`, {
        withCredentials: true,
      });
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden mb-[3rem] sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PORTFOLIO
          </span>
        </h1>
        <h1
          className="flex  gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <span className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
            MY WORK
          </span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {viewAll
          ? projects &&
            projects.map((element, i) => {
              return (
                <div key={i} className=" flex flex-col">
                  <Link to={`/project/${element._id}`}>
                    <img
                      className="project-banner-image border-white border-[10px] "
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                    />
                  </Link>
                  <p className="text-white">{element.title}</p>
                </div>
              );
            })
          : projects &&
            projects.slice(0, 9).map((element, i) => {
              return (
                <div key={i} className=" flex flex-col">
                  <Link to={`/project/${element._id}`}>
                    <img
                      className="project-banner-image border-white border-[10px]"
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                    />
                  </Link>
                  <p className="text-white text-center pt-4">{element.title}</p>
                </div>
              );
            })}
      </div>
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
