import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>ALEN P. JOSE</strong>
        <p>Additive manufacturing leadership grounded in real production.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/work">Work</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <a href="/resume.pdf" download="Alen-P-Jose-Resume.pdf">
          Résumé
        </a>
      </nav>
      <p>Toronto, Canada</p>
    </footer>
  );
}
