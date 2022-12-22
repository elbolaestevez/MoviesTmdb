import React, { useState } from "react";
import Movies from "../commons/Movies";
import axios from "axios";
import "../css/movies.css";
import SearchTvShow from "../components/SearchTvShow";

const SearchMovie = ({ display, setdisplay }) => {
  const [inputpelicula, setinputpelicula] = useState("");
  const [peliculasencontradas, setpeliculasencontradas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputs = (event) => {
    setinputpelicula(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=19810e339e7024271bcad7d3a8767450&query=${inputpelicula}`
      )
      .then((response) => response.data)
      .then((peliculas) => setpeliculasencontradas(peliculas.results))
      .finally(() => {
        setdisplay("movie");
        setIsLoading(false);
      });
  };

  return (
    <div className="todo">
      <div className="buscadorcontainer">
        {isLoading ? (
          <img src="https://media.elpatagonico.com/p/578075a8af20e85dd747f7a73570e71a/adjuntos/193/imagenes/038/101/0038101382/riquelmajpg.jpg"></img>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label>Buscar Pelicula</label>
          <input
            type="text"
            name="buscarpelicula"
            placeholder="buscar"
            onChange={handleInputs}
          />

          <button type="submit">Buscar</button>
        </form>
        {/* <SearchTvShow /> */}
      </div>
      {display === "movie" && <Movies movies={peliculasencontradas} />}
    </div>
  );
};

export default SearchMovie;
