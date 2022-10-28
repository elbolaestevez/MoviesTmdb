import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "../css/movies.css";

const TvShow = ({ tvshow }) => {
  const useremail = useSelector((state) => state.user.value);

  return (
    <div className="abuelomovie">
      {tvshow?.map(({ name, id, poster_path, first_air_date }) => {
        const addFavoritos = () => {
          axios
            .post("/api/favoritos", {
              idpeliculaoserie: id,
              title: name,
              poster_path: poster_path,
              release_date: first_air_date,
              email: useremail,
              tipo: 2,
            })
            .then((movie) => {
              // if (!movie) return alert("No estas registrado");
              console.log("movie", movie);

              alert("se ha agregado a favoritos");
            })
            .catch((err) => {
              if (err.response.data == "pelicula o serie existe")
                return alert("pelicula o series ya existe");
              if (err.response.data == "no esta el token")
                return alert("No hay token");
            });
        };

        return (
          <div key={id} className="cointainermovie">
            <Link to={`/SearchTvshow/${id}`}>
              <h4>{name}</h4>
            </Link>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              className="imagen"
            ></img>
            <h4>{first_air_date}</h4>

            <button onClick={addFavoritos}>Agregar Favoritos</button>
          </div>
        );
      })}
    </div>
  );
};
export default TvShow;
