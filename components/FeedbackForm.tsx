"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { IoCreateOutline } from "react-icons/io5";

export function FeedbackForm() {
  const [active, setActive] = useState<typeof form | boolean | null>(null);
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
              layoutId={`form-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[800px] md:max-w-[70%] sm:max-w-[60%] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div
                layoutId={`icon-${active.title}-${id}`}
                className="flex flex-row m-3"
              >
                <IoCreateOutline size={40} className="relative -top-0.5" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start pt-1 pl-3">
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
                <div className="pt-4 relative px-4 flex flex-row gap-2 h-full">
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

      <motion.button
        layoutId={`form-${form.title}-${id}`}
        key={`form-${form.title}-${id}`}
        onClick={() => setActive(form)}
        className="p-4 flex flex-row md:flex-row justify-between items-center bg-black-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full cursor-pointer h-12 w-full md:w-60"
      >
        <span>Leave a feedback</span>
        <motion.div
          layoutId={`icon-${form.title}-${id}`}
          className="flex flex-row m-3"
        >
          <IoCreateOutline size={40} className="relative -top-0.5" />
        </motion.div>
      </motion.button>
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
const form = {
  description: "Orange Business",
  title: "Leave a feedback",
  src: "/ob.png",
  experienceStartDate: "2024-09-01",
  experienceEndDate: currentDate,
  stack: [
    { name: "Databricks", rating: 4 },
    { name: "Python", rating: 4 },
    { name: "SQL", rating: 5 },
  ],
  ctaText: "Details",
  ctaLink: "https://ui.aceternity.com/templates",
  content: () => {
    return (
      <ul className="w-full space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
          At least 10 characters (and up to 100 characters) eeiyfgse esufobesob
          eoqub a a a a feqoihepfi qzpifhqzpi qzifhzqpif qzpifjpqzif
          pqzijfpiqzhp qzpojfpqijzf poqzjfpzqoj
        </li>
        <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
          At least one lowercase character
        </li>
        <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
          Inclusion of at least one special character, e.g., ! @ # ?
        </li>
        <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
          Inclusion of at least one special character, e.g., ! @ # ?
        </li>
        <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
          Inclusion of at least one special character, e.g., ! @ # ?
        </li>
        <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
          Inclusion of at least one special character, e.g., ! @ # ?
        </li>
        <li style={{ textIndent: "-1em", paddingLeft: "1.5em" }}>
          Inclusion of at least one special character, e.g., ! @ # ?
        </li>
      </ul>
    );
  },
};
