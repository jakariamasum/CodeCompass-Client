import React, { forwardRef, ReactNode } from "react";

// Define types for Card component
interface CardProps {
  className?: string;
  children: ReactNode;
}

// Card component with TypeScript
export const Card: React.FC<CardProps> = ({ className = "", ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props} />
);

// CardContent component with TypeScript
export const CardContent: React.FC<CardProps> = ({
  className = "",
  ...props
}) => <div className={`p-6 ${className}`} {...props} />;

// CardHeader component with TypeScript
export const CardHeader: React.FC<CardProps> = ({
  className = "",
  ...props
}) => <div className={`px-6 py-4 border-b ${className}`} {...props} />;

// CardTitle component with TypeScript
export const CardTitle: React.FC<CardProps> = ({
  className = "",
  ...props
}) => <h2 className={`text-xl font-semibold ${className}`} {...props} />;

// Avatar component with TypeScript
export const Avatar: React.FC<CardProps> = ({ className = "", ...props }) => (
  <div className={`relative inline-block ${className}`} {...props} />
);

// AvatarImage component with TypeScript and forwardRef
interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className = "", ...props }, ref) => (
    <img
      ref={ref}
      className={`w-full h-full object-cover rounded-full ${className}`}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

// AvatarFallback component with TypeScript
interface AvatarFallbackProps {
  className?: string;
  children: ReactNode;
}
export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  className = "",
  ...props
}) => (
  <div
    className={`flex items-center justify-center w-full h-full bg-gray-200 rounded-full text-gray-600 font-semibold ${className}`}
    {...props}
  />
);

// Input component with TypeScript and forwardRef
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";

// Label component with TypeScript and forwardRef
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => (
    <label
      ref={ref}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";

// Button component with TypeScript and forwardRef
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "outline" | "link";
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseStyles =
      "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
      default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
      link: "text-blue-500 hover:underline",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
