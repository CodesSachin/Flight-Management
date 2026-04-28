import React from 'react';

/**
 * Reusable TableHeader Component
 * @param {Array} columns - Column configuration array
 * Each column should have: { key: string, label: string, width?: string }
 */
const TableHeader = ({ columns = [] }) => {
  return (
    <thead className="table-light">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="text-uppercase small text-secondary fw-semibold"
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
