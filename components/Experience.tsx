import React from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import { ExperienceListCards } from "./ui/ExpandableCard";

const Experience = () => {
  return (
    <div className="pb-20 w-full" id="experience">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-12 ">
        <div className="border border-white/[0.1] rounded-3xl bg-[#161A31] bg-opacity-20 py-5">
          <ExperienceListCards />
        </div>
      </div>
    </div>
  );
};

export default Experience;
