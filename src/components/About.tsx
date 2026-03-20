import { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const lines = [
  { label: "name", value: "Gabriel Gacovicaj" },
  { label: "role", value: "Software Developer" },
  {
    label: "bio",
    value:
      "Passionate about building fast, accessible web apps that users love.",
  },
  {
    label: "interests",
    value: "Open source, CLI tools, system design, and dark themes.",
  },
  {
    label: "fun_fact",
    value: "Life-goal of mine is becomin an Actor.",
  },
];

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const BIO =
  "Hey, I'm Gabriel — a Software Developer based in the US. I love building fast, accessible web apps and have a thing for clean interfaces, dark themes, and tools that just work. When I'm not coding, I'm probably daydreaming about becoming an actor.";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    setTyped("");
    setDone(false);
    const interval = setInterval(() => {
      i++;
      setTyped(BIO.slice(0, i));
      if (i >= BIO.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="about" className="about-section" ref={ref}>
      <h2 className="section-heading glitch">// about</h2>

      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="terminal-window">
          <div className="terminal-topbar">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green-dot" />
            <span className="terminal-title">~/about/gabriel.txt</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-cmd">$ cat gabriel.txt</p>
            <p className="terminal-line">
              <span className="terminal-arrow">&gt;</span>{" "}
              <span className="terminal-bio">
                {typed}
                {!done && <span className="terminal-cursor">▋</span>}
              </span>
            </p>
            {lines.map((line) => (
              <p key={line.label} className="terminal-line">
                <span className="terminal-arrow">&gt;</span>{" "}
                <span className="terminal-key">{line.label}:</span> {line.value}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
