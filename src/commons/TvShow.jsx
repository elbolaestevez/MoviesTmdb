import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const TvShow = ({ tvshow }) => {
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
          {tvshow?.map(({ name, id, poster_path, first_air_date }) => {
            console.log(tvshow);
            return (
              <tr key={id}>
                <td>
                  <Link to={`/SearchTvshow/${id}`}>
                    <h4 style={{ paddingRight: "40px" }}>{name}</h4>
                  </Link>
                </td>
                <td>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  ></img>
                </td>
                <td>
                  <h4 style={{ paddingRight: "40px" }}>{first_air_date}</h4>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TvShow;
