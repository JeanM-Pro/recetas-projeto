import React from "react";

export const ModalDelete = ({
  toggleModalDelete,
  receitas,
  setReceitas,
  receita,
}) => {
  const handleDelete = async () => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:80/api/receitas/${receita.id}`,
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
          <button type="button" class="btn btn-danger" onClick={handleDelete}>
            Excluir
          </button>
          <button
            type="button"
            onClick={toggleModalDelete}
            class="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
