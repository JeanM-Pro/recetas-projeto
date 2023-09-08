import "../FeaturedPage.css";

export const ChefCard = ({
  userName,
  photoURL,
  promedioUsuario,
  numeroDeVotos,
}) => {
  const capitalizarPalabras = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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

  return (
    <div className="chef-card-container">
      <img
        src={photoURL ? photoURL : "https://i.ibb.co/3crnvk2/1077114.jpg"}
        alt="imagen do usuario"
        className="chef-imagen-card"
      />
      <div className="name-points-container">
        <p className="chef-name-card">{capitalizarPalabras(userName)}</p>
        <p className="points-chef-card">
          Pontuação: <b>{formatearNumero(promedio)}/10</b>
        </p>
      </div>
    </div>
  );
};
