import { Link } from "react-router-dom";
import type { ButtonProps } from "./Button.types";

  const variantClass = {
    primary: "bg-base text-white transition-all duration-300 max-lg:active:bg-base-hover max-lg:active:scale-95 max-lg:active:text-text-base-hover lg:hover:bg-base-hover lg:hover:text-text-base-hover",
    secondary: "bg-base-soft/60 text-white transition-all duration-200 hover:bg-base-soft/80 hover:scale-105 active:scale-95",
    cta: "bg-blue-cta text-white transition-all duration-300 max-lg:active:bg-blue-cta-hover max-lg:active:scale-95 lg:hover:bg-blue-cta-hover lg:hover:scale-105",
    transparent: "bg-transparent",
    danger: "bg-red-600 text-white transition-all duration-300 max-lg:active:bg-red-700 max-lg:active:scale-95 lg:hover:bg-red-700 lg:hover:scale-105"
  };

export function Button(props: ButtonProps) {
  const { children, icon, className = "", variant = "transparent", as = "button" } = props;

  const classPattern = `${variantClass[variant]} ${className}`.trim();

  if (as === "a") {
    const { href, ...rest } = props as Extract<ButtonProps, { as: "a" }>;
    // Utility type do TypeScript : Extract<...>
    // extraia um tipo de dentro do ButtonProps onde as = "a"
    // type Resultado = ButtonAsAnchor;

    return (
      <a href={href} {...rest} className={classPattern}>
        {icon}
        {children}
      </a>
    );
  }

  if (as === "link") {
    const { href, ...rest } = props as Extract<ButtonProps, { as: "link" }>;
    return (
      <Link {...rest} to={href} className={classPattern}>
        {icon}
        {children}
      </Link>
    );
  }

  const { ...rest } = props as Extract<ButtonProps, { as?: "button" }>;

  return (
    <button {...rest} className={`${classPattern} cursor-pointer`}>
      {icon}
      {children}
    </button>
  );
}
