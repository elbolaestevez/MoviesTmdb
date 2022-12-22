import React from "react";
import Slider from "infinite-react-carousel";
import "./Carousel.css";
import { Grid } from "@mui/material";

const imgURL = "https://image.tmdb.org/t/p/w500";

const Carousel = ({ top }) => {
  const settings = {
    arrows: false,
    autoplay: true,
    duration: 800,
    autoplaySpeed: 3000,
  };
  console.log("top", top);
  return (
    <Grid>
      <section className="slider">
        <Slider {...settings} className="slidercontent">
          {top.map((image) => (
            <div key={image.id} className="slidercontent--item">
              <img
                className="carousel-image"
                src={imgURL + image.backdrop_path}
                alt={image.original_title}
              />
              <p className="slider-description">{image.original_title}</p>
            </div>
          ))}
        </Slider>
      </section>
    </Grid>
  );
};

export default Carousel;
