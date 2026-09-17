"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#advantages", label: "Преимущества" },
  { href: "#format", label: "Формат" },
  { href: "#teachers", label: "Преподаватели" },
  { href: "#pricing", label: "Цены" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="logo">
          <span aria-hidden className="logo__glow" />
          <span className="logo__text">Учи</span>
          <span className="logo__accent"><span className="logo__dot">.</span>ру</span>
          <span aria-hidden className="logo__shimmer" />
        </a>

        <nav className="header__nav">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="header__nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="#pricing" className="header__cta">Записаться</a>
          <button className="header__burger" onClick={() => setOpen(!open)} aria-label="Меню">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <nav className="container mobile-menu__inner">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="mobile-menu__link">
                {l.label}
              </a>
            ))}
            <a href="#pricing" onClick={() => setOpen(false)} className="mobile-menu__cta">Записаться</a>
          </nav>
        </div>
      )}
    </header>
  );
}