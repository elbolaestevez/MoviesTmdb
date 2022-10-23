import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <div>
        <div>
          <Link to="/SearchMovie">Buscar Pelicula</Link>
        </div>
        <div>
          <Link to="/Toppeliculas">Top Peliculas</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
