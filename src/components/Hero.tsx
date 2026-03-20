import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    let cols = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(cols).fill(1);

    const draw = () => {
      const currentCols = Math.floor(canvas.width / fontSize);
      if (currentCols !== cols) {
        cols = currentCols;
        drops = Array(cols).fill(1);
      }

      ctx.fillStyle = "rgba(10, 26, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 65, 0.15)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-prompt">$ whoami</p>
        <h1 className="hero-name glitch">Gabriel Gacovicaj</h1>
        <div className="hero-type-row">
          <TypeAnimation
            sequence={[
              "Software Engineer_",
              2000,
              "Open Source Contributor_",
              2000,
              "Terminal Enthusiast_",
              2000,
            ]}
            speed={80}
            repeat={Infinity}
            className="hero-typewriter"
            cursor={false}
          />
          <span className="hero-cursor" aria-hidden="true" />
        </div>
      </div>
      <button
        className="hero-chevron"
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
      >
        <span className="hero-chevron-icon">⌄</span>
      </button>
    </section>
  );
}
