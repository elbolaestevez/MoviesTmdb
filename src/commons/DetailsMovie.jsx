import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/detail.css";
import CircularProgress from "@mui/material/CircularProgress";

const DetailsMovie = () => {
  const [detailpelicula, setdetailpelicula] = useState({});
  const [critics, setcritics] = useState({});
  const [divcr, setdivcritica] = useState("divcritica");
  const [isLoading, setIsLoading] = useState("false2");
  const [comentario, setcomentario] = useState(null);

  const params = useParams();
  const id = params.id;
  const handleMore = () => {
    if (critics.data) {
      setIsLoading(false);
    } else if (comentario) {
      setIsLoading(true);
    }
    if (divcr == "divcritica") {
      setdivcritica("divcritica2");
    } else if (divcr == "divcritica2") {
      setdivcritica("divcritica");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=19810e339e7024271bcad7d3a8767450`
      );

      setdetailpelicula(resp.data);

      const infoscrap = await axios.post("/api/favoritos/scraper/movie", {
        title: resp.data.title,
      });

      setIsLoading(false);
      setcritics(infoscrap);
      setcomentario("no hay critica");
    };
    fetchData();
  }, [id]);
  useEffect(() => {}, [divcr]);
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
            <div className="divbuttoncritica">
              <button className="buttoncritica" onClick={handleMore}>
                View More
              </button>
            </div>
            {isLoading === true ? <CircularProgress /> : null}

            {critics.data ? (
              <div className={divcr}>
                <p>{critics.data.innerUserOfReview}</p>
                <p>{critics.data.innerTextOfReview}</p>
              </div>
            ) : (
              comentario
            )}

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
