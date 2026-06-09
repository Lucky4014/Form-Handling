// src/validationSchema.js
import * as yup from "yup";

export const registrationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number"),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "You must be at least 18 years old")
    .max(60, "Age must be under 60"),

  gender: yup
    .string()
    .required("Please select a gender"),

  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});