import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className }: RevealProps) {
  return <div className={["reveal-enter", className].filter(Boolean).join(" ")}>{children}</div>;
}
