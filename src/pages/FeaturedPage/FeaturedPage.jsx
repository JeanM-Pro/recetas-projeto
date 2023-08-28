import React from "react";
import { Navbar } from "../../components/NavBar/Navbar";
import "./FeaturedPage.css";
import { Card } from "../../components/Card/Card";
import { ChefCard } from "./components/ChefCard";

export const FeaturedPage = () => {
  return (
    <div className="featured-container">
      <Navbar />
      <h1 className="title-featured">Em Destaque</h1>
      <h2 className="featured-subtitle">
        Descubra quais são as receitas mais destacadas e os chefs mais
        destacados
      </h2>
      <div className="cards-container-featured row">
        <div className="col-3 chefs-container">
          <h2 className="chefs-title">Chefs Destacados</h2>
          <ChefCard />
          <ChefCard />
          <ChefCard />
          <ChefCard />
          <ChefCard />
        </div>
        <div className="col cards-container-destacados">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};
