import React, { useEffect, useState } from "react";
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
import Users from "../commons/Users";
import FavoritosPorUsuario from "../commons/FavoritosPorUsuario";
import { setUser as setGlobalUser } from "../state/user";
import { useDispatch } from "react-redux";
import Home from "./Home";
import axios from "axios";
import "../css/app.css";

const App = () => {
  const dispatch = useDispatch();
  // const [user, setuser] = useState("");
  // useEffect(() => {
  //   let userglocal = JSON.parse(window.localStorage.getItem("user"));
  //   console.log(userglocal);
  // }, []);

  useEffect(() => {
    axios.get("/api/users/me").then((user) => {
      dispatch(setGlobalUser(user.data.email));
    });
  }, []);

  return (
    <div className="app">
      <Navbar />
      {/* {console.log(user)} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SearchMovie" element={<SearchMovie />} />
        <Route path="/SearchTvshow" element={<SearchTvShow />} />
        <Route element={<DetailsMovie />} path="/SearchMovie/:id" />
        <Route element={<DetailsTvShow />} path="/SearchTvshow/:id" />
        <Route
          element={<FavoritosPorUsuario />}
          path="/FavoritosPorUsuario/:email"
        />
        <Route element={<TopMovies />} path="/Toppeliculas" />
        <Route element={<Register />} path="/Registro" />
        <Route element={<Login />} path="/Loguiar" />
        <Route element={<Favoritos />} path="/Favoritos" />
        <Route element={<Users />} path="/Usuarios" />
      </Routes>
    </div>
  );
};

export default App;
