import React, { useEffect, useState } from "react";

import axios from "axios";

const TopMovies = () => {
  const [toppelicula, setToppeliculas] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=19810e339e7024271bcad7d3a8767450&language=en-US&page=1`
      )
      .then((res) => console.log(res.data.results));
  }, []);
  {
    toppelicula.map(({ title, poster_path, vote_average }) => {
      return (
        <div className="detailcs">
          <h1>{title}</h1>
          <p>{vote_average}</p>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}></img>
        </div>
      );
    });
  }
};
export default TopMovies;
