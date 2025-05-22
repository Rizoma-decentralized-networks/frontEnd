function InputField({ 
  label, 
  name, 
  register, 
  error, 
  required = true,
  validations = {},
  type = "text",
  placeholder = "",
  className = "input input-secondary w-full",
  helpText
}) {
  return (
    <div>
      <label className="label">
        {label}
        {helpText && <span className="text-xs text-gray-500 ml-1">{helpText}</span>}
      </label>
      <input
        type={type}
        {...register(name, { 
          required: required ? `${label} is required` : false,
          ...validations
        })}
        placeholder={placeholder}
        className={`${className} ${error ? 'input-error' : ''}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default InputField;
