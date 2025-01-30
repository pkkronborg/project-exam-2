import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the validation schema
const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .matches(
        /^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/,
        "Email must be a @stud.noroff.no email"
      )
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    venueManager: yup.boolean(),
  })
  .required();

function RegisterForm({ onSubmit }) {
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
        {/* Name Field */}
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            {...register("name")}
            placeholder="Enter your name"
          />
          <p className="text-danger">{errors.name?.message}</p>
        </div>

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

        {/* Venue Manager Checkbox */}
        <div className="form-check">
          <label className="form-check-label">Venue Manager</label>
          <input
            type="checkbox"
            className="form-check-input"
            {...register("venueManager")}
            id="venueManager"
          />
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
