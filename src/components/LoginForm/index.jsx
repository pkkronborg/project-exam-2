import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the validation schema
const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100 px-3">
        {/* Email Field */}
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            {...register("email")}
            placeholder="Enter your email"
          />
          <p className="text-danger">{errors.email?.message}</p>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
            placeholder="Enter your password"
          />
          <p className="text-danger">{errors.password?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button className="btn btn-primary" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
