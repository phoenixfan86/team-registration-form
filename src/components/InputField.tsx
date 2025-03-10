import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, className = "", ...props }, ref) => {
    return (
      <input
        type="text"
        id={id}
        ref={ref}
        className={`input-field hover:border-blue-800 focus:outline-none focus:border-1 focus:border-blue-800 ${className}`}
        {...props}
      />
    );
  }
);

export default InputField;
