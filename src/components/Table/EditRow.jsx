import React, { useState } from 'react';
import Button from '../Common/Button';

/**
 * Reusable EditRow Component
 * @param {Object} row - The row data object being edited
 * @param {Array} columns - Column configuration
 * @param {Object} editableColumns - Configuration for which columns are editable
 * @param {String} idField - Field name for row identifier
 * @param {Function} onSave - Callback when save is clicked
 * @param {Function} onCancel - Callback when cancel is clicked
 */
const EditRow = ({ 
  row = {}, 
  columns = [],
  editableColumns = {},
  idField = 'id',
  onSave = () => {},
  onCancel = () => {},
}) => {
  const [editedData, setEditedData] = useState(row);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;

    setEditedData(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSave = () => {
    onSave(row[idField], editedData);
  };

  const renderEditInput = (column, value) => {
    const config = editableColumns[column.key] || {};
    const inputType = config.type || column.type || 'text';

    if (column.key === 'actions') {
      return null;
    }

    if (!config.editable && config.editable !== undefined) {
      return <span className="text-secondary">{value || '-'}</span>;
    }

    switch (inputType) {
      case 'select':
        return (
          <select
            name={column.key}
            value={value || ''}
            onChange={handleChange}
            className="form-select form-select-sm"
          >
            {config.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            type="date"
            name={column.key}
            value={value || ''}
            onChange={handleChange}
            className="form-control form-control-sm"
          />
        );

      case 'time':
        return (
          <input
            type="time"
            name={column.key}
            value={value || ''}
            onChange={handleChange}
            className="form-control form-control-sm"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            name={column.key}
            value={value || ''}
            onChange={handleChange}
            className="form-control form-control-sm"
          />
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={column.key}
            checked={value || false}
            onChange={handleChange}
            className="form-check-input"
          />
        );

      case 'textarea':
        return (
          <textarea
            name={column.key}
            value={value || ''}
            onChange={handleChange}
            className="form-control form-control-sm"
            rows={3}
          />
        );

      default:
        return (
          <input
            type="text"
            name={column.key}
            value={value || ''}
            onChange={handleChange}
            className="form-control form-control-sm"
          />
        );
    }
  };

  return (
    <tr className="table-warning">
      {columns.map((column) => (
        <td key={column.key} className="align-middle">
          {column.key === 'actions' ? (
            <div className="d-flex gap-2 flex-wrap">
              <Button
                label="Save"
                onClick={handleSave}
                variant="success"
              />
              <Button
                label="Cancel"
                onClick={onCancel}
                variant="danger"
              />
            </div>
          ) : (
            renderEditInput(column, editedData[column.key])
          )}
        </td>
      ))}
    </tr>
  );
};

export default EditRow;
