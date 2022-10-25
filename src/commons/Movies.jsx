import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
const Movies = ({ movies }) => {
  const useremail = useSelector((state) => state.user.value);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "1%" }}>Movies</h2>
      <table style={{ marginLeft: "auto", marginRight: "auto" }}>
        <thead>
          <tr>
            <td>
              <h4 style={{ paddingRight: "40px" }}>Title</h4>
            </td>
            <td>
              <h4 style={{ paddingRight: "40px" }}>Imagen</h4>
            </td>
            <td>
              <h4 style={{ paddingRight: "40px" }}>Año</h4>
            </td>
          </tr>
        </thead>
        <tbody>
          {movies?.map(({ title, id, poster_path, release_date }) => {
            console.log(movies);
            const addFavoritos = () => {
              axios.post("/api/favoritos", {
                idpelicula: id,
                title: title,
                poster_path: poster_path,
                release_date: release_date,
                email: useremail,
              });
              alert("se ha agregado a favoritos");
            };
            return (
              <tr key={id}>
                <td>
                  <Link to={`/SearchMovie/${id}`}>
                    <h4 style={{ paddingRight: "40px" }}>{title}</h4>
                  </Link>
                </td>
                <td>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  ></img>
                </td>
                <td>
                  <h4 style={{ paddingRight: "40px" }}>{release_date}</h4>
                  <button onClick={addFavoritos}>Agregar Favoritos</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
