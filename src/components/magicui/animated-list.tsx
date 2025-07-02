"use client";

import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AnimatedListProps {
  className?: string;
  children: ReactNode;
  delay?: number;
}

export const AnimatedList = ({
  className,
  children,
  delay = 1000,
}: AnimatedListProps) => {
  const [index, setIndex] = useState(0);
  
  const childrenArray = useMemo(
    () => Array.isArray(children) ? children : [children],
    [children]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
    }, delay);

    return () => clearInterval(interval);
  }, [childrenArray.length, delay]);

  const itemsToShow = useMemo(
    () => childrenArray.slice(0, index + 1).reverse(),
    [index, childrenArray],
  );

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <AnimatePresence>
        {itemsToShow.map((item, idx) => (
          <AnimatedListItem key={idx} index={idx}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
};

export function AnimatedListItem({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring" }}
      layout 
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
}