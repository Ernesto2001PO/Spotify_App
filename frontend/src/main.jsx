import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./style/index.css";

import Admin from "./pages/Admin";
import Artist from "./pages/Artist";
import Albums from "./pages/Albums";
import Genres from "./pages/Genres";

import Navbar from "./components/NavBar";
import FormSong from "./components/admin/FormSong";
import FormAlbum from "./components/admin/FormAlbum";
import FormArtista from "./components/admin/FormArtista";
import FormGenero from "./components/admin/FormGenres";
import Login from "./pages/Login";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/artists/albums/:idArtista" element={<Albums />} />
        <Route path="/genres/artists/:idGenero" element={<Artist />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create-song" element={<FormSong />} />
        <Route path="/admin/edit-song/:id" element={<FormSong />} />
        <Route path="/admin/create-album" element={<FormAlbum />} />
        <Route path="/admin/edit-album/:id" element={<FormAlbum />} />
        <Route path="/admin/create-artista" element={<FormArtista />} />
        <Route path="/admin/edit-artista/:id" element={<FormArtista />} />
        <Route path="/admin/create-genero" element={<FormGenero />} />
        <Route path="/admin/edit-genero/:id" element={<FormGenero />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
