import React from 'react';

function CancelButton({ onCancel }) {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={onCancel}
    >
      Cancel
    </button>
  );
}

export default CancelButton;
