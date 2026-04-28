import React, { useState, useCallback } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import EditRow from './EditRow';

/**
 * Reusable VirtualTable Component
 * @param {Array} data - The data to display in the table
 * @param {Array} columns - Column configuration array
 * @param {String} idField - Field name that uniquely identifies each row (default: 'id')
 * @param {Function} onRowUpdate - Callback when row is saved
 * @param {Function} onRowDelete - Optional callback when row is deleted
 * @param {Object} editableColumns - Configuration for editable columns
 * @param {Boolean} enableEdit - Whether to show edit functionality (default: true)
 */
const VirtualTable = ({ 
  data = [], 
  columns = [], 
  idField = 'id',
  onRowUpdate = () => {},
  onRowDelete,
  editableColumns = {},
  enableEdit = true,
}) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = useCallback((id) => {
    if (enableEdit) {
      setEditingId(id);
    }
  }, [enableEdit]);

  const handleSave = useCallback((id, updatedData) => {
    onRowUpdate(id, updatedData);
    setEditingId(null);
  }, [onRowUpdate]);

  const handleCancel = useCallback(() => {
    setEditingId(null);
  }, []);

  const handleDelete = useCallback((id) => {
    if (onRowDelete) {
      onRowDelete(id);
    }
  }, [onRowDelete]);

  if (data.length === 0) {
    return (
      <div className="p-5 text-center text-secondary">
        <div className="border rounded-4 bg-light p-4">
          <p>No Flights Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row) =>
            editingId === row[idField] ? (
              <EditRow
                key={row[idField]}
                row={row}
                columns={columns}
                editableColumns={editableColumns}
                idField={idField}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <TableRow
                key={row[idField]}
                row={row}
                columns={columns}
                idField={idField}
                onEdit={handleEdit}
                onDelete={handleDelete}
                enableEdit={enableEdit}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VirtualTable;
