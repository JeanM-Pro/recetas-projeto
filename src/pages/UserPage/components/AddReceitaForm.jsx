import MoonLoader from "react-spinners/MoonLoader";

export const AddReceitaForm = ({
  submitForm,
  recipeData,
  setRecipeData,
  closeModal,
  setImgReceita,
  imgReceita,
  isAddingReceita,
}) => {
  return (
    <div className="modal-add-receita-container">
      <div className="modal-content">
        <h2>Adicionar Receita</h2>
        <form
          onSubmit={submitForm}
          className="form-group"
          encType="multipart/form-data"
          method="post"
          action="/api/receitas"
        >
          <label className="label-add-receita-form" htmlFor="image">
            Imagem:
          </label>
          <input
            type="file"
            id="img"
            name="img"
            accept="img/*"
            onChange={(e) => setImgReceita(e.target.files[0])}
            required
            disabled={isAddingReceita}
          />
          {imgReceita && (
            <img
              src={URL.createObjectURL(imgReceita)}
              alt="Imagen de vista previa"
              className="img-add-receita-form"
            />
          )}

          <label className="label-add-receita-form" htmlFor="title">
            Nome da Receita:
          </label>
          <input
            disabled={isAddingReceita}
            required
            className="input-text"
            type="text"
            id="title"
            name="title"
            value={recipeData.title}
            onChange={(e) =>
              setRecipeData({ ...recipeData, title: e.target.value })
            }
          />

          <label className="label-add-receita-form" htmlFor="category">
            Categoria:
          </label>
          <select
            disabled={isAddingReceita}
            className="input-select"
            id="category"
            name="category"
            value={recipeData.category}
            onChange={(e) =>
              setRecipeData({ ...recipeData, category: e.target.value })
            }
          >
            <option value="Café da Manhã">Café da Manhã</option>
            <option value="Almoço">Almoço</option>
            <option value="Jantar">Jantar</option>
            <option value="Sobremesa">Sobremesa</option>
          </select>

          <label className="label-add-receita-form" htmlFor="ingredients">
            Ingredientes:{" "}
            <span className="instruction">(Separe por quebras de linha)</span>
          </label>
          <textarea
            disabled={isAddingReceita}
            required
            id="ingredients"
            className="textarea-add-receita"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={(e) =>
              setRecipeData({ ...recipeData, ingredients: e.target.value })
            }
          />

          <label className="label-add-receita-form" htmlFor="steps">
            Passos:{" "}
            <span className="instruction">(Separe por quebras de linha)</span>
          </label>
          <textarea
            disabled={isAddingReceita}
            required
            className="textarea-add-receita"
            id="steps"
            name="steps"
            value={recipeData.steps}
            onChange={(e) =>
              setRecipeData({ ...recipeData, steps: e.target.value })
            }
          />

          <label className="label-add-receita-form" htmlFor="duration">
            Duração:
          </label>
          <input
            disabled={isAddingReceita}
            required
            className="input-text"
            type="number"
            id="duration"
            name="duration"
            value={recipeData.duration}
            onChange={(e) =>
              setRecipeData({ ...recipeData, duration: e.target.value })
            }
          />
          <select
            disabled={isAddingReceita}
            id="durationUnit"
            name="durationUnit"
            value={recipeData.durationUnit}
            onChange={(e) =>
              setRecipeData({ ...recipeData, durationUnit: e.target.value })
            }
          >
            <option value="minutos">minutos</option>
            <option value="horas">horas</option>
          </select>
          <div className="buttons-container">
            <button
              disabled={isAddingReceita}
              className="button-submit-add"
              type="submit"
            >
              {isAddingReceita ? (
                <MoonLoader size={20} color="#ffffff" />
              ) : (
                "Adicionar Receita"
              )}
            </button>
            <button
              disabled={isAddingReceita}
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
