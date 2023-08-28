import React from "react";
import { Navbar } from "../../components/NavBar/Navbar";
import "./favoritePage.css";
import { Card } from "../../components/Card/Card";

export const FavoritesPage = () => {
  return (
    <>
      <Navbar />
      <div className="favorites-container">
        <h1 className="favorites-title">Receitas Favoritas</h1>
        <h2 className="favorites-subtitle">Receitas que você gostou</h2>

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
            placeholder="Encontrar receitas"
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
