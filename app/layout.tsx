import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alen | Manufacturing Systems & Applied Technology",
  description:
    "Portfolio of Alen P. Jose, a Toronto-based Production Manager connecting additive manufacturing, production systems, reliability, digital workflows and applied technology.",
  openGraph: {
    title: "Alen | Manufacturing Systems & Applied Technology",
    description:
      "Production leadership, additive manufacturing systems, operational reliability and applied technology.",
    type: "website",
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
