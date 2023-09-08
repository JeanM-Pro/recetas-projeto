import React, { useContext, useState } from "react";
import { Navbar } from "../../components/NavBar/Navbar";
import "./userPage.css";
import { Card } from "../../components/Card/Card";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AddReceitaForm } from "./components/AddReceitaForm";
import { Context } from "../../context/ContextProvider";
import { auth } from "../../firebaseConfig/firebase";
import { EditPhotoModal } from "./components/EditPhotoModal";

export const UserPage = () => {
  const user = auth.currentUser;

  const {
    receitas,
    setReceitas,
    obtenerPromedioUsuarioPorUid,
    newName,
    formatearNumero,
  } = useContext(Context);
  const [showModalImagen, setShowModalImagen] = useState(false);
  const [isAddingReceita, setIsAddingReceita] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgReceita, setImgReceita] = useState(null);
  const [recipeData, setRecipeData] = useState({
    title: "",
    category: "Café da Manhã",
    ingredients: "",
    steps: "",
    duration: "",
    durationUnit: "minutos",
  });

  // Poner Primera letra de cada nombre en mayuscula

  // Editar Imagen de Perfil

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const objectURL = URL.createObjectURL(file);
      const imgElement = document.querySelector(".preview-image");
      imgElement.src = objectURL;
    }
  };

  const uploadImageToFirebase = async () => {
    setIsEditingImage(true);
    if (selectedFile) {
      try {
        const storage = getStorage();

        const storageRef = ref(storage, `images/${selectedFile.name}`);

        await uploadBytes(storageRef, selectedFile);

        const downloadURL = await getDownloadURL(storageRef);

        if (user) {
          await updateProfile(user, {
            photoURL: downloadURL,
          });
          console.log("photoURL actualizada con éxito");
        }

        setShowModalImagen(false);
        setIsEditingImage(false);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    }
  };

  // Agregar Receta

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setImgReceita(null);
    setRecipeData({
      title: "",
      category: "Café da Manhã",
      image: null,
      ingredients: "",
      steps: "",
      duration: "",
      durationUnit: "minutos",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsAddingReceita(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `receitasImgs/${imgReceita.name}`);
      await uploadBytes(storageRef, imgReceita);
      const downloadURL = await getDownloadURL(storageRef);

      const newDataform = {
        title: recipeData.title,
        category: recipeData.category,
        img: downloadURL.toString(),
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        duration: recipeData.duration,
        durationUnit: recipeData.durationUnit,
        userName: user.displayName,
        userImage: user.photoURL
          ? user.photoURL
          : "https://i.ibb.co/3crnvk2/1077114.jpg",
        userId: user.uid,
        favoritedUsers: [],
        likes: [],
        disLikes: [],
      };

      const response = await fetch("http://localhost:80/api/receitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDataform),
      });

      if (response.ok) {
        setReceitas([newDataform, ...receitas]);
        closeModal();
        setIsAddingReceita(false);
      } else {
        const errorMessage = await response.text();
        console.error("Error al guardar la receta en el backend", errorMessage);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al backend", error);
    }
  };

  const myReceitas = receitas.filter((receita) =>
    receita.userId.includes(user.uid)
  );

  // Calcular promedio de usuario

  const { numeroDeVotos, promedioUsuario } = obtenerPromedioUsuarioPorUid(
    user.uid
  );

  let promedio;

  if (numeroDeVotos > 0) {
    promedio = (promedioUsuario * 10) / numeroDeVotos;
  } else {
    promedio = 0;
  }

  return (
    <>
      <Navbar />
      <div className="header-background-userpage"></div>
      <div className="perfil-container">
        {showModalImagen ? (
          <EditPhotoModal
            selectedFile={selectedFile}
            handleFileInputChange={handleFileInputChange}
            uploadImageToFirebase={uploadImageToFirebase}
            setShowModalImagen={setShowModalImagen}
            setSelectedFile={setSelectedFile}
            isEditingImage={isEditingImage}
          />
        ) : null}

        <div className="add-receita-container" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            className="bi bi-plus-circle plus-icon"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </div>

        {isModalOpen && (
          <AddReceitaForm
            submitForm={submitForm}
            recipeData={recipeData}
            setRecipeData={setRecipeData}
            closeModal={closeModal}
            setImgReceita={setImgReceita}
            imgReceita={imgReceita}
            isAddingReceita={isAddingReceita}
          />
        )}

        <h1 className="title-user">Minhas Receitas</h1>
        <div className="body-user">
          <div className="cards-container-featured gap-4 row">
            <div className="col-3 user-container">
              <div className="recetas-header">Meu Perfil</div>
              <div className="profile-image-container">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/3crnvk2/1077114.jpg"
                  }
                  alt="profile imagen"
                  className="profile-image"
                />
                <div className="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fillRule="currentColor"
                    className="bi bi-pencil-square edit-icon"
                    viewBox="0 0 16 16"
                    onClick={() => setShowModalImagen(true)}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </div>
              </div>

              <span className="username-profile">
                {newName(user.displayName)}
              </span>
              <span className="email-profile">{user.email}</span>

              <span className="puntuacion-perfil">
                {formatearNumero(promedio)}/10
              </span>
              <span className="puntuacion-media">Pontuação média</span>
              <div className="social-media-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-instagram social-media-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-facebook social-media-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-twitter social-media-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-linkedin social-media-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </div>
            </div>
            <div className="col cards-container-destacados">
              <div className="recetas-header">Minhas Receitas</div>
              {myReceitas?.map((receita) => {
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
