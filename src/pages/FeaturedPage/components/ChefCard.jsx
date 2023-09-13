import { useContext, useEffect, useState } from "react";
import "../FeaturedPage.css";
import { Context } from "../../../context/ContextProvider";

export const ChefCard = ({ userName, photoURL, promedioUsuario, userId }) => {
  const { newName } = useContext(Context);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/usuarios/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el usuario");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);

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
      <div className="chef-imagen-card-container">
        <img
          src={user?.img ? user?.img : "https://i.ibb.co/3crnvk2/1077114.jpg"}
          alt="imagen do usuario"
          className="chef-imagen-card"
        />
      </div>
      <div className="name-points-container">
        <p className="chef-name-card">{newName(userName)}</p>
        <p className="points-chef-card">
          Pontuação: <b>{formatearNumero(promedioUsuario)}</b>
        </p>
      </div>
    </div>
  );
};
