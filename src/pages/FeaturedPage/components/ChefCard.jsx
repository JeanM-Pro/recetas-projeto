import "../FeaturedPage.css";

export const ChefCard = () => {
  return (
    <div className="chef-card-container">
      <img
        src="https://img.freepik.com/psd-premium/avatar-masculino-de-profissao-de-chef-de-renderizacao-em-3d_52659-1089.jpg"
        alt="imagen do usuario"
        className="chef-imagen-card"
      />
      <div className="name-points-container">
        <p className="chef-name-card">Angel Lozano</p>
        <p className="points-chef-card">
          Pontuação média: <b>7/10</b>
        </p>
      </div>
    </div>
  );
};
