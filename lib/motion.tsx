"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const softEase = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, transition: { duration: 0.55, ease: softEase }, y: 0 },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: softEase } },
};

export const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, transition: { duration: 0.55, ease: softEase }, x: 0 },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

type MotionDivProps = HTMLMotionProps<"div">;

export function FadeUp({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={fadeUpVariants}
      viewport={{ amount: 0.2, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

export function FadeIn({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={fadeInVariants}
      viewport={{ amount: 0.2, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

export function SlideIn({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={slideInVariants}
      viewport={{ amount: 0.2, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

export function StaggerContainer({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      variants={staggerContainerVariants}
      viewport={{ amount: 0.2, once: true }}
      whileInView="show"
      {...props}
    />
  );
}

export function HoverLift({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      transition={{ duration: 0.22, ease: softEase }}
      whileHover={{ y: -6 }}
      {...props}
    />
  );
}
