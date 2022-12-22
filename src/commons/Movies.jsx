import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/movies.css";

import { useSelector } from "react-redux";
const Movies = ({ data }) => {
  const hasResults = data?.length > 0;
  const useremail = useSelector((state) => state.user.value);
  const [state, isFlipped] = useState([false]);

  return (
    <div className={hasResults ? "abuelomovie" : "abuelomovie2"}>
      {data?.map((item) => {
        let itemdata = {
          title: item.title || item.name,
          id: item.id,
          poster_path: item.poster_path,
          release_date: item.release_date || item.first_air_date,
          tipo: item.title ? 1 : 2,
        };
        // { title, id, poster_path, release_date }
        const addFavoritos = () => {
          axios
            .post("/api/favoritos", {
              idpeliculaoserie: itemdata.id,
              title: itemdata.title,
              poster_path: itemdata.poster_path,
              release_date: itemdata.release_date,
              email: useremail,
              tipo: itemdata.tipo,
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
          <div key={itemdata.id} className="cointainermovie">
            <img
              src={`https://image.tmdb.org/t/p/w500${itemdata.poster_path}`}
              className="imagen"
            />
            <Link to={`/SearchMovie/${itemdata.id}`}>
              <h4>{itemdata.title}</h4>
            </Link>

            <h5>{itemdata.release_date}</h5>
            <button onClick={addFavoritos}>Agregar Favoritos</button>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
