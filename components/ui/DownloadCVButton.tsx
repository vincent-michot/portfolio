import React from "react";
import MagicButton from "../MagicButton";
import { IoDownloadOutline } from "react-icons/io5";

const DownloadCVButton = () => {
  return (
    <>
      <a href="./cv_vincent_michot.pdf" download>
        <MagicButton
          title="Download My CV"
          icon={<IoDownloadOutline size={20} className="relative -top-0.5" />}
          position="right"
          handleClick={() => {}}
          otherClasses="!bg-[#161A31]"
        />
      </a>
    </>
  );
};

export default DownloadCVButton;
