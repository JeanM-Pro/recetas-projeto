import { MoonLoader } from "react-spinners";

export const ModalEdit = ({
  submitForm,
  editedRecipeData,
  setEditedRecipeData,
  closeModal,
  isEditing,
  receita,
  imgNueva,
  setImgNueva,
}) => {
  return (
    <div className="modal-add-receita-container">
      <div className="modal-content">
        <h2>Editar Receita</h2>
        <form
          onSubmit={submitForm}
          className="form-group"
          encType="multipart/form-data"
          method="PUT"
          action={`/api/receitas/${editedRecipeData.id}`}
        >
          <label className="label-add-receita-form" htmlFor="image">
            Imagem:
          </label>
          <input
            type="file"
            id="img"
            name="img"
            accept="img/*"
            onChange={(e) => setImgNueva(e.target.files[0])}
          />

          <img
            src={imgNueva ? URL.createObjectURL(imgNueva) : receita.img}
            alt="Imagen de vista previa"
            className="img-add-receita-form"
          />

          <label className="label-add-receita-form" htmlFor="title">
            Nome da Receita:
          </label>
          <input
            required
            className="input-text"
            type="text"
            id="title"
            name="title"
            value={editedRecipeData.title}
            onChange={(e) =>
              setEditedRecipeData({
                ...editedRecipeData,
                title: e.target.value,
              })
            }
          />

          <label className="label-add-receita-form" htmlFor="category">
            Categoria:
          </label>
          <select
            className="input-select"
            id="category"
            name="category"
            value={editedRecipeData.category}
            onChange={(e) =>
              setEditedRecipeData({
                ...editedRecipeData,
                category: e.target.value,
              })
            }
          >
            <option value="Café da Manhã">Café da Manhã</option>
            <option value="Almoço">Almoço</option>
            <option value="Jantar">Jantar</option>
            <option value="Sobremesa">Sobremesa</option>
          </select>

          <label className="label-add-receita-form" htmlFor="ingredients">
            Ingredientes:{" "}
            <span className="instruction">(separe com vírgulas)</span>
          </label>
          <textarea
            required
            id="ingredients"
            className="textarea-add-receita"
            name="ingredients"
            value={editedRecipeData.ingredients}
            onChange={(e) =>
              setEditedRecipeData({
                ...editedRecipeData,
                ingredients: e.target.value,
              })
            }
          />

          <label className="label-add-receita-form" htmlFor="steps">
            Passos: <span className="instruction">(separe com vírgulas)</span>
          </label>
          <textarea
            required
            className="textarea-add-receita"
            id="steps"
            name="steps"
            value={editedRecipeData.steps}
            onChange={(e) =>
              setEditedRecipeData({
                ...editedRecipeData,
                steps: e.target.value,
              })
            }
          />

          <label className="label-add-receita-form" htmlFor="duration">
            Duração:
          </label>
          <input
            required
            className="input-text"
            type="number"
            id="duration"
            name="duration"
            value={editedRecipeData.duration}
            onChange={(e) =>
              setEditedRecipeData({
                ...editedRecipeData,
                duration: e.target.value,
              })
            }
          />
          <select
            id="durationUnit"
            name="durationUnit"
            value={editedRecipeData.durationUnit}
            onChange={(e) =>
              setEditedRecipeData({
                ...editedRecipeData,
                durationUnit: e.target.value,
              })
            }
          >
            <option value="minutos">minutos</option>
            <option value="horas">horas</option>
          </select>
          <div className="buttons-container">
            <button
              disabled={isEditing}
              className="button-submit-add"
              type="submit"
            >
              {isEditing ? (
                <MoonLoader size={20} color="#ffffff" />
              ) : (
                "Guardar Edición"
              )}
            </button>
            <button
              disabled={isEditing}
              className="button-close-modal"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
