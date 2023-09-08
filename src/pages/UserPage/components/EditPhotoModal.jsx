import React from "react";
import { auth } from "../../../firebaseConfig/firebase";
import { MoonLoader } from "react-spinners";

export const EditPhotoModal = ({
  selectedFile,
  handleFileInputChange,
  uploadImageToFirebase,
  setShowModalImagen,
  setSelectedFile,
  isEditingImage,
}) => {
  const user = auth.currentUser;
  const closeModal = () => {
    setShowModalImagen(false);
    setSelectedFile(null);
  };
  return (
    <div className="modal-image-container">
      <div className="img-modal-container">
        <div className="img-perfil-preview-container">
          <img
            src={
              selectedFile ? URL.createObjectURL(selectedFile) : user.photoURL
            }
            alt="Vista Previa de la Imagen"
            className="preview-image"
          />
        </div>
        <div className="buttons-container-modal-edit">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="input-imagen"
            onChange={handleFileInputChange}
            disabled={isEditingImage}
          />
          <div className="buttons-modal-edit-image-container">
            <button
              type="button"
              onClick={uploadImageToFirebase}
              className="btn btn-primary"
              disabled={isEditingImage}
            >
              {isEditingImage ? (
                <MoonLoader size={20} color="#ffffff" />
              ) : (
                "Enviar Imagem"
              )}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
              disabled={isEditingImage}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
