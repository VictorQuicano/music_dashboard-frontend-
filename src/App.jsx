import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/Home";
import About from "@/pages/About";

import { Index as Music4AllIndex } from "@/pages/music4all/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music_4_all/" element={<Music4AllIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
