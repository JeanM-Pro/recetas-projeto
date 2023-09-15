import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./registerPageStyles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import MoonLoader from "react-spinners/MoonLoader";

export const RegisterPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitingWithGoogle, setIsSubmitingWithGoogle] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [senhaError, setSenhaError] = useState(null);
  const [error, setError] = useState(null);
  const [, setToastError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSenhaError(null);

      if (password !== confirmPassword) {
        setSenhaError("As senhas devem ser iguais");
        setIsSubmitting(false);
        return;
      }

      if (password.length < 6) {
        setSenhaError("A senha deve ter pelo menos 6 caracteres");
        setIsSubmitting(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      setUser(userCredential.user);

      setIsSubmitting(false);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setToastError("O email já está em uso.");
        toast.error("O email já está em uso.");
      } else {
        setError(error.message);
      }
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      setIsSubmitingWithGoogle(true);
      await signInWithPopup(auth, provider);
      setIsSubmitingWithGoogle(false);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    } finally {
      setIsSubmitingWithGoogle(false);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <h5 className="title-register">
        Cadastre-se para descobrir as <br /> receitas de culinária{" "}
        <span className="mais-deliciosas-text">mais deliciosas</span>
      </h5>
      <form onSubmit={handleRegister}>
        <div className="register-form p-3">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group flex-nowrap mt-3">
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
              type="email"
              className="form-control"
              placeholder="E-mail"
              aria-label="e-mail"
              aria-describedby="addon-wrapping"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group flex-nowrap mt-3">
            {senhaError ? <p className="error-message">{senhaError}</p> : null}
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
              onChange={(e) => setPassword(e.target.value)}
              required
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
              placeholder="Confirme Senha"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={isSubmitting ? "btn-2" : "btn btn-primary mt-3"}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <MoonLoader size={20} color="#ffffff" />
            ) : (
              "Cadastrar"
            )}
          </button>
          <p className="mt-1">ou</p>
          <div
            className={
              isSubmitingWithGoogle
                ? "google-button-isSubmiting"
                : "google-button"
            }
            onClick={isSubmitingWithGoogle ? null : handleLoginWithGoogle}
          >
            {isSubmitingWithGoogle ? (
              <MoonLoader size={20} color="#ffffff" />
            ) : (
              <>
                <img
                  src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                  alt="google icon"
                  className="google-icon"
                />
                <span>Cadastre-se com o Google</span>
              </>
            )}
          </div>

          <p className="register-text mt-3 text-sm">
            Já está cadastrado? Faça{" "}
            <NavLink className="link-cadastro" to="/">
              login.
            </NavLink>
          </p>
        </div>
        {error ? <p className="error-message">{senhaError}</p> : null}
      </form>
    </div>
  );
};
