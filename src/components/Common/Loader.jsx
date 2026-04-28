import React from 'react';

const Loader = ({ isLoading = false }) => {
  if (!isLoading) return null;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3">
      <div className="spinner-border text-primary" role="status" aria-hidden="true" />
      <p className="text-secondary fw-semibold mb-0">Loading...</p>
    </div>
  );
};

export default Loader;
