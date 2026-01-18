"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts (in ms) */
  delay?: number;
  /** Animation duration (in ms) */
  duration?: number;
  /** How far element moves up during reveal (in px) */
  distance?: number;
  /** Threshold for triggering (0-1, how much of element must be visible) */
  threshold?: number;
  /** Whether to animate only once or every time element enters viewport */
  once?: boolean;
  /** HTML tag to render */
  as?: keyof JSX.IntrinsicElements;
}

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  duration = 600,
  distance = 30,
  threshold = 0.1,
  once = true,
  as: Tag = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element reaches viewport bottom
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}

/**
 * Staggered reveal for multiple children
 * Automatically adds incrementing delays to each child
 */
interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  /** Base delay before first animation starts (in ms) */
  baseDelay?: number;
  /** Delay between each child animation (in ms) */
  staggerDelay?: number;
  /** Animation duration (in ms) */
  duration?: number;
  /** How far elements move up during reveal (in px) */
  distance?: number;
  /** Threshold for triggering (0-1) */
  threshold?: number;
}

export function StaggerReveal({
  children,
  className,
  baseDelay = 0,
  staggerDelay = 100,
  duration = 600,
  distance = 30,
  threshold = 0.1,
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <RevealOnScroll
          key={index}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          distance={distance}
          threshold={threshold}
        >
          {child}
        </RevealOnScroll>
      ))}
    </div>
  );
}
