import React from "react";
import "./NavBarStyles.css";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/home");
  };
  const goToProfilePage = () => {
    navigate("/perfil");
  };
  return (
    <nav className="navbar navbar-expand-lg nav-bar">
      <div className="nav-content">
        <img
          src="https://i.ibb.co/h83RXnL/logo-sabor.png"
          className="image"
          alt="logo"
          onClick={goToHome}
        />

        <div className="nav-links-container">
          <div className="nav-link-container">
            <NavLink to="/home" className="nav-links" activeclassname="active">
              Início
            </NavLink>
          </div>
          <div className="nav-link-container">
            <NavLink
              to="/featured"
              className="nav-links"
              activeclassname="active"
            >
              Em Destaque
            </NavLink>
          </div>
          <div className="nav-link-container">
            <NavLink
              to="/favorites"
              className="nav-links"
              activeclassname="active"
            >
              Favoritos
            </NavLink>
          </div>
          <div className="nav-link-container">
            <NavLink
              to="/perfil"
              className="nav-links"
              activeclassname="active"
            >
              Meu Perfil
            </NavLink>
          </div>
        </div>
        <div className="user-information">
          <p onClick={goToProfilePage} className="user-name">
            Jean Centeno
          </p>
          <img
            src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
            alt="imagen de perfil"
            className="profile-imagen"
            onClick={goToProfilePage}
          />
        </div>
      </div>
    </nav>
  );
};
