import React from "react";

export type CardProps = {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Card({ title, subtitle, className, children }: CardProps) {
  return (
    <section className={className}>
      <h3>{title}</h3>
      {subtitle ? <p>{subtitle}</p> : null}
      {children}
    </section>
  );
}

