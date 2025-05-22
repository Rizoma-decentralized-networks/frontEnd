import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'neutral', 
  ...props 
}) => {
  const baseStyles = 'btn text-base px-4 py-2';

  const variants = {
    neutral: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost',
    disabled: 'btn-disabled cursor-not-allowed',
  };

  const variantStyle = disabled ? variants.disabled : variants[variant];

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variantStyle}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;