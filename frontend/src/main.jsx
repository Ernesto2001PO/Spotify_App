import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./style/index.css";

import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Artist from "./pages/Artist";
import Albums from "./pages/Albums";
import Genres from "./pages/Genres";

import Navbar from "./components/NavBar";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album" element={<Albums />} />
        <Route path="/genres/:id" element={<Artist />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/genres" element={<Genres />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
