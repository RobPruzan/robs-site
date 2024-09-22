import { Calendar, Github, Linkedin, School } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <span className="text-4xl w-full flex justify-start">Robby Pruzan</span>
      <div className="w-full flex flex-col gap-y-2 justify-center">
        <div className="flex items-end text-sm gap-x-3">
          <School className="text-blue-600" />
          University at Buffalo
        </div>
        <div className="flex text-sm gap-x-3 items-center">
          <Link
            className="flex items-center gap-x-2"
            href="https://github.com/RobPruzan"
          >
            <Github className="text-blue-600" />
            <span className="h-fit">https://github.com/RobPruzan</span>
          </Link>
        </div>
        <div className="flex items-center text-sm gap-x-3">
          <Link
            className="flex items-center gap-x-2"
            href="https://linkedin.com/in/robert-pruzan"
          >
            <Linkedin className="text-blue-600" size={24} />
            <span> https://linkedin.com/in/robert-pruzan</span>
          </Link>{" "}
        </div>
        <div className="flex items-end text-sm gap-x-3">
          <Calendar className="text-blue-600" />
          <span>Age: 20</span>
        </div>
      </div>

      <span>
        This website serves as a log of things i've learned and built overtime.
        Check out the
        <Link className="text-blue-500 underline mx-2" href={"/blog"}>
          blog
        </Link>
        to see what I've written so far.
      </span>
      <span>
        Most recently, I've been interested in UI framework internals and real
        time technologies <span className="text-yellow-500 text-2xl ">⚡</span>
      </span>
      <span className="text-xl w-full text-start">Projects</span>
      <div className="flex w-full justify-start">
        <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 gap-4">
          <ProjectCard
            description="React implemented from scratch with 0 dependencies"
            href="https://github.com/RobPruzan/react-scratch"
            title="React from scratch"
          />
          <ProjectCard
            description="A realtime question board, supporting P2P audio streaming, live transcription and multiplayer infinite whiteboards"
            href="https://fireside.ninja"
            title="Fireside"
          />
          <ProjectCard
            description="A memory diagram quiz app for students to represent the memory of a program over its lifecycle"
            href="https://tracing.cse.buffalo.edu"
            title="UB Power"
          />
          <ProjectCard
            description="An infinite canvas to create graphs, and then execute any algorithm on them to create a realtime visualization of its execution"
            href="https://algoviz.app"
            title="AlgoViz"
          />
          <ProjectCard
            description="Leveraging text embedding models to quantify literacy and generate recommendations for improvement"
            href="https://github.com/RobPruzan/-automaticlitassesment"
            title="NorthStar"
          />
        </div>
      </div>

      <span className="text-xl w-full text-start">Experience</span>
      <div className="w-full flex flex-wrap gap-2">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          <TimelineItem
            date="Sep 2024 – Present"
            title="Software Engineer at Million.js"
            description="React tooling to make websites faster"
          />
          <TimelineItem
            date="June 2024 – Aug 2024"
            title="Software Engineering Intern at Walmart"
            description="Core iOS app development for Walmart Pay on the Walmart app"
          />
          <TimelineItem
            date="Feb 2024 – May 2024"
            title="Software Engineering Intern at LanzaTech"
            description="Features to improve data collection quality in our data labelling react-app. On the way worked on a lot of performance related improvements"
          />
          <TimelineItem
            date="May 2023 – Aug 2023"
            title="Computer Science Intern at Freddie Mac"
            description="Worked on a jenkins pipeline for automated deployments of a kubernetes based microservice"
          />
          <TimelineItem
            date="Sep 2023 – Present"
            title="Software Engineer at University at Buffalo"
            description="One of two core engineers on a code-tracing quiz-taking web app used by over 1000 students each semester at the University at Buffalo."
          />
          <TimelineItem
            date="Sep 2023 – Dec 2023"
            title="Software Engineering Intern at LanzaTech"
            description="Worked on automatically scoring human label outputs against model outputs. This required a full stack effort in-order to get the scores back to the humans in a meaningful way"
          />
          {/* <TimelineItem
            date="Sep 2023 – Present"
            title="Teaching Assistant at University at Buffalo"
            description="Assisted in teaching courses including CSE 312 Web Applications, CSE 250 Data Structures, CSE 116 (x2) Intro to Programming II, and CSE 115 Intro to Programming I."
          /> */}
          <TimelineItem
            date="Sep 2022 – May 2023"
            title="Software Engineering Intern at LanzaTech"
            description="Core feature development on a react + django website for collecting human labels for a ML pipeline"
          />
          <TimelineItem
            date="Feb 2022 – May 2023"
            title="Research Assistant at XLAB"
            description="Worked on developing and deploying a transformer-based pipeline to identify poor vocabulary diversity and recommend replacement words & performed research on point cloud transformer classification models for autonomous vehicles"
          />
        </ol>
      </div>
    </>
  );
}

const ProjectCard = ({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) => (
  <Link
    href={href}
    className="rounded-md border-2 p-3 h-52 w-52  flex gap-y-2 flex-col"
  >
    <div className=" flex items-center text-lg underline underline-offset-2">
      {title}
    </div>
    <div className="w-full h-4/5 text-sm text-muted-foreground">
      {description}
    </div>
  </Link>
);

const TimelineItem = ({
  date,
  description,
  title,
}: {
  date: string;
  title: string;
  description: string;
}) => {
  return (
    <li className="ms-4">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {date}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </li>
  );
};
