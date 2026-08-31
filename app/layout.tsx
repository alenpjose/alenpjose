import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alenpjose.ca"),
  title: {
    default: "Alen P. Jose | Additive Manufacturing and Production Systems",
    template: "%s | Alen P. Jose",
  },
  description:
    "Additive manufacturing production leadership, application development, operational systems, and practical AI learning grounded in real production experience.",
  openGraph: {
    title: "Alen P. Jose | Additive Manufacturing and Production Systems",
    description:
      "Additive manufacturing production leadership, operational systems, and practical AI learning grounded in real production experience.",
    type: "website",
    url: "https://alenpjose.ca",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
