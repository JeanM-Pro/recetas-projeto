import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import { Navbar } from "../NavBar/Navbar";
import { Card } from "../Card/Card";
import { Footer } from "../Footer/Footer";

const UserProfile = () => {
  const {
    usuarios,
    newName,
    formatearNumero,
    obtenerPromedioUsuarioPorUid,
    receitas,
    setReceitas,
  } = useContext(Context);
  const { userId } = useParams();

  const recetasUsuario = receitas.filter((receita) =>
    receita.userId.includes(userId)
  );

  const { promedioUsuario } = obtenerPromedioUsuarioPorUid(userId);

  const usuario = usuarios.find((u) => u.userId === userId);

  return (
    <>
      <Navbar />
      <div className="header-background-userpage"></div>
      <div className="perfil-container">
        <h1 className="title-user">Chef. {newName(usuario.nombre)}</h1>
        <div className="body-user">
          <div className="cards-container-featured gap-4 row">
            <div className="col-3 user-container">
              <div className="recetas-header">Perfil</div>
              <div className="profile-image-container">
                <img
                  src={usuario.img}
                  alt="profile imagen"
                  className="profile-image"
                />
              </div>

              <span className="username-profile">
                {newName(usuario.nombre)}
              </span>
              <span className="email-profile">{usuario.correo}</span>

              <span className="puntuacion-perfil">
                {formatearNumero(promedioUsuario)}
              </span>
              <span className="puntuacion-media">Pontuação</span>
            </div>
            <div className="col cards-container-destacados">
              <div className="recetas-header">{`${recetasUsuario.length} ${
                recetasUsuario.length < 2 ? "Receita" : "Receitas"
              }`}</div>
              {recetasUsuario?.map((receita) => {
                return (
                  <Card
                    key={receita.id}
                    setReceitas={setReceitas}
                    receitas={receitas}
                    receita={receita}
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

export default UserProfile;
