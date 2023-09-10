import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import { Navbar } from "../NavBar/Navbar";
import { Card } from "../Card/Card";

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

  const { numeroDeVotos, promedioUsuario } =
    obtenerPromedioUsuarioPorUid(userId);

  let promedio;

  if (numeroDeVotos > 0) {
    promedio = (promedioUsuario * 10) / numeroDeVotos;
  } else {
    promedio = 0;
  }

  const usuario = usuarios.find((u) => u.userId === userId);
  console.log(usuario);

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
                {formatearNumero(promedio)}/10
              </span>
              <span className="puntuacion-media">Pontuação média</span>
            </div>
            <div className="col cards-container-destacados">
              <div className="recetas-header">{`${recetasUsuario.length} Receitas`}</div>
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
    </>
  );
};

export default UserProfile;
