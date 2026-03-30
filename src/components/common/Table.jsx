const Table = ({ headers, rows, emptyMessage = "No data found." }) => (
  <div className="overflow-x-auto rounded-2xl border border-secondary-300/80 bg-white/95 dark:border-secondary-700/80 dark:bg-secondary-900/70">
    <table className="min-w-full text-left text-sm text-secondary-800 dark:text-secondary-100">
      <thead className="border-b border-secondary-300/80 bg-secondary-100 dark:border-secondary-700/80 dark:bg-secondary-800">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-4 py-3 font-semibold text-secondary-700 dark:text-secondary-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, index) => (
            <tr
              key={index}
              className="border-t border-secondary-200/70 transition hover:bg-secondary-50/70 dark:border-secondary-700/70 dark:hover:bg-secondary-800/60"
            >
              {row.map((cell, cellIndex) => (
                <td key={`${index}-${cellIndex}`} className="px-4 py-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length}
              className="px-4 py-6 text-center text-secondary-500 dark:text-secondary-400"
            >
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
