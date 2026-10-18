"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import type { Transition, UseInViewOptions, Variant } from "motion/react";

export type InViewProps = {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: React.ElementType;
  once?: boolean;
  className?: string;
  ariaHidden?: boolean;
};

const defaultVariants = {
  hidden: { opacity: 1, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  as = "div",
  once,
  className,
  ariaHidden,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    ...viewOptions,
    once: once ?? viewOptions?.once,
  });
  const reduceMotion = useReducedMotion();

  const MotionComponent = motion[as as keyof typeof motion] as typeof as;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      aria-hidden={ariaHidden}
      initial={false}
      animate={reduceMotion || isInView ? "visible" : "hidden"}
      variants={variants}
      transition={reduceMotion ? { duration: 0 } : transition}
    >
      {children}
    </MotionComponent>
  );
}
