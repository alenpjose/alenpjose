import type { ReactNode } from "react";

export function ResumeLink({
  children = "View résumé",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href="/resume.pdf" download="Alen-P-Jose-Resume.pdf">
      {children}
    </a>
  );
}
