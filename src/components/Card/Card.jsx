import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import "./Card.css";

export const Card = () => {
  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  const [rating, setRating] = useState(2);
  return (
    <div className="card card-item">
      <p className="categorias">Almoços</p>
      <img
        src="https://elsabor.com.ec/wp-content/uploads/2022/02/arroz-pollo.jpg"
        className="card-img-top"
        alt="arrox con pollo"
      />
      <div className="card-body">
        <div className="title-heart-container">
          <h5 className="card-title">Arroz con pollo</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </div>

        <p className="chef">Chef: Maria Perez</p>
        <div className="stars-container">
          <StarRatings
            rating={rating}
            starRatedColor="orange"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="28px"
            starHoverColor="orange"
          />
        </div>

        <p className="btn">Ver receita</p>
      </div>
    </div>
  );
};
