import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterButton from '../buttons/RegisterButton';
import CancelButton from '../buttons/CancelButton';
import { postUser } from '../../services/apiUsers';

const RegisterSection = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      userImageUrl: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (userData) => {
    setIsLoading(true);
    setError(null);
    console.log("Form data:", userData);
    
    const result = await postUser(userData);
    
    if (result.success) {
      console.log("User created successfully:", result.data);
      reset(); 
  
    } else {
      setError(result.error.message);
    }
    
    setIsLoading(false);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-[70vh]">
      <div className="bg-white shadow-md p-8 rounded-md w-80 text-center">
        <h1 className="text-lg mb-6">Register</h1>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <input
              type="text"
              placeholder="Username"
              className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
              {...register("username", { 
                required: "Username is required",
                minLength: { value: 3, message: "Username must be at least 3 characters" },
                maxLength: { value: 30, message: "Username cannot exceed 30 characters" }
              })}
            />
            {errors.username && <div className="text-xs text-error text-left mt-1">{errors.username.message}</div>}
          </div>

          <div className="form-control mb-4">
            <input
              type="email"
              placeholder="mail@site.com"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              {...register("email", { 
                required: "Email is required",
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: "Enter valid email address" 
                }
              })}
            />
            {errors.email ? (
              <div className="text-xs text-error text-left mt-1">{errors.email.message}</div>
            ) : (
              <div className="validator-hint text-xs text-gray-500 text-left">Enter valid email address</div>
            )}
          </div>

          <div className="form-control mb-2">
            <input
              type="password"
              className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              placeholder="Password"
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: { 
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 
                  message: "Password must include at least one number, one lowercase and one uppercase letter" 
                }
              })}
            />
            
            {errors.password ? (
              <div className="text-xs text-error text-left mt-1">{errors.password.message}</div>
            ) : (
              <p className="validator-hint text-xs text-gray-500 mb-4 text-left">
                Must be more than 8 characters, including
                <br/>• At least one number
                <br/>• At least one lowercase letter
                <br/>• At least one uppercase letter
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-sm text-gray-600">Profile image URL</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/my-image.jpg"
              className={`input input-bordered w-full text-sm ${errors.userImageUrl ? 'input-error' : ''}`}
              {...register("userImageUrl", { 
                pattern: { 
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 
                  message: "Please enter a valid URL" 
                }
              })}
            />
            {errors.userImageUrl ? (
              <div className="text-xs text-error text-left mt-1">{errors.userImageUrl.message}</div>
            ) : (
              <div className="validator-hint text-xs text-gray-500 text-left">Optional: Enter your profile image URL</div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <RegisterButton 
              isLoading={isLoading}
            />
            
            <CancelButton
              onClick={handleClear}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterSection;
