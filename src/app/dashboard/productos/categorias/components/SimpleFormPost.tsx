import { SimpleFormProps } from "../types";


const SimpleFormPost: React.FC<SimpleFormProps> = ({ name, setName, add }) => {
    
    return (
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder={`Nombre de ${name}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            onClick={add}
            className="bg-[#FF9800] text-white px-4 py-2 rounded font-montserrat"
          >
            Añadir
          </button>
        </div>
    )
}

export default SimpleFormPost;