// components/AnimatedPageWrapper.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const animations = {
  zoomIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.3 } },
  },
  zoomOut: {
    initial: { scale: 1.1, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
    exit: { scale: 1.1, opacity: 0, transition: { duration: 0.3 } },
  },
  slideRightToLeft: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  },
  // Puedes agregar más animaciones aquí...
};

export const AnimatedPageWrapper = ({ children, animation = "zoomIn" }) => {
  // Selecciona la animación basada en el prop (o usa zoomIn por defecto)
  const selectedAnimation = animations[animation] || animations.zoomIn;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedAnimation}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
