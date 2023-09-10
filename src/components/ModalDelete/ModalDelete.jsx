import React, { useState } from "react";
import { MoonLoader } from "react-spinners";

export const ModalDelete = ({
  toggleModalDelete,
  receitas,
  setReceitas,
  receita,
}) => {
  const [isdeleting, setIsdeleting] = useState(false);

  const handleDelete = async () => {
    setIsdeleting(true);
    try {
      const deleteResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/receitas/${receita.id}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error(
          `Error al eliminar la receta: ${deleteResponse.status}`
        );
      }

      const updatedReceitas = receitas.filter((r) => r.id !== receita.id);
      setReceitas(updatedReceitas);
      setIsdeleting(false);

      // Realiza cualquier otra acción necesaria, como mostrar un mensaje al usuario
    } catch (error) {
      console.error("Error al eliminar la receta:", error);
      // Manejar errores si es necesario
    }
  };

  return (
    <div className="modal-delete">
      <div className="modal-delete-content">
        <h2>Excluir Receita</h2>
        <p>Tem certeza de que deseja excluir essa receita?</p>
        <div className="buttons-container">
          <button
            disabled={isdeleting}
            type="button"
            class="btn btn-danger"
            onClick={handleDelete}
          >
            {isdeleting ? <MoonLoader size={20} color="#ffffff" /> : " Excluir"}
          </button>
          <button
            type="button"
            onClick={toggleModalDelete}
            class="btn btn-secondary"
            disabled={isdeleting}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
