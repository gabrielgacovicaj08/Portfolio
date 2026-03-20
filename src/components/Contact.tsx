import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    label: "github",
    href: "https://github.com/gabrielgacovicaj08",
    display: "github.com/gabrielgacovicaj08",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/gabriel-g-86a359139",
    display: "linkedin.com/in/gabrielgacovicaj",
  },
  {
    label: "email",
    href: "mailto:ggacovicaj@gmail.com",
    display: "ggacovicaj@gmail.com",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !rowsRef.current) return;
    const rows = gsap.utils.toArray<HTMLElement>(".contact-row");
    if (rows.length === 0) return;
    gsap.fromTo(
      rows,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <h2 className="section-heading glitch">// contact</h2>

      <div className="contact-prompt">$ connect --with gabriel</div>

      <div className="contact-links" ref={rowsRef}>
        {links.map(({ label, href, display }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-row"
          >
            <span className="contact-arrow">{">"}</span>
            <span className="contact-label">{label}</span>
            <span className="contact-dots"> ............. </span>
            <span className="contact-display">{display}</span>
            <span className="contact-arrow-right">→</span>
          </a>
        ))}
      </div>

      <footer className="contact-footer">
        © 2026 Gabriel Gacovicaj // built with React + ♥
      </footer>
    </section>
  );
}
