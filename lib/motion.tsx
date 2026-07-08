"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const softEase = [0.22, 1, 0.36, 1] as const;
const bounceEase = [0.34, 1.56, 0.64, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: softEase } },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: softEase } },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: softEase } },
};

export const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: softEase } },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: softEase } },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

type MotionDivProps = HTMLMotionProps<"div">;

/** Fades up from below — use for section content, cards, list items */
export function FadeUp({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={fadeUpVariants}
      viewport={{ amount: 0.15, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

/** Simple opacity fade — use for overlays, images */
export function FadeIn({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={fadeInVariants}
      viewport={{ amount: 0.15, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

/** Scales in from slightly smaller — use for modals, dialogs, popovers */
export function ScaleIn({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={scaleInVariants}
      viewport={{ amount: 0.15, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

/** Slides in from left — use for sidebar items, list entries */
export function SlideIn({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={slideInVariants}
      viewport={{ amount: 0.15, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

/** Slides in from right */
export function SlideInRight({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={slideInRightVariants}
      viewport={{ amount: 0.15, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

/** Staggers children animations — wrap around lists of FadeUp/SlideIn items */
export function StaggerContainer({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={staggerContainerVariants}
      viewport={{ amount: 0.1, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

/** Lifts card on hover — use for interactive cards and floating callouts */
export function HoverLift({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      transition={{ duration: 0.2, ease: softEase }}
      whileHover={{ y: -5, scale: 1.01 }}
      {...props}
    />
  );
}

/** Subtle press effect — use for buttons and clickable tiles */
export function HoverPress({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      transition={{ duration: 0.15, ease: softEase }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    />
  );
}

/** Bouncy pop-in — use for badges, notifications, success states */
export function PopIn({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: bounceEase }}
      {...props}
    />
  );
}
