import React from 'react';

const RegisterButton = ({ onSubmit, isLoading }) => {
  
  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner"></span>
          Registering...
        </>
      ) : (
        'Register'
      )}
    </button>
  );
};

export default RegisterButton;
