import React, { useState } from "react";
import "./HomePageStyles.css";
import StarRatings from "react-star-ratings";
import { Navbar } from "../../components/NavBar/Navbar";

export const HomePage = () => {
  const [rating, setRating] = useState(2);

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Receitas</h1>
        <h2 className="home-subtitle">
          Encontre pratos deliciosos e saudáveis preparados pelos nossos
          melhores chefs!
        </h2>

        <div className="search-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-search search-icon"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar receitas"
            className="input-search"
          />
        </div>

        <div className="cards-container">
          <div className="card card-item">
            <p className="categorias">Almoços</p>
            <img
              src="https://elsabor.com.ec/wp-content/uploads/2022/02/arroz-pollo.jpg"
              className="card-img-top"
              alt="arrox con pollo"
            />
            <div className="card-body">
              <h5 className="card-title">Arroz con pollo</h5>
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
        </div>
      </div>
    </>
  );
};
