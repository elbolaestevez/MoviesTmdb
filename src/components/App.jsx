import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SearchMovie from "./SearchMovie";
import Navbar from "./Navbar";
import DetailsMovie from "../commons/DetailsMovie";
import DetailsTvShow from "../commons/DetailsTvShow";
import TopMovies from "../commons/TopMovies";
import Register from "./Register";
import Login from "./Login";
import SearchTvShow from "./SearchTvShow";
import Favoritos from "../commons/Favoritos";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<h1 style={{ textAlign: "center", marginTop: "10%" }}></h1>}
        />
        <Route path="/SearchMovie" element={<SearchMovie />} />
        <Route path="/SearchTvshow" element={<SearchTvShow />} />
        <Route element={<DetailsMovie />} path="/SearchMovie/:id" />
        <Route element={<DetailsTvShow />} path="/SearchTvshow/:id" />
        <Route element={<TopMovies />} path="/Toppeliculas" />
        <Route element={<Register />} path="/Registro" />
        <Route element={<Login />} path="/Loguiar" />
        <Route element={<Favoritos />} path="/Favoritos" />
      </Routes>
    </div>
  );
};

export default App;
