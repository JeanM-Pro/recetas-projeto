export const AddReceitaForm = ({
  submitForm,
  recipeData,
  setRecipeData,
  closeModal,
}) => {
  return (
    <div className="modal-add-receita-container">
      <div className="modal-content">
        <h2>Adicionar Receita</h2>
        <form onSubmit={submitForm} className="form-group">
          <label className="label-add-receita-form" htmlFor="image">
            Imagem:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setRecipeData({ ...recipeData, image: e.target.files[0] })
            }
          />
          {recipeData.image && (
            <img
              src={URL.createObjectURL(recipeData.image)}
              alt="Imagen de vista previa"
            />
          )}

          <label className="label-add-receita-form" htmlFor="title">
            Nome da Receita:
          </label>
          <input
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
            className="input-select"
            id="category"
            name="category"
            value={recipeData.category}
            onChange={(e) =>
              setRecipeData({ ...recipeData, category: e.target.value })
            }
          >
            <option value="Desayuno">Café da Manhã</option>
            <option value="Almuerzo">Almoço</option>
            <option value="Cena">Jantar</option>
            <option value="Postre">Sobremesa</option>
          </select>

          <label className="label-add-receita-form" htmlFor="ingredients">
            Ingredientes:
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={(e) =>
              setRecipeData({ ...recipeData, ingredients: e.target.value })
            }
          />

          <label className="label-add-receita-form" htmlFor="steps">
            Passos:
          </label>
          <textarea
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
            <button className="button-submit-add" type="submit">
              Adicionar Receita
            </button>
            <button className="button-close-modal" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
