import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/favoritos.css";
import { useSelector } from "react-redux";
const Favoritos = () => {
  const [detailpelicula, setdetailpelicula] = useState([]);
  const useremail = useSelector((state) => state.user.value);
  const removeFavoritos = (idpelicula) => {
    let unico = idpelicula + useremail;
    console.log(unico);
    axios.delete(`/api/favoritos/${unico}`).then((removido) => {
      let detailpeliculaborrado = detailpelicula.filter(
        (fav) => fav.idpelicula !== idpelicula
      );
      console.log(detailpeliculaborrado);
      //   setdetailpelicula(detailpelicula);
    });

    // });
  };
  useEffect(() => {
    axios
      .get(`/api/favoritos/${useremail}`)
      .then((res) => setdetailpelicula(res.data));
  }, [detailpelicula]);
  return (
    <div className="abuelofavoritos">
      {detailpelicula.map(
        (
          {
            title,
            poster_path,
            release_date,
            idpeliculaoserie,
            tipo,
            backdrop_path,
          },
          i
        ) => {
          return (
            <div
              className="cointainerfavoritos"
              key={i}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
              }}
            >
              {tipo == 1 ? (
                <Link to={`/SearchMovie/${idpeliculaoserie}`}>
                  <h1>{title}</h1>
                </Link>
              ) : (
                <Link to={`/SearchTvShow/${idpeliculaoserie}`}>
                  <h1>{title}</h1>
                </Link>
              )}

              <p>{release_date}</p>
              {tipo == 1 ? <p>Pelicula</p> : <p>Programa</p>}

              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                className="imgfavoritos"
              ></img>
              <button onClick={() => removeFavoritos(idpeliculaoserie)}>
                Remover Favoritos
              </button>
            </div>
          );
        }
      )}
    </div>
  );
};
export default Favoritos;
