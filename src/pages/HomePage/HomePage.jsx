import React from "react";
import "./HomePageStyles.css";

import { Navbar } from "../../components/NavBar/Navbar";
import { Card } from "../../components/Card/Card";

export const HomePage = () => {
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};
