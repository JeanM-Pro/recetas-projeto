import React from "react";
import "./loginPageStyles.css";
import { NavLink, useNavigate } from "react-router-dom";

export const LoginPage = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const login = () => {
    setIsAuth(true);
    navigate("/");
  };
  return (
    <div className="login-container ">
      <h5 className="title-login">
        Inicie sessão para descobrir as <br /> receitas de culinária{" "}
        <span className="mais-deliciosas-text">mais deliciosas</span>
      </h5>
      <form>
        <div className="login-form p-3">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="E-mail"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div className="input-group flex-nowrap mt-3">
            <span className="input-group-text" id="addon-wrapping">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <button
            onClick={login}
            type="button"
            className="btn btn-primary mt-3"
          >
            Enviar
          </button>
          <p className="mt-1">ou</p>
          <div className="google-button">
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
              alt="google icon"
              className="google-icon"
            />

            <span>Inicia sessão com o Google</span>
          </div>

          <p className="register-text mt-3 text-sm">
            Ainda não tem uma conta?{" "}
            <NavLink className="link-cadastro" to="/register">
              Cadastre-se.
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};
