import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Users from "@/pages/music4all/Users";

import { Index as Music4AllIndex } from "@/pages/music4all/Index";
import { Search as Music4AllSearch } from "@/pages/music4all/Search";
import { AnimatedPageWrapper } from "./components/layouts/AnimatedPageWrapper";

import { Index as MusicExtrasensoryIndex } from "@/pages/music_extrasensory/Index";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AnimatedPageWrapper animation="zoomOut">
            <Home />
          </AnimatedPageWrapper>
        }
      />
      <Route
        path="/extrasensory"
        element={
          <AnimatedPageWrapper animation="zoomOut">
            <Users />
          </AnimatedPageWrapper>
        }
      />
      <Route
        path="/music_4_all"
        element={
          <AnimatedPageWrapper>
            <Music4AllIndex />
          </AnimatedPageWrapper>
        }
      />
      <Route
        path="/music_4_all/search"
        element={
          <AnimatedPageWrapper animation="slideRightToLeft">
            <Music4AllSearch />
          </AnimatedPageWrapper>
        }
      />
      <Route
        path="/music_extrasensory"
        element={
          <AnimatedPageWrapper animation="slideRightToLeft">
            <MusicExtrasensoryIndex />
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
