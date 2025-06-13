import Music from "@/components/icons/Music";
import Back from "../icons/Back";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Tooltip } from "@chakra-ui/react";
import FilterSidebar from "../FilterSideBar";

export function Sensory({
  children,
  title = "Music 4 All",
  back,
  selectedYear,
  setSelectedYear,
  selectedCategories,
  setSelectedCategories,
  selectedLabels,
  setSelectedLabels,
}) {
  const controls = useAnimation();
  const animationRef = useRef(false); // Para controlar el ciclo

  const startAnimation = async () => {
    animationRef.current = true;
    while (animationRef.current) {
      await controls.start({ x: 5 });
      await controls.start({ x: -5 });
      await controls.start({ x: 0 });
    }
  };

  const stopAnimation = () => {
    animationRef.current = false;
  };

  return (
    <div className="flex max-w-full h-auto min-h-0 max-h-none">
      <div className="bg-cyan-800 w-fit max-h-full min-h-screen flex flex-col justify-start items-center pt-4 relative">
        <div className="sticky top-4">
          <Link
            className="hover:cursor-pointer hover:bg-white rounded-lg"
            to="/music_4_all"
          >
            <Tooltip
              content="Menu Principal"
              positioning={{ placement: "right-end" }}
            >
              <Music className="text-white w-10 h-10 mb-10 m-4 hover:text-cyan-600 hover:cursor-pointer" />
            </Tooltip>
          </Link>
          <div className="flex flex-col">
            <FilterSidebar
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />
          </div>
        </div>
      </div>
      <div
        id="container-information"
        className="flex-1 flex flex-col justify-start items-start p-4 relative overflow-x-auto overflow-y-visible max-w-full"
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="max-w-3/4">{title}</h1>

          <div className="flex">
            {back && (
              <Link
                to={back.to}
                className="text-white bg-cyan-700 px-4 py-2 rounded hover:bg-cyan-600 inline-flex items-center"
                onMouseEnter={startAnimation}
                onMouseLeave={stopAnimation}
              >
                <motion.div animate={controls}>
                  <Back className="w-5 h-5 inline-block mr-2" />
                </motion.div>
                {back.label || "Volver"}
              </Link>
            )}
          </div>
        </div>
        <div className="w-full h-full flex flex-col">{children}</div>
      </div>
    </div>
  );
}
