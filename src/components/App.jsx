import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SearchMovie from "./SearchMovie";
import Navbar from "./Navbar";
import DetailsMovie from "../commons/DetailsMovie";
import TopMovies from "../commons/TopMovies";

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
        <Route element={<DetailsMovie />} path="/SearchMovie/:id" />
        <Route element={<TopMovies />} path="/Toppeliculas" />
      </Routes>
    </div>
  );
};

export default App;
