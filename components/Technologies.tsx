import React from "react";

const Technologies = () => {
  return (
    <div id="technologies" className="mt-5">
      <h1 className="heading mb-12">
        My <span className="text-purple">Tech Stack</span>
      </h1>
      <div className="flex justify-center">
        <div className="w-[60vw]">
          <ul className="grid grid-cols-3 sm:grid-cols-9 place-items-center gap-1">
            {technologies.map((tech) => (
              <li key={tech.name} className="flex items-center justify-center">
                <div className="relative group">
                  <img
                    className={`w-12 h-12 -z-10 max-sm:animate-none animate-[float_2s_ease-in-out_infinite] rounded-md border-gray-400 border-2 border-opacity-30 
                    ${tech.id % 2 === 0 ? "delay-0" : "delay-1000"}`}
                    src={tech.icon}
                    alt={tech.name}
                  />
                  <span
                    className="absolute left-full top-1/2 ml-2 w-max -translate-y-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100
             sm:left-1/2 sm:bottom-full sm:mb-3 sm:-translate-x-1/2 sm:translate-y-0 sm:top-auto sm:ml-0 z-50"
                  >
                    {tech.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

const technologies = [
  { id: 1, name: "Azure", icon: "./Azure.png" },
  { id: 2, name: "Databricks", icon: "./databricks.png" },
  { id: 3, name: "GCP", icon: "./GCP.png" },
  { id: 4, name: "Python", icon: "./python.png" },
  { id: 5, name: "SQL", icon: "./SQL.png" },
  { id: 6, name: "GIT", icon: "./GIT.png" },
  { id: 7, name: "terraform", icon: "./terraform.png" },
  { id: 8, name: "docker", icon: "./docker.png" },
  { id: 9, name: "kubernetes", icon: "./kubernetes.png" },
];

export default Technologies;
