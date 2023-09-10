import React, { useEffect, useState } from "react";
import "./NavBarStyles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig/firebase";
import "animate.css";

export const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/home");
  };
  const goToProfilePage = () => {
    navigate("/perfil");
  };

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = currentScrollPos > prevScrollPos;

      setIsNavbarVisible(!isScrolledDown);

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg nav-bar ${
        isNavbarVisible
          ? "animate__animated animate__fadeInDown"
          : "animate__fadeOutUp animate__animated"
      }`}
    >
      <div className="nav-content">
        <h2 onClick={goToHome} className="logo-navbar">
          SaborGourmet
        </h2>

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
            {user.displayName}
          </p>
          <div className="profile-imagen-navabar-container">
            <img
              src={
                user?.photoURL
                  ? user?.photoURL
                  : "https://i.ibb.co/3crnvk2/1077114.jpg"
              }
              alt="imagen de perfil"
              className="profile-imagen-navabar"
              onClick={goToProfilePage}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
