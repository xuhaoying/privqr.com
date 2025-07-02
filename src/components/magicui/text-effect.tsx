"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextEffectProps {
  children: string;
  per?: "word" | "char" | "line";
  as?: React.ElementType;
  variants?: Variants;
  className?: string;
  preset?: 
    | "blur"
    | "shake"
    | "scale"
    | "fade"
    | "slide"
    | "fade-in-blur";
}

const presetVariants = {
  blur: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
  "fade-in-blur": {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(12px)", y: 24 },
      visible: { 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0,
        transition: { type: "spring", bounce: 0.3, duration: 0.6 }
      },
    },
  },
  shake: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
    },
    item: {
      hidden: { opacity: 0, x: -10 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { type: "spring", stiffness: 900, damping: 30 }
      },
    },
  },
  scale: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
    },
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { type: "spring", stiffness: 900, damping: 30 }
      },
    },
  },
  fade: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
    },
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 900, damping: 30 }
      },
    },
  },
} as const;

export function TextEffect({
  children,
  per = "word",
  as: Component = "div",
  variants,
  className,
  preset = "fade-in-blur",
}: TextEffectProps) {
  const selectedVariants = variants || presetVariants[preset as keyof typeof presetVariants] || presetVariants["fade-in-blur"];
  const MotionComponent = motion(Component);
  const words = children.split(" ");

  if (per === "word") {
    return (
      <MotionComponent
        className={className}
        initial="hidden"
        animate="visible"
        variants={selectedVariants.container as any}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={selectedVariants.item as any}
            className="inline-block"
          >
            {word + (i < words.length - 1 ? "\u00A0" : "")}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  if (per === "char") {
    return (
      <MotionComponent
        className={className}
        initial="hidden"
        animate="visible"
        variants={selectedVariants.container as any}
      >
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={selectedVariants.item as any}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      animate="visible"
      variants={selectedVariants.container as any}
    >
      <motion.span variants={selectedVariants.item as any}>
        {children}
      </motion.span>
    </MotionComponent>
  );
}