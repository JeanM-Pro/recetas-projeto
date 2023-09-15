import React, { useContext, useState } from "react";
import "./HomePageStyles.css";
import { Navbar } from "../../components/NavBar/Navbar";
import { Card } from "../../components/Card/Card";
import { Context } from "../../context/ContextProvider";
import { Footer } from "../../components/Footer/Footer";
import { Pagination } from "../../components/Pagination/Pagination";

export const HomePage = () => {
  const { receitas, setReceitas, signout } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(20);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filtrar las recetas basadas en la búsqueda
  const filteredRecipes = receitas.filter((receita) =>
    receita.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los índices de las recetas para la página actual
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <>
      <Navbar />
      <div className="header-background"></div>
      <div className="home-container">
        <h1 className="home-title">Receitas</h1>

        <div className="body-home">
          <h2 className="home-subtitle">
            Obtenha as melhores receitas feitas pelos nossos usuários!!
          </h2>

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
              placeholder="Buscar receitas"
              className="input-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="cards-container">
            <div className="recetas-header">
              Todas as receitas ({filteredRecipes.length})
            </div>
            {currentRecipes.length > 0 ? (
              currentRecipes.map((receita) => (
                <Card
                  key={receita.id}
                  receita={receita}
                  setReceitas={setReceitas}
                  receitas={receitas}
                />
              ))
            ) : (
              <p>Nenhuma receita encontrada.</p>
            )}
            <div className="w-100 d-flex align-items-center justify-content-end">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredRecipes.length / recipesPerPage)}
                onPageChange={paginate}
              />
            </div>
          </div>
        </div>
        <div className="logout-container" onClick={signout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-box-arrow-left "
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
            />
          </svg>
        </div>
      </div>
      <Footer />
    </>
  );
};
