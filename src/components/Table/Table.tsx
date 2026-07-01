import "./Table.css";

interface TableProps {
  columns: string[];
  data: React.ReactNode[][];
}

export default function Table({
  columns,
  data,
}: TableProps) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
  {data.length === 0 ? (
    <tr>
      <td className="table-empty" colSpan={columns.length}>
        No records found.
      </td>
    </tr>
  ) : (
    data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <td key={cellIndex}>{cell}</td>
        ))}
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
}