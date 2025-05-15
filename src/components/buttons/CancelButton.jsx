import React from 'react';

const CancelButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className="btn btn-sm bg-secondary text-white border-none hover"
      onClick={onClick}
      disabled={disabled}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
