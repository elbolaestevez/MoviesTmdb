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
    }
    return (
      <div
        key={id}
        className="sinlgeCard_img"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${detailtvshow.backdrop_path})`,
        }}
      >
        <div className="sinlgeCard_container">
          <div>
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${detailtvshow.poster_path}`}
              ></img>
            </figure>
          </div>
          <div className="sinlgeCard_description">
            <h2>{detailtvshow.name}</h2>
            <p>Detalle:{detailtvshow.overview}</p>
            <p>Number of episodes:{detailtvshow.number_of_episodes}</p>
            <p>Number of series:{detailtvshow.number_of_seasons}</p>

            <p>Popularidad:{detailtvshow.vote_average}</p>
            <p> Genero:{detailtvshow.genres[0].name}</p>
            {detailtvshow.genres[1] && <p>{detailtvshow.genres[1].name}</p>}
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
};
export default DetailsTvShow;
