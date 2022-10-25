import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
const Favoritos = () => {
  const [detailpelicula, setdetailpelicula] = useState([]);
  const useremail = useSelector((state) => state.user.value);

  useEffect(() => {
    axios
      .get(`/api/favoritos/${useremail}`)
      .then((res) => setdetailpelicula(res.data));
  }, []);
  return (
    <>
      {detailpelicula.map(
        ({ title, poster_path, release_date, idpelicula }) => {
          return (
            <div className="detailcs">
              <h1>{title}</h1>
              <p>{release_date}</p>
              <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}></img>
            </div>
          );
        }
      )}
    </>
  );
};
export default Favoritos;
