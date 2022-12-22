import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import SearchMovie from "../components/SearchMovie";
import SearchTvShow from "../components/SearchTvShow";
import axios from "axios";

const TopMovies = () => {
  const [toppelicula, setToppeliculas] = useState([]);
  const [isdisplay, setdisplay] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=19810e339e7024271bcad7d3a8767450&language=en-US&page=1`
      )
      .then((res) => setToppeliculas(res.data.results));
  }, []);

  return (
    <>
      {toppelicula.length ? <Carousel top={toppelicula} /> : null}
      <SearchMovie display={isdisplay} setdisplay={setdisplay} />
      <SearchTvShow display={isdisplay} setdisplay={setdisplay} />
    </>
  );
};
export default TopMovies;
