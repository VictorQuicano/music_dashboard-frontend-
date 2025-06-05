import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/Home";
import About from "@/pages/About";

import { Index as Music4AllIndex } from "@/pages/music4all/Index";
import { AnimatedPageWrapper } from "./components/layouts/AnimatedPageWrapper";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AnimatedPageWrapper props={{ zoomIn: false }}>
            <Home />
          </AnimatedPageWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <AnimatedPageWrapper props={{ zoomIn: false }}>
            <About />
          </AnimatedPageWrapper>
        }
      />
      <Route
        path="/music_4_all/"
        element={
          <AnimatedPageWrapper props={{ zoomIn: true }}>
            <Music4AllIndex />
          </AnimatedPageWrapper>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
