import React, { useState } from "react";
import TvShow from "../commons/TvShow";
import axios from "axios";

const SearchTvShow = ({ display, setdisplay }) => {
  const [inputtvshow, setinputTvShow] = useState("");
  const [Tvshowssencontrados, setTvshows] = useState([]);
  const handleInputs = (event) => {
    setinputTvShow(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=19810e339e7024271bcad7d3a8767450&language=en-US&page=1&query=${inputtvshow}&include_adult=false`
      )
      .then((response) => response.data)
      .then((serie) => setTvshows(serie.results))
      .then(() => {
        setdisplay("tvshow");
      });
  };

  return (
    <div className="todo">
      <div className="buscadorcontainer">
        <form onSubmit={handleSubmit}>
          <label>Buscar TvShow</label>
          <input type="text" name="buscartvshow" onChange={handleInputs} />

          <button type="submit">SUBMIT</button>
        </form>
      </div>
      {display === "tvshow" && <TvShow tvshow={Tvshowssencontrados} />}
    </div>
  );
};

export default SearchTvShow;
