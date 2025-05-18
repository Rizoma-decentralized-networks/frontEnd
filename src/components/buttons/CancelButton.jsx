import React from 'react';

const CancelButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={onClick}
      disabled={disabled}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
