import React, { useState, useEffect } from "react";
import Movies from "../commons/Movies";
import axios from "axios";

const SearchMovie = () => {
  const [inputpelicula, setinputpelicula] = useState("");
  const [peliculasencontradas, setpeliculasencontradas] = useState([]);
  const handleInputs = (event) => {
    setinputpelicula(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=19810e339e7024271bcad7d3a8767450&query=${inputpelicula}`
      )
      .then((response) => response.data)
      .then((peliculas) => setpeliculasencontradas(peliculas.results));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Buscar Pelicula</label>
        <input type="text" name="buscarpelicula" onChange={handleInputs} />

        <button type="submit">SUBMIT</button>
      </form>
      <Movies movies={peliculasencontradas} />
    </>
  );
};

export default SearchMovie;
