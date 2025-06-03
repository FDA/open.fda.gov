import React from 'react';

type FormatterFn = (cell: any, row: any) => React.ReactNode;

type Props = {
  labels?: string[];
  formatters?: Record<string, FormatterFn>;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (row: any, rowIndex: number) => void;
  cols: string[];
  rows: Record<string, any>[];
};

const Table: React.FC<Props> = ({
  labels,
  formatters = {},
  className = '',
  style = {},
  onClick,
  cols,
  rows
}) => {
  const renderCell = (
    cell: any,
    row: Record<string, any>,
    col: string,
    rowIndex: number,
    colIndex: number
  ) => {
    const formatter = formatters[col];
    return formatter ? formatter(cell, row) : cell;
  };
return (
    <div className="overflow-x-auto w-full">
      <table className={`min-w-full border-collapse table ${className}`}style={style}>
        <thead style={{ textAlign: 'start' }}>
          <tr style={{ textAlign: 'start' }}>
            {(labels ?? cols).map((label, index) => (
              <th style={{ textAlign: 'start' }} key={index}className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onClick?.(row, rowIndex)}
            >
              {cols.map((col, colIndex) => (
                <td key={colIndex}className="px-4 py-2 border-b">
                  {renderCell(row[col], row, col, rowIndex, colIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;