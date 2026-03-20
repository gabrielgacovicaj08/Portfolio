import { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const COMMAND = "cat gabriel.txt";

const lines = [
  { label: "name", value: "Gabriel Gacovicaj" },
  { label: "role", value: "Software Developer" },
  { label: "location", value: "United States" },
  {
    label: "interests",
    value: "Open source, CLI tools, system design, and dark themes.",
  },
  { label: "fun_fact", value: "Life goal - become an actor." },
];

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typedCmd, setTypedCmd] = useState("");
  const [cmdDone, setCmdDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  // Type the command character by character
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    setTypedCmd("");
    setCmdDone(false);
    setVisibleLines(0);
    const interval = setInterval(() => {
      i++;
      setTypedCmd(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(interval);
        setCmdDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [inView]);

  // Reveal lines one by one after command finishes
  useEffect(() => {
    if (!cmdDone) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setVisibleLines(idx);
      if (idx >= lines.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [cmdDone]);

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
            <p className="terminal-cmd">
              $ {typedCmd}
              {!cmdDone && <span className="terminal-cursor">▋</span>}
            </p>
            {lines.slice(0, visibleLines).map((line) => (
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
