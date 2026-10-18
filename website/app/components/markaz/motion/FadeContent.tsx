import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type FadeContentProps = {
  children?: ReactNode;
  className?: string;
  effect?: "fade";
  duration?: number;
  initialOpacity?: number;
  once?: boolean;
  trigger?: "scroll" | "mount";
};

/** Markaz-authored, reduced-motion-aware section reveal using Motion for React.
 * Its visible DOM remains readable when scripting or intersection observers fail. */
export default function FadeContent({
  children,
  duration = 0.5,
  initialOpacity = 0,
  once = true,
  trigger = "scroll",
  className,
}: FadeContentProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: initialOpacity, y: 12 }}
      whileInView={reduceMotion || trigger === "mount" ? undefined : { opacity: 1, y: 0 }}
      animate={reduceMotion || trigger === "scroll" ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
