import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/movies.css";

import { useSelector } from "react-redux";
const Movies = ({ movies }) => {
  const hasResults = movies?.length > 0;
  const useremail = useSelector((state) => state.user.value);
  const [state, isFlipped] = useState([false]);

  return (
    <div className={hasResults ? "abuelomovie" : "abuelomovie2"}>
      {movies?.map(({ title, id, poster_path, release_date }) => {
        const addFavoritos = () => {
          axios
            .post("/api/favoritos", {
              idpeliculaoserie: id,
              title: title,
              poster_path: poster_path,
              release_date: release_date,
              email: useremail,
              tipo: 1,
            })
            .then((movie) => {
              // if (!movie) return alert("No estas registrado");
              console.log("movie", movie);

              alert("se ha agregado a favoritos");
            })
            .catch((err) => {
              if (err.response.data == "pelicula o serie existe")
                return alert("pelicula o serie ya existe");
              if (err.response.data == "no esta el token")
                return alert("No has iniciado sesion");
            });
        };
        return (
          <div key={id} className="cointainermovie">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              className="imagen"
            />
            <Link to={`/SearchMovie/${id}`}>
              <h4>{title}</h4>
            </Link>

            <h5>{release_date}</h5>
            <button onClick={addFavoritos}>Agregar Favoritos</button>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
