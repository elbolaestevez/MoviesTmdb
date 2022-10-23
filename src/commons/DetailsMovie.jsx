import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

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
    return (
      <div className="detailcs">
        {console.log(detailpelicula)}
        <h1>{detailpelicula.title}</h1>
        <p>{detailpelicula.revenue}</p>
        <p>{detailpelicula.budget}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${detailpelicula.poster_path}`}
        ></img>
        <p>{detailpelicula.overview}</p>
        <p>{detailpelicula.genres[0].name}</p>
        {detailpelicula.genres[1] && <p>{detailpelicula.genres[1].name}</p>}
      </div>
    );
  } else {
    return "";
  }
};
export default DetailsMovie;
