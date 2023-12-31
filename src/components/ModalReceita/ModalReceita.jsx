import React, { useState } from "react";
import { ModalDelete } from "../ModalDelete/ModalDelete";
import { ModalEdit } from "../ModalEdit/ModalEdit";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const ModalReceita = ({
  toggleModal,
  receita,
  isFavorite,
  addFavorite,
  user,
  toggleModalDelete,
  modalDelete,
  receitas,
  setReceitas,
  setIsLike,
  isLike,
  isDisLike,
  setIsDisLike,
  capitalizarPalabras,
  redirectToUserProfile,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [imgNueva, setImgNueva] = useState(null);
  const [editedRecipeData, setEditedRecipeData] = useState({ ...receita });
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditModal = () => {
    setEditModal(true);
    setEditedRecipeData({ ...receita });
  };

  const obtenerRecetasActualizadas = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/receitas`
      );
      if (!response.ok) {
        throw new Error("Error al obtener las recetas");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
      throw error;
    }
  };

  const submitEditForm = async (e) => {
    e.preventDefault();
    setIsEditing(true);

    try {
      let downloadURL = null;

      if (imgNueva) {
        const storage = getStorage();
        const storageRef = ref(storage, `receitasImgs/${imgNueva.name}`);
        await uploadBytes(storageRef, imgNueva);
        downloadURL = await getDownloadURL(storageRef);
      }

      let requestBody = {};

      if (imgNueva) {
        requestBody = {
          ...editedRecipeData,
          img: downloadURL.toString(),
        };
      } else {
        requestBody = editedRecipeData;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/receitas/${receita.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        try {
          const updatedReceitas = await obtenerRecetasActualizadas();
          setReceitas(updatedReceitas);
        } catch (error) {
          console.error("Error al obtener las recetas actualizadas:", error);
          // Maneja el error aquí si es necesario
        }

        setEditModal(false);
        setIsEditing(false);
      } else {
        // Manejar errores en caso de que la solicitud no sea exitosa
        console.error("Error al editar la receta");
      }
    } catch (error) {
      console.error("Error al editar la receta:", error);
    }
  };

  const toggleLikeOrDisLike = async (isLikeAction) => {
    try {
      const updatedReceitas = [...receitas];
      const newReceita = JSON.parse(JSON.stringify(receita));

      const likeIndex = newReceita.likes.indexOf(user.uid);
      const disLikeIndex = newReceita.disLikes.indexOf(user.uid);

      if (isLikeAction) {
        // Si el usuario está marcando un like
        if (likeIndex === -1) {
          // Si el usuario no ha marcado like previamente, agregarlo
          newReceita.likes.push(user.uid);
          setIsLike(true);

          // Si el usuario ya había marcado dislike, quitarlo
          if (disLikeIndex !== -1) {
            newReceita.disLikes.splice(disLikeIndex, 1);
            setIsDisLike(false);
          }
        } else {
          // Si el usuario ya marcó like previamente, quitarlo
          newReceita.likes.splice(likeIndex, 1);
          setIsLike(false);
        }
      } else {
        // Si el usuario está marcando un dislike
        if (disLikeIndex === -1) {
          // Si el usuario no ha marcado dislike previamente, agregarlo
          newReceita.disLikes.push(user.uid);
          setIsDisLike(true);

          // Si el usuario ya había marcado like, quitarlo
          if (likeIndex !== -1) {
            newReceita.likes.splice(likeIndex, 1);
            setIsLike(false);
          }
        } else {
          // Si el usuario ya marcó dislike previamente, quitarlo
          newReceita.disLikes.splice(disLikeIndex, 1);
          setIsDisLike(false);
        }
      }

      updatedReceitas.forEach((receitaItem, index) => {
        if (receitaItem.id === receita.id) {
          updatedReceitas[index] = newReceita; // Actualiza la receta modificada en el nuevo array
        }
      });

      setReceitas(updatedReceitas);

      const updateResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/receitas/${receita.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReceita),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `Error al actualizar la receta: ${updateResponse.status}`
        );
      }
    } catch (error) {
      console.error("Error al marcar like o dislike:", error);
    }
  };

  const toggleLike = async () => {
    toggleLikeOrDisLike(true);
  };

  const toggleDisLike = async () => {
    toggleLikeOrDisLike(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-card">
          <div className="close-modal" onClick={toggleModal}>
            &times;
          </div>
          <div className="receita-title-container">
            <h2 className="title-receita-card">
              {receita.title.charAt(0).toUpperCase() + receita.title.slice(1)}
            </h2>
          </div>

          <img
            src={receita.img}
            alt={receita.title}
            className="img-modal-card"
          />
          <div className="usuario-duration-container">
            <div className="chef-heart-container">
              <div className="username-container-card-modal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                <p onClick={redirectToUserProfile} className="chef">
                  {capitalizarPalabras(receita.userName)}
                </p>
              </div>
              {isFavorite ? (
                <svg
                  onClick={addFavorite}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#f55c5c"
                  className="bi bi-heart-fill heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="red"
                  className="bi bi-heart heart"
                  viewBox="0 0 16 16"
                  onClick={addFavorite}
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
            </div>
            <div className="duracion-container-card">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-clock"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
              </span>
              <p className="duracion">
                {` ${receita.duration} ${
                  receita.duration === "1"
                    ? receita.durationUnit.slice(0, -1)
                    : receita.durationUnit
                }`}
              </p>
            </div>
          </div>

          <h4 className="ingredients-subtitle">Ingredientes</h4>
          <ul className="lista">
            {receita.ingredients.split("\n").map((ingredient, index) => (
              <li key={index}>
                {ingredient.trim().charAt(0).toUpperCase() +
                  ingredient.trim().slice(1)}
              </li>
            ))}
          </ul>
          <h4>Passos</h4>
          <ol>
            {receita.steps.split("\n").map((step, index) => (
              <li key={index}>
                {step.trim().charAt(0).toUpperCase() + step.trim().slice(1)}
              </li>
            ))}
          </ol>

          <div className="footer-receta-card-buttons">
            {receita.userId === user.uid ? null : (
              <div className="all-hand-container">
                <div className="hands-container">
                  {isLike ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#1bd18b"
                      className="bi bi-hand-thumbs-up-fill manitos-2"
                      viewBox="0 0 16 16"
                      onClick={toggleLike}
                    >
                      <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#24a372"
                      className="bi bi-hand-thumbs-up manitos-2"
                      viewBox="0 0 16 16"
                      onClick={toggleLike}
                    >
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                    </svg>
                  )}

                  <span>{receita.likes.length}</span>
                </div>

                <div className="hands-container">
                  {isDisLike ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#f55c5c"
                      className="bi bi-hand-thumbs-down-fill manitos-2"
                      viewBox="0 0 16 16"
                      onClick={toggleDisLike}
                    >
                      <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#f1bbbb"
                      className="bi bi-hand-thumbs-down manitos-2"
                      viewBox="0 0 16 16"
                      onClick={toggleDisLike}
                    >
                      <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z" />
                    </svg>
                  )}

                  <span>{receita.disLikes.length}</span>
                </div>
              </div>
            )}

            <button
              type="button"
              className={
                receita.userId === user.uid
                  ? "btn btn-secondary "
                  : "btn btn-secondary"
              }
              onClick={toggleModal}
            >
              Fechar
            </button>

            {receita.userId === user.uid && (
              <div className="edit-delete-icons-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-pencil-square editar"
                  viewBox="0 0 16 16"
                  onClick={toggleEditModal}
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-trash papelera"
                  viewBox="0 0 16 16"
                  onClick={toggleModalDelete}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        {modalDelete ? (
          <ModalDelete
            receita={receita}
            receitas={receitas}
            setReceitas={setReceitas}
            toggleModalDelete={toggleModalDelete}
          />
        ) : null}

        {editModal ? (
          <ModalEdit
            submitForm={submitEditForm}
            editedRecipeData={editedRecipeData}
            setEditedRecipeData={setEditedRecipeData}
            closeModal={() => setEditModal(false)}
            isEditing={isEditing}
            receita={receita}
            imgNueva={imgNueva}
            setImgNueva={setImgNueva}
          />
        ) : null}
      </div>
    </>
  );
};
