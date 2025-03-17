import { TableGenericProps } from "@/types"

const GenericTable: React.FC<TableGenericProps<any>>= ({columns, data, selected, setSelected, setDinamicCrud, dinamicCrud}) => {
  
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key.toString()}
              onClick={() => {
                setDinamicCrud((prev) => {
                  const order = (prev.sort.order === "asc" ? "desc" : "asc");
                  return {...prev, sort: {field: column.key.toString(), order}}
              }); 
            }}
            >
              {column.label}
              {dinamicCrud.sort.field === column.key && <span>{dinamicCrud.sort.order === "asc" ? " ▲" : " ▼"}</span>}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className={`${selected?.id === item.id ? "bg-[#fff3da]" : ""}`}
            onClick={() => setSelected(item)}
          >
            {columns.map((column) => (
              <td key={column.key.toString()}>{typeof item[column.key] === "object" && item[column.key] !== null
                ? item[column.key].name
                : item[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;