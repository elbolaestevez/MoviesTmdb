import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/detail.css";

const DetailsMovie = () => {
  const [detailpelicula, setdetailpelicula] = useState({});

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=19810e339e7024271bcad7d3a8767450`
      )
      .then((res) => setdetailpelicula(res.data));
  }, [id]);
  if (detailpelicula.title) {
    const { id, backdrop_path, poster_path, title, overview, vote_average } =
      detailpelicula;
    console.log(detailpelicula);
    return (
      <div
        key={id}
        className="sinlgeCard_img"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
      >
        <div className="sinlgeCard_container">
          <div>
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
                alt="img_poster"
              />
            </figure>
          </div>
          <div className="sinlgeCard_description">
            <h2>{title}</h2>
            <p>
              <strong>Puntuacion:</strong> {vote_average} / 10
            </p>
            <p>{overview || "Aun no contamos con su descripcion"}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
};
export default DetailsMovie;
