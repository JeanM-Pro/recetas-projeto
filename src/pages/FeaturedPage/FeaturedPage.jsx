import React, { useContext } from "react";
import { Navbar } from "../../components/NavBar/Navbar";
import "./FeaturedPage.css";
import { Card } from "../../components/Card/Card";
import { ChefCard } from "./components/ChefCard";
import { Context } from "../../context/ContextProvider";
import { Footer } from "../../components/Footer/Footer";

export const FeaturedPage = () => {
  const {
    receitas,
    setReceitas,
    promediosUsuarios,
    recetasFiltradas,
    compararReceitas,
  } = useContext(Context);

  return (
    <>
      <Navbar />
      <div className="header-background-destacados"></div>
      <div className="featured-container">
        <h1 className="title-featured">Receitas em Destaque</h1>
        <div className="body-featured">
          <h2 className="featured-subtitle">
            Descubra as receitas e chefs mais destacados!!
          </h2>
          <div className="cards-container-featured row gap-4">
            <div className="col-3 chefs-container">
              <div className="recetas-header">Chefs em Destaque</div>
              {promediosUsuarios
                ?.sort((a, b) => b.promedioUsuario - a.promedioUsuario)
                .slice(0, 6)
                .map((c) => {
                  return (
                    <ChefCard
                      key={c.userId}
                      userId={c.userId}
                      userName={c.userName}
                      photoURL={c.userImage}
                      promedioUsuario={c.promedioUsuario}
                      numeroDeVotos={c.numeroDeVotos}
                    />
                  );
                })}
            </div>
            <div className="col cards-container-destacados">
              <div className="recetas-header">Receitas em Destaque</div>
              {recetasFiltradas
                ?.sort(compararReceitas)
                .slice(0, 9)
                .map((receita) => {
                  return (
                    <Card
                      key={receita.id}
                      receita={receita}
                      receitas={receitas}
                      setReceitas={setReceitas}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
