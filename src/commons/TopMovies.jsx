import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import SearchMovie from "../components/SearchMovie";
import SearchTvShow from "../components/SearchTvShow";
import axios from "axios";
import Movies from "../commons/Movies";

const TopMovies = () => {
  const [toppelicula, setToppeliculas] = useState([]);
  const [data, setdata] = useState([]);
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
      <div className="buscador">
        <SearchMovie setdata={setdata} />
        <SearchTvShow setdata={setdata} />
      </div>
      {data.length > 0 && <Movies data={data} />}
    </>
  );
};
export default TopMovies;
