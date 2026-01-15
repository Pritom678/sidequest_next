"use client";

import { useState } from "react";

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleBlur = (e) => {
    setTouched(true);
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const showError = error && touched;

  return (
    <div className={`form-control w-full ${className}`}>
      {label && (
        <label className="label">
          <span
            className={`label-text font-medium ${
              required
                ? "after:content-['*'] after:ml-1 after:text-red-500"
                : ""
            }`}
          >
            {label}
          </span>
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          required={required}
          className={`input input-bordered w-full transition-all duration-200 ${
            showError
              ? "input-error border-red-500 focus:border-red-500"
              : focused
              ? "input-primary border-primary focus:border-primary"
              : "border-gray-300 focus:border-primary"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={
            showError
              ? `${name}-error`
              : helperText
              ? `${name}-helper`
              : undefined
          }
          {...props}
        />

        {type === "password" && value && (
          <button
            type="button"
            onClick={() => {
              const input = document.querySelector(`input[name="${name}"]`);
              input.type = input.type === "password" ? "text" : "password";
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle password visibility"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        )}
      </div>

      {showError && (
        <label className="label">
          <span className="label-text-alt text-error" id={`${name}-error`}>
            {error}
          </span>
        </label>
      )}

      {helperText && !showError && (
        <label className="label">
          <span className="label-text-alt text-gray-500" id={`${name}-helper`}>
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
}
