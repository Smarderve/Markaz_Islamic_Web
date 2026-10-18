import { motion, useReducedMotion } from "motion/react";

type BlurTextProps = {
  text: string;
  animateBy?: "words";
  className?: string;
  delay?: number;
  stepDuration?: number;
  blur?: number;
  distance?: number;
  trigger?: "load";
};

/** Markaz-authored phrase entrance using Motion for React. Words stay intact,
 * including Arabic shaping and attached tashkīl. */
export default function BlurText({
  text,
  className = "",
  delay = 0,
  stepDuration = 0.4,
  blur = 3,
  distance = 5,
}: BlurTextProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={`blur-text ${className}`.trim()}>{text}</span>;

  const words = text.split(/(\s+)/u);
  let wordIndex = 0;

  return (
    <span className={`blur-text ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((part, index) => {
          if (/^\s+$/u.test(part)) return <span key={`space-${index}`}>{part}</span>;
          const rank = wordIndex++;
          return (
            <motion.span
              className="inline-block"
              data-animated-word="true"
              key={`word-${index}`}
              initial={{ opacity: 0, y: distance, filter: `blur(${blur}px)` }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: stepDuration,
                delay: (Math.max(0, delay) / 1000) * rank,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {part}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
