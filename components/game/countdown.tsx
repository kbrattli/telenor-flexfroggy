import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const romanNumerals = ["Charge!", "I", "II", "III"];

type CountdownProps = { onComplete?: () => void };

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const start = useMemo(() => romanNumerals.length - 1, []);
  const [count, setCount] = useState<number>(start);

  useEffect(() => {
    if (count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    if (count === 0) {
      // keep "Charge!" on screen for 1 second
      const done = setTimeout(() => onComplete?.(), 1500);
      return () => clearTimeout(done);
    }
  }, [count, onComplete]);

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100svh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    zIndex: 9999,
    overflow: "hidden",
  };

  const numeralStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: "12rem",
    fontWeight: 700,
    color: "white",
    userSelect: "none",
    lineHeight: 1,
    textShadow: "0 0 18px rgba(255,255,255,0.3)", // subtle glow
  };

  // text animation (enter/pop, settle, exit)
  const numeralVariants = {
    enter: { opacity: 0, y: 20, scale: 0.7, filter: "blur(6px)" },
    center: {
      opacity: 1,
      y: 0,
      scale: 1.1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 280, damping: 18 },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.7,
      filter: "blur(6px)",
      transition: { duration: 0.22, ease: "easeIn" },
    },
  } as const;

  // background flash ring each tick
  const flashVariants = {
    init: { opacity: 0.25, scale: 0.2 },
    show: { opacity: 0, scale: 3, transition: { duration: 0.45, ease: "easeOut" } },
  } as const;

  const isFinal = count === 0;

  return (
      <div style={containerStyle} role="timer" aria-live="polite">
        {/* Flash ring on every change */}
        <AnimatePresence mode="popLayout">
          <motion.div
              key={`flash-${count}`}
              initial="init"
              animate="show"
              exit={{ opacity: 0 }}
              variants={flashVariants}
              style={{
                position: "absolute",
                width: 320,
                height: 320,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.35)",
                boxShadow: "0 0 120px 40px rgba(255,255,255,0.06)",
              }}
          />
        </AnimatePresence>

        {/* Numeral */}
        <AnimatePresence mode="wait">
          <motion.div
              key={count}
              variants={numeralVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                ...numeralStyle,
                // make "Charge!" punchier
                letterSpacing: isFinal ? "0.05em" : undefined,
                transformOrigin: "center",
              }}
              transition={{ duration: 0.28 }}
          >
            {romanNumerals[count] ?? romanNumerals[0]}
          </motion.div>
        </AnimatePresence>

        {/* Optional white flash on final */}
        <AnimatePresence>
          {isFinal && (
              <motion.div
                  key="white-flash"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, repeat: 1, repeatType: "reverse" }}
                  style={{ position: "absolute", inset: 0, background: "white", pointerEvents: "none" }}
              />
          )}
        </AnimatePresence>
      </div>
  );
};

export default Countdown;
