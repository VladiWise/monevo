interface Column {
  title: string;
  name: string;
  getCellContent?: (item: any, columnName?: string) => React.ReactNode; // Custom getCellContent function for specific cells
};

interface TableProps {
  data: any[];
  columns: Column[];
  actions?: (item: any) => React.ReactNode; // Optional actions per row
};

export function Table({ data, columns, actions }: TableProps) {
  return (
    <table className="w-full overflow-hidden rounded-xl">
      <thead>
      <tr className="bg-white even:bg-gray-100">
          {columns.map((column, index) => (
            <th
              key={index}
             className="bg-gray-200 py-2 pl-3 pr-2 top-0 sticky text-left text-gray-500 text-sm"
            >
              {column.title}
            </th>
          ))}
          {actions && <th className="bg-gray-200 py-2 pl-3 pr-2 top-0 sticky text-left text-gray-500 text-sm">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex} className="bg-white even:bg-gray-100">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="py-1 pl-3 pr-0">
                {column.getCellContent ? column.getCellContent(item, column.name) : item[column.name]}
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
