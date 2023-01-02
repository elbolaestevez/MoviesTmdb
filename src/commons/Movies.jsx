import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/movies.css";
import Swal from "sweetalert2";

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
          vote_average: item.vote_average,
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
              vote_average: itemdata.vote_average,
              email: useremail,
              tipo: itemdata.tipo,
            })
            .then((movie) => {
              Swal.fire({
                icon: "success",
                title: "Yes",
                text: "Se ha agregado a favoritos",
              });
            })
            .catch((err) => {
              console.log(err);
              if (err.response.data == "pelicula o serie existe")
                return Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Pelicula o serie ya esta en tus favoritos",
                });
              if (err.response.data == "no esta el token")
                return Swal.fire({
                  icon: "info",
                  title: "Oops...",
                  text: "No has iniciado sesión",
                });
            });
        };
        return (
          <div key={itemdata.id} className="cointainermovie">
            <img
              src={`https://image.tmdb.org/t/p/w500${itemdata.poster_path}`}
              className="imagen"
            />
            {itemdata.tipo == 1 ? (
              <Link to={`/SearchMovie/${itemdata.id}`}>
                <h4>{itemdata.title}</h4>
              </Link>
            ) : (
              <Link to={`/SearchTvShow/${itemdata.id}`}>
                <h4>{itemdata.title}</h4>
              </Link>
            )}

            <h5>{itemdata.vote_average}pts</h5>
            <button onClick={addFavoritos}>Agregar Favoritos</button>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
