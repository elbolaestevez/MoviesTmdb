import React, { useState } from "react";

import axios from "axios";

const SearchTvShow = ({ setdata }) => {
  const [inputtvshow, setinputTvShow] = useState("");
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
      .then((serie) => setdata(serie.results));
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
    </div>
  );
};

export default SearchTvShow;
