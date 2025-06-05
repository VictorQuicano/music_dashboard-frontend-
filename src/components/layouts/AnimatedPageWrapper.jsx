// components/AnimatedPageWrapper.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const zoomIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.3 } },
};

const zoomOut = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  exit: { scale: 1.1, opacity: 0, transition: { duration: 0.3 } },
};

export const AnimatedPageWrapper = ({ children, props }) => {
  const isMusicRoute = props?.zoomIn || false; // Check if zoomIn prop is passed

  const variants = isMusicRoute ? zoomIn : zoomOut;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
