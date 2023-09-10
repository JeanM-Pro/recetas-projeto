import { useContext } from "react";
import "../FeaturedPage.css";
import { Context } from "../../../context/ContextProvider";

export const ChefCard = ({
  userName,
  photoURL,
  promedioUsuario,
  numeroDeVotos,
  userId,
}) => {
  const { newName } = useContext(Context);

  let promedio;

  if (numeroDeVotos > 0) {
    promedio = (promedioUsuario * 10) / numeroDeVotos;
  } else {
    promedio = 0;
  }

  function formatearNumero(numero) {
    const decimalString = numero.toString().split(".")[1];
    if (decimalString) {
      return numero.toFixed(1);
    } else {
      return numero.toString();
    }
  }

  const redirectToUserProfile = () => {
    if (userId) {
      const userProfileURL = `https://receitas-toti.web.app/user-profile/${userId}`;
      window.open(userProfileURL, "_blank");
    }
  };

  return (
    <div className="chef-card-container" onClick={redirectToUserProfile}>
      <img
        src={photoURL ? photoURL : "https://i.ibb.co/3crnvk2/1077114.jpg"}
        alt="imagen do usuario"
        className="chef-imagen-card"
      />
      <div className="name-points-container">
        <p className="chef-name-card">{newName(userName)}</p>
        <p className="points-chef-card">
          Pontuação: <b>{formatearNumero(promedio)}/10</b>
        </p>
      </div>
    </div>
  );
};
