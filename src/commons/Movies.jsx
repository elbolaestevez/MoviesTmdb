import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Movies = ({ movies }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "1%" }}>CARS</h2>
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
