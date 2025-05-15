import React from 'react';

const CreateUserButton = ({ onSubmit, isLoading }) => {
  return (
    <button
      type="submit"
      className="btn btn-sm btn-primary"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner"></span>
          Loading...
        </>
      ) : (
        'Register'
      )}
    </button>
  );
};

export default CreateUserButton;
