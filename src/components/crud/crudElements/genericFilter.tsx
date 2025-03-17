
import { FilterProps } from "@/types";

const GenericFilter: React.FC<FilterProps> = ({
  setDinamicCrud,
  options,
}) => {
  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear un objeto para almacenar los valores del formulario
    const formData: { [key: string]: string } = {};

    // Iterar sobre todos los elementos del formulario
    Array.from(e.currentTarget.elements).forEach((element) => {
      if (
        (element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement) &&
        element.name // Solo considerar elementos con un atributo "name"
      ) {
        // Guardar el valor del campo en el objeto formData usando el nombre del campo como clave
        if (element.name !== "name") {formData[element.name+"Id"] = element.value;}
        else {formData[element.name] = element.value;}
        
      }
    });
    alert(`este es el objeto que actualiza formData: ${JSON.stringify(formData)}`)
    // Actualizar el estado searchQuery con los valores capturados
    setDinamicCrud((prev) => ({...prev, search: formData}));
  };

  // console.log(`estas son las options DENTRO DE FILTER ${JSON.stringify({
  //   options,
  // })}`);

  return (
    <form className="container-search" onSubmit={handleSubmit}>
      {options.map((option) => (
        <div key={`${option.key.toString()}-container`}>
          {/* Etiqueta del campo */}
          <label>{option.label}</label>

          {/* Renderizar select o input según el tipo */}
          {option.type === "select" ? (
            <select
              defaultValue="" // Acceder dinámicamente al valor del estado
              name={option.key.toString()}
            >
              {/* Renderizar las opciones del select */}
              <option value="">Elige una Opción</option>
              {option.data?.map((selectOption) => (
                <option key={selectOption.id} value={selectOption.id}>
                  {selectOption.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={option.type}
              defaultValue="" // Acceder dinámicamente al valor del estado
              name={option.key.toString()}
              placeholder="Buscar..."
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn-text-orange">
        Buscar
      </button>
    </form>
  );
};

export default GenericFilter;

