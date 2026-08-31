import Link from "next/link";

export default function NotFound() {
  return <section className="not-found page-section"><p className="eyebrow">404</p><h1>This page is not part of the portfolio.</h1><p>The entry may have moved, or it may not have enough evidence for a public detail page.</p><Link className="button button-primary" href="/">Return home</Link></section>;
}
