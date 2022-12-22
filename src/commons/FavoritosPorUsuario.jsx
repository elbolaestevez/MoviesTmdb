import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../css/favoritos.css";
const FavoritosPorUsuario = () => {
  const [detailpelicula, setdetailpelicula] = useState([]);
  const useremail = useSelector((state) => state.user.value);
  const params = useParams();
  const email = params.email;
  console.log(email);
  useEffect(() => {
    axios
      .get(`/api/favoritos/${email}`)
      .then((res) => setdetailpelicula(res.data));
  }, []);
  return (
    <div className="abuelofavoritos">
      {detailpelicula.map(
        ({ title, poster_path, release_date, idpeliculaoserie }) => {
          return (
            <div key={idpeliculaoserie} className="cointainerfavoritos">
              <h1>{title}</h1>
              <p>{release_date}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                className="imgfavoritos"
              ></img>
            </div>
          );
        }
      )}
    </div>
  );
};
export default FavoritosPorUsuario;
