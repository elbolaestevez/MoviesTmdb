import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser as setGlobalUser } from "../state/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "../css/navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useremail = useSelector((state) => state.user.value);

  const Desloguiar = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/logout")

      .then((usuario) => {
        alert("Te has desloguiado");
        dispatch(setGlobalUser({}));
        window.localStorage.removeItem("user");
      });
    navigate("/");
  };

  return (
    <nav className="containernav">
      <Link to="/">Home</Link>

      <div>
        <Link to="/SearchMovie">Buscar Pelicula</Link>
      </div>
      <div>
        <Link to="/SearchTvShow">Buscar TvShow</Link>
      </div>
      <div>
        <Link to="/Toppeliculas">Top Peliculas</Link>
      </div>
      <div>
        <Link to="/Registro"> Registro Usuario/Login</Link>
      </div>

      <div>
        <Link to="/Favoritos">Favoritos</Link>
      </div>
      <div>
        <Link to="/Usuarios">Usuarios</Link>
      </div>
      {/* {useremail != null ? <h2>logueado</h2> : <h2>deslogueado</h2>} */}

      {typeof useremail !== "object" && (
        <div className="desloguiar">
          <p>{useremail}</p>
          <button onClick={Desloguiar} type="submit">
            Desloguiar
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
