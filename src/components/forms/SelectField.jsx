function SelectField({ 
  label, 
  name, 
  options, 
  register, 
  error, 
  required = true, 
  defaultValue = "", 
  className = "select select-secondary w-full"
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <select
        {...register(name, { 
          required: required ? `${label} is required` : false 
        })}
        className={className}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value} 
            disabled={option.disabled || false}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default SelectField;
  