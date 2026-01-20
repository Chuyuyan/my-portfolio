import { type ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "full";

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-4xl", // 896px
  md: "max-w-5xl", // 1024px
  lg: "max-w-7xl", // 1280px
  full: "max-w-full",
};

export default function Container({
  children,
  size = "md",
  className = "",
}: ContainerProps) {
  return (
    <div className={`mx-auto px-6 ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
}
