"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import TypingEffect from "./TypeWriter";
import RatingStars from "./RatingStars";
import { Separator } from "./Separator";

export function ExperienceListCards() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100] mt-10 mb-2">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[800px] md:max-w-[70%] sm:max-w-[60%] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="flex flex-row m-3"
              >
                <TypingEffect
                  text={`SELECT * FROM vincent.career WHERE date BETWEEN <strong><span style="color: #cbacf9;">'${active.experienceStartDate}'</span></strong> AND <strong><span style="color: #cbacf9;">'${active.experienceEndDate}'</span></strong>;`}
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start pt-1 pl-3 mb-1">
                  <div>
                    <div className="flex flex-row justify-between gap-5 items-start">
                      <Image
                        priority
                        width={200}
                        height={200}
                        src={active.src}
                        alt={active.title}
                        className="w-10 h-10 rounded-full object-cover object-top"
                      />
                      <motion.div>
                        <motion.div className="flex flex-row gap-5 items-center">
                          <motion.h3
                            layoutId={`title-${active.title}-${id}`}
                            className="font-bold text-neutral-700 dark:text-neutral-200"
                          >
                            {active.title}
                          </motion.h3>
                          <motion.p className="text-neutral-200 text-sm italic">
                            {active.experienceStartDate} -{" "}
                            {active.experienceEndDate}
                          </motion.p>
                        </motion.div>
                        <motion.p
                          layoutId={`description-${active.description}-${id}`}
                          className="text-neutral-600 dark:text-neutral-300"
                        >
                          {active.description}
                        </motion.p>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="mx-3">
                  <Separator />
                </div>
                <div className="pt-4 relative px-4 flex flex-row gap-2 h-full">
                  <ul className="flex flex-col max-w-2xl mx-auto h-full bg-black-300 p-1.5 mr-2 rounded-lg gap-1 mb-2">
                    {active.stack.map((techno, index) => (
                      <div key={index} className="flex flex-row gap-2 max-w-64">
                        <span className="w-full text-xs md:text-sm lg:text-base">
                          {techno.name}
                        </span>
                        <RatingStars rating={techno.rating} />
                      </div>
                    ))}
                  </ul>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400  [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] w-full"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row items-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-30 w-30 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const currentDate = new Date().toISOString().split("T")[0];
const cards = [
  {
    description: "Orange Business",
    title: "Data Engineer (Ops)",
    src: "./ob.png",
    experienceStartDate: "2024-09-01",
    experienceEndDate: currentDate,
    stack: [
      { name: "GCP", rating: 4 },
      { name: "Python", rating: 4 },
      { name: "SQL", rating: 5 },
      { name: "Bigquery", rating: 4 },
      { name: "Terraform", rating: 3 },
    ],
    ctaText: "Details",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <ul className="w-full space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Developing <span className="text-purple font-semibold">GCP</span>{" "}
            cloud based data platform
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Designing data warehouse, lake & marts pipelines
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Designing analytical and operational data models to meet business
            needs
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Developing and maintaining{" "}
            <span className="text-purple font-semibold">scalable</span> data
            architectures (
            <span className="text-purple font-semibold">Terraform</span>,{" "}
            <span className="text-purple font-semibold">CI/CD</span>)
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Implementing data governance practices to ensure data quality,
            security, and compliance
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Developing{" "}
            <span className="text-purple font-semibold">BigData</span>{" "}
            optimization & finOps solutions
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Applying <span className="text-purple font-semibold">DataOps</span>{" "}
            methodologies to accelerate data delivery
          </li>
        </ul>
      );
    },
  },
  {
    description: "Golden Palace",
    title: "Azure Data Engineer",
    src: "./gp.png",
    experienceStartDate: "2023-04",
    experienceEndDate: "2024-09",
    stack: [
      { name: "Databricks", rating: 4 },
      { name: "Python", rating: 4 },
      { name: "SQL", rating: 5 },
      { name: "Azure", rating: 4 },
      { name: "PowerBI", rating: 3 },
      { name: "Network", rating: 3 },
    ],
    ctaText: "Details",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <ul className="w-full space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Creating a cloud based{" "}
            <span className="text-purple font-semibold">
              Modern Data Platform
            </span>
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Developing a{" "}
            <span className="text-purple font-semibold">Data Lakehouse</span>{" "}
            using <span className="text-purple font-semibold">Azure</span> cloud
            tools (<span className="text-purple font-semibold">Databricks</span>
            , <span className="text-purple font-semibold">DataFactory</span>,
            Storage Account)
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Designing performant data models to enable Data Analytics and BI
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Owning and maintaining ELT data pipelines
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Managing computing frameworks (
            <span className="text-purple font-semibold">Python spark</span>, SQL
            Warehouse, Databricks clusters)
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Enabling both analytics and operational applications (CRM tool,
            PowerBI)
          </li>
        </ul>
      );
    },
  },

  {
    description: "Isalys",
    title: "Data Engineer",
    src: "./isalys.png",
    experienceStartDate: "2022-02",
    experienceEndDate: "2023-04",
    stack: [
      { name: "SQL", rating: 4 },
      { name: "Python", rating: 4 },
      { name: "Docker", rating: 3 },
      { name: "Kubernetes", rating: 3 },
      { name: "Kafka", rating: 3 },
      { name: "AWS", rating: 3 },
      { name: "Snowflake", rating: 4 },
    ],
    ctaText: "Details",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <ul className="w-full space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Implementing on premise data pipelines
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Automating the creation and data loading of a data warehouse
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Deploying cloud solutions (AWS, snowflake)
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Developing and deploying modularized components (
            <span className="text-purple font-semibold">Kubernetes</span>,{" "}
            <span className="text-purple font-semibold">Docker</span>)
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Creating a monitoring/alerting tool to keep track of data flows
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Developing real time (time series) data solutions (
            <span className="text-purple font-semibold">KAFKA</span>,{" "}
            <span className="text-purple font-semibold">Redshift</span>)
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Enabling real time analytics (Tableau, Graphana)
          </li>
        </ul>
      );
    },
  },
  {
    description: "Safran Aircraft Engines",
    title: "Data Scientist (internship)",
    src: "./safran.png",
    experienceStartDate: "2021-04",
    experienceEndDate: "2021-10",
    stack: [
      { name: "Python", rating: 4 },
      { name: "SQL", rating: 5 },
      { name: "Tensorflow", rating: 3 },
      { name: "Pandas", rating: 4 },
      { name: "IA", rating: 3 },
    ],
    ctaText: "Details",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <ul className="w-full space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            R&D engineer in{" "}
            <span className="text-purple font-semibold">data science</span>,
            artificial intelligence developer
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Developing end to end{" "}
            <span className="text-purple font-semibold">Deep Learning</span>{" "}
            solution (automatic detection of surface defects on aricraft turbo
            reactors, Image Processing)
          </li>
          <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
            Deploying, communicating and outreaching of the new technology
          </li>
        </ul>
      );
    },
  },
];
