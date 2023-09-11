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
import { Footer } from "../../components/Footer/Footer";

export const UserPage = () => {
  const user = auth.currentUser;

  const {
    receitas,
    setReceitas,
    obtenerPromedioUsuarioPorUid,
    newName,
    formatearNumero,
    signout,
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

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/receitas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDataform),
        }
      );

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
            <div className="col-3 col-lg-3 col-md-5 col-xs-10 col-sm-8 user-container">
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
              <button
                onClick={signout}
                type="button"
                className="btn btn-secondary mt-4"
              >
                Encerrar Sessão
              </button>
            </div>
            <div className="col cards-container-destacados">
              <div className="recetas-header">
                Minhas Receitas ({myReceitas.length})
              </div>
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
      <Footer />
    </>
  );
};
