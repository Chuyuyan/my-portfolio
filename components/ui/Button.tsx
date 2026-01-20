import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transition-all",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 border border-gray-300 transition-all",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
  target,
  rel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // Helper to render children with arrow animation
  const renderChildren = (content: ReactNode) => {
    if (typeof content === "string" && content.includes("→")) {
      return (
        <span className="relative inline-flex items-center gap-1">
          <span>{content.replace("→", "").trim()}</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out inline-block">
            →
          </span>
        </span>
      );
    }
    return content;
  };

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          target={target}
          rel={rel}
        >
          {renderChildren(children)}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={combinedClassName}
        target={target}
        rel={rel}
      >
        {renderChildren(children)}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {renderChildren(children)}
    </button>
  );
}
