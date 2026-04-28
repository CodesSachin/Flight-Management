import React from 'react';

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  const variantClassMap = {
    primary: 'btn btn-primary btn-sm',
    success: 'btn btn-success btn-sm',
    danger: 'btn btn-danger btn-sm',
    secondary: 'btn btn-secondary btn-sm',
  };

  return (
    <button
      className={variantClassMap[variant] || 'btn btn-primary btn-sm'}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
};

export default Button;
