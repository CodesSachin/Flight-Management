import React from 'react';
import Button from '../Common/Button';

/**
 * Reusable TableRow Component
 * @param {Object} row - The row data object
 * @param {Array} columns - Column configuration
 * @param {String} idField - Field name for row identifier
 * @param {Function} onEdit - Callback when edit is clicked
 * @param {Function} onDelete - Optional callback when delete is clicked
 * @param {Boolean} enableEdit - Whether to show edit button
 */
const TableRow = ({ 
  row = {}, 
  columns = [], 
  idField = 'id',
  onEdit = () => {},
  onDelete,
  enableEdit = true,
}) => {
  const renderCellContent = (column, value) => {
    // Use custom renderer if provided
    if (column.render) {
      return column.render(value, row);
    }

    // Default rendering based on data type
    if (column.type === 'date') {
      const date = new Date(value);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    if (column.type === 'boolean') {
      return value ? '✓' : '✗';
    }

    return value || '-';
  };

  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className="align-middle">
          {column.key === 'actions' ? (
            <div className="d-flex gap-2 flex-wrap">
              {enableEdit && (
                <Button
                  label="Edit"
                  onClick={() => onEdit(row[idField])}
                  variant="primary"
                />
              )}
              {onDelete && (
                <Button
                  label="Delete"
                  onClick={() => onDelete(row[idField])}
                  variant="danger"
                />
              )}
            </div>
          ) : (
            renderCellContent(column, row[column.key])
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
