// src/components/Button.tsx
import React from "react";

export type ButtonVariant = "primary" | "soft" | "outline";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  /**
   * İstersen <Button>Çocuk</Button> yerine <Button label="..."/> kullan.
   * İkisi birden verilirse children önceliklidir.
   */
  label?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  soft: "btn-primary btn-primary--soft",
  outline:
    "border border-brand text-brand bg-white rounded-full py-2.5 px-6 text-sm font-semibold hover:bg-brand-soft transition",
};

export default function Button({
  variant = "primary",
  className = "",
  label,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children ?? label}
    </button>
  );
}
