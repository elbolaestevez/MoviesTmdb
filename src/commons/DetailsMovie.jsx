import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/detail.css";

const DetailsMovie = () => {
  const [detailpelicula, setdetailpelicula] = useState({});
  const [critics, setcritics] = useState({});

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=19810e339e7024271bcad7d3a8767450`
      );

      setdetailpelicula(resp.data);
      const infoscrap = await axios.post("/api/favoritos/scraper/movie", {
        title: resp.data.title,
      });
      setcritics(infoscrap);
    };
    fetchData();
  }, [id]);
  if (detailpelicula.title) {
    const { id, backdrop_path, poster_path, title, overview, vote_average } =
      detailpelicula;
    console.log("critica", critics);
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
            {critics.data ? (
              <div>
                <p>{critics.data.innerUserOfReview}</p>
                <p>{critics.data.innerTextOfReview}</p>
              </div>
            ) : null}

            {/* {critics.data.innerTextOfReview}
            <p>{critics.data.innerUserOfReview}</p>
            <p>{critics.data.innerTextOfReview}</p> */}
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
};
export default DetailsMovie;
