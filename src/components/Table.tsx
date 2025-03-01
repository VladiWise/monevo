import clsx from "clsx";

interface Column {
  title: string;
  name: string;
  getCellContent?: (item: any, columnName?: string) => React.ReactNode; // Custom getCellContent function for specific cells
}

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  data: any[];
  columns: Column[];
  className?: string;
  actions?: (item: any) => React.ReactNode; // Optional actions per row
}

export function Table({
  data,
  columns,
  actions,
  className,
  ...props
}: TableProps) {
  return (
    <table className={clsx("w-full", className)} {...props}>
      <thead className="sticky top-0 z-10 ">
        <tr className=" z-10">
          {columns?.map((column, index) => (
            <th
              key={index}
              className=" bg-gray-200 dark:bg-darkMain py-2 pl-3 pr-2 top-0 z-10 text-left text-gray-500 dark:text-darkGray text-sm"
            >
              {column.title}
            </th>
          ))}
          {actions && (
            <th className=" bg-gray-200 dark:bg-darkMain py-2 pl-3 pr-2 top-0 z-10 text-left text-gray-500 dark:text-darkGray text-sm">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-white even:bg-gray-100 text-darkMain dark:text-lightMain dark:bg-darkMain/30 dark:even:bg-darkMain"
          >
            {columns?.map((column, colIndex) => (
              <td key={colIndex} className="py-1 pl-3 pr-0">
                {column.getCellContent
                  ? column.getCellContent(item, column.name)
                  : item[column.name]}
              </td>
            ))}
            {actions && <td className="py-1 pl-3 pr-0">{actions(item)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
