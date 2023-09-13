import React, { useContext, useState } from "react";
import { Navbar } from "../../components/NavBar/Navbar";
import "./favoritePage.css";
import { Card } from "../../components/Card/Card";
import { Context } from "../../context/ContextProvider";
import { auth } from "../../firebaseConfig/firebase";
import { Footer } from "../../components/Footer/Footer";

export const FavoritesPage = () => {
  const { receitas, setReceitas } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const user = auth.currentUser;

  const favoriteRecipes = receitas.filter((receita) =>
    receita.favoritedUsers.includes(user.uid)
  );

  return (
    <>
      <Navbar />
      <div className="header-favoritos"></div>
      <div className="favorites-container">
        <h1 className="favorites-title">Receitas Favoritas</h1>
        <div className="body-favoritos">
          <h2 className="favorites-subtitle">Receitas que você gostou</h2>

          <div className="search-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#05050585"
              className="bi bi-search search-icon"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input
              type="text"
              placeholder="Encontrar receitas"
              className="input-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="cards-container">
            <div className="recetas-header-favorites">
              {`${favoriteRecipes.length} ${
                favoriteRecipes.length < 2 ? "Receita" : "Receitas"
              }`}
            </div>
            {favoriteRecipes?.length === 0
              ? "Ainda não adicionou receitas favoritas."
              : null}
            {favoriteRecipes
              ?.filter((receita) =>
                receita.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
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
            {receitas?.filter((receita) =>
              receita.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 && <p>Nenhuma receita encontrada.</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
