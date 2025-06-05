import Music from "@/components/icons/Music";
import Back from "../icons/Back";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export function Music4All({ children, title = "Music 4 All", back }) {
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
    <div className="flex max-w-full h-screen">
      <div className="bg-cyan-800 w-[100px] h-screen flex flex-col justify-start items-center pt-4">
        <Music className="text-white w-10 h-10 mb-10" />
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
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
