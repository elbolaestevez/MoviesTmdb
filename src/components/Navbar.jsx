import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const Desloguiar = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/logout")

      .then((usuario) => {
        alert("Te has desloguiado");
      });
    navigate("/");
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      <div>
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
          <Link to="/Registro"> Registro Usuario</Link>
        </div>
        <div>
          <Link to="/Loguiar">Loguiar Usuario</Link>
        </div>
        <div>
          <Link to="/Favoritos">Favoritos</Link>
        </div>
        <div>
          <button onClick={Desloguiar} type="submit">
            Desloguiar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
