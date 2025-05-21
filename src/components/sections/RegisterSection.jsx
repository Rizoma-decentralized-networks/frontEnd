import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RegisterButton from "../buttons/RegisterButton";
import CancelButton from "../buttons/CancelButton";
import { postUser } from "../../services/apiUsers";
import { Link } from "react-router";

const RegisterSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      userImageUrl: "",
    },
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    console.log("Form data:", userData);

    const result = await postUser(userData);

    if (result.success) {
      console.log("User created successfully:", result.data);
      setSuccess(true);
      reset();
    } else {
      setError(result.error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Join our community and start mapping, sharing and connecting with
            initiatives in your city.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            {error && <div className="alert alert-error">{error}</div>}
            {success && (
              <div className="alert alert-success">
                User registered successfully! You can now log in.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                <label className="label">Username</label>
                <input
                  type="text"
                  className={`input w-full ${
                    errors.username ? "input-error" : ""
                  }`}
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username cannot exceed 30 characters",
                    },
                    pattern: {
                      value: /^[^\s]+$/,
                      message: "Username cannot contain spaces",
                    }
                  })}
                />
                {errors.username && (
                  <div className="text-xs text-error mt-1">
                    {errors.username.message}
                  </div>
                )}

                <label className="label">Email</label>
                <input
                  type="text"
                  className={`input w-full ${errors.email ? "input-error" : ""}`}
                  placeholder="mail@site.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter valid email address",
                    },
                  })}
                />
                {errors.email && errors.email.message && (
                  <div className="text-xs text-error mt-1">
                    {errors.email.message}
                  </div>
                )}

                <label className="label">Password</label>
                <input
                  type="password"
                  className={`input w-full ${errors.password ? "input-error" : ""}`}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      message:
                        "Password must include at least one number, one lowercase and one uppercase letter",
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-xs text-error mt-1">
                    {errors.password.message}
                  </div>
                )}

                <div className="form-control mb-4">
                  <label className="label">Profile image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/my-image.jpg"
                    className={`input input-bordered w-full text-sm ${
                      errors.userImageUrl ? "input-error" : ""
                    }`}
                    {...register("userImageUrl", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: "Please enter a valid URL",
                      },
                    })}
                  />
                  {errors.userImageUrl ? (
                    <div className="text-xs text-error text-left mt-1">
                      {errors.userImageUrl.message}
                    </div>
                  ) : (
                    <div className="validator-hint text-xs text-gray-500 text-left">
                      Optional: Enter your profile image URL
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  <RegisterButton isLoading={isLoading} />
                  <CancelButton onCancel={reset} />
                </div>
                
              </fieldset>
            </form>
            <div className="text-xs text-gray-500 mb-4 mt-2 text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-secondary hover:text-primary-focus"
                  >
                    Login
                  </Link>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
