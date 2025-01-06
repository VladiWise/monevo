type Column = {
  title: string;
  name: string;
  getCellContent?: (item: any) => React.ReactNode; // Custom getCellContent function for specific cells
};

type TableProps = {
  data: any[];
  columns: Column[];
  actions?: (item: any) => React.ReactNode; // Optional actions per row
};

export function Table({ data, columns, actions }: TableProps) {
  return (
    <table className="w-full overflow-hidden rounded-xl">
      <thead>
      <tr className="bg-white even:bg-gray-100">
          {columns.map((field, index) => (
            <th
              key={index}
             className="bg-gray-200 py-2 pl-3 pr-2 top-0 sticky text-left text-gray-500 text-sm"
            >
              {field.title}
            </th>
          ))}
          {actions && <th className="bg-gray-200 py-2 pl-3 pr-2 top-0 sticky text-left text-gray-500 text-sm">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex} className="bg-white even:bg-gray-100">
            {columns.map((field, colIndex) => (
              <td key={colIndex} className="py-1 pl-3 pr-0">
                {field.getCellContent ? field.getCellContent(item) : item[field.name]}
              </td>
            ))}
            {actions && (
              <td className="py-1 pl-3 pr-0">{actions(item)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
