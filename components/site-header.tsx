"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isCurrent(href: string) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="site-brand" href="/" onClick={() => setOpen(false)}>
          <strong>ALEN P. JOSE</strong>
          <span>Additive manufacturing and production systems</span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? " ×" : " +"}</span>
        </button>
        <nav
          id="primary-navigation"
          className={`primary-navigation${open ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href="/resume.pdf" download="Alen-P-Jose-Resume.pdf">
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
