import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../validationSchema";
import { useState } from "react";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const {
    register,           // connects input to form
    handleSubmit,       // wraps your onSubmit
    formState: { errors, isSubmitting },  // errors object
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema), // Yup se connect
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setFormData(data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="success-box">
        <h2>✅ Registration Successful!</h2>
        <p>Welcome, <strong>{formData.fullName}</strong>!</p>
        <button onClick={() => setSubmitted(false)}>Register Again</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container" noValidate>
      <h2>📋 Registration Form</h2>

      {/* Full Name */}
      <div className="field">
        <label>Full Name</label>
        <input {...register("fullName")} placeholder="Enter your full name" />
        {errors.fullName && <p className="error">⚠ {errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div className="field">
        <label>Email</label>
        <input {...register("email")} type="email" placeholder="you@example.com" />
        {errors.email && <p className="error">⚠ {errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div className="field">
        <label>Phone Number</label>
        <input {...register("phone")} placeholder="10-digit mobile number" />
        {errors.phone && <p className="error">⚠ {errors.phone.message}</p>}
      </div>

      {/* Password */}
      <div className="field">
        <label>Password</label>
        <input {...register("password")} type="password" placeholder="Min 8 chars, 1 uppercase, 1 number" />
        {errors.password && <p className="error">⚠ {errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="field">
        <label>Confirm Password</label>
        <input {...register("confirmPassword")} type="password" placeholder="Re-enter password" />
        {errors.confirmPassword && <p className="error">⚠ {errors.confirmPassword.message}</p>}
      </div>

      {/* Age */}
      <div className="field">
        <label>Age</label>
        <input {...register("age")} type="number" placeholder="18–60" />
        {errors.age && <p className="error">⚠ {errors.age.message}</p>}
      </div>

      {/* Gender */}
      <div className="field">
        <label>Gender</label>
        <select {...register("gender")}>
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="error">⚠ {errors.gender.message}</p>}
      </div>

      {/* Terms */}
      <div className="field checkbox-field">
        <label>
          <input {...register("terms")} type="checkbox" />
          &nbsp; I agree to the Terms & Conditions
        </label>
        {errors.terms && <p className="error">⚠ {errors.terms.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Register Now"}
      </button>
    </form>
  );
}
