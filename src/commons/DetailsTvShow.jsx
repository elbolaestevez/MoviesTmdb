import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

const DetailsTvShow = () => {
  const [detailtvshow, setdetailtvshow] = useState({});

  const params = useParams();
  const id = params.id;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=19810e339e7024271bcad7d3a8767450&language=en-US`
      )
      .then((res) => setdetailtvshow(res.data));
  }, [id]);
  if (detailtvshow.name) {
    {
      console.log("hola", detailtvshow);
    }
    return (
      <div className="detailcs">
        {console.log(detailtvshow)}
        <h1>{detailtvshow.name}</h1>
        <p>Detalle:{detailtvshow.overview}</p>
        <p>Number of episodes:{detailtvshow.number_of_episodes}</p>
        <p>Number of series:{detailtvshow.number_of_seasons}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${detailtvshow.poster_path}`}
        ></img>
        <p>Popularidad:{detailtvshow.vote_average}</p>
        <p> Genero:{detailtvshow.genres[0].name}</p>
        {detailtvshow.genres[1] && <p>{detailtvshow.genres[1].name}</p>}
      </div>
    );
  } else {
    return "";
  }
};
export default DetailsTvShow;
