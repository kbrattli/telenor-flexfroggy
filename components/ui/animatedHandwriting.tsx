import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

type AnimatedHandwritingProps = {
  /** The full text to reveal. Use \n for line breaks. */
  text: string;
  /** Seconds to wait before starting the animation. */
  delay?: number;
  /** Seconds between each letter (smaller = faster). */
  speed?: number;
  /** Extra classes (font, color, size, etc.). */
  className?: string;
  /** Called when the whole text has finished animating. */
  onDone?: () => void;
};

export default function AnimatedHandwriting({
                                              text,
                                              delay = 0.3,
                                              speed = 0.02,
                                              className,
                                              onDone,
                                            }: AnimatedHandwritingProps) {
  const prefersReduced = useReducedMotion();
  const letters = React.useMemo(() => Array.from(text), [text]);

  // If the user prefers reduced motion, just render the plain text with line breaks.
  if (prefersReduced) {
    return (
        <span className={className}>
        {text.split("\n").map((chunk, i, arr) => (
            <React.Fragment key={i}>
              {chunk}
              {i < arr.length - 1 ? <br /> : null}
            </React.Fragment>
        ))}
      </span>
    );
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        delay,
        staggerChildren: speed,
      },
    },
    exit: {
      transition: {
        staggerChildren: speed,
        staggerDirection: -1, // reverse order
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 2, rotate: -0.3 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.12, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -2,
      rotate: 0,
      transition: { duration: 0.1, ease: "easeIn" },
    },
  };

  return (
      <span className={`inline-flex items-start ${className || ""}`}>
      <motion.span
          role="text"
          initial="hidden"
          animate="visible"
          variants={container}
          className="inline-block"
          onAnimationComplete={onDone}
      >
        {letters.map((char, i) => {
          if (char === "\n") {
            // Real line break (no animation)
            return <br key={`br-${i}`} />;
          }
          return (
              <motion.span
                  key={i}
                  variants={child}
                  className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
          );
        })}
      </motion.span>
    </span>
  );
}
