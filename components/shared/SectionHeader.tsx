"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          variants={itemVariants}
          className={cn("inline-flex mb-4", centered ? "justify-center" : "justify-start")}
        >
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: light
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(13, 148, 136, 0.1)",
              color: light ? "#ffffff" : "#0d9488",
              border: light
                ? "1px solid rgba(255, 255, 255, 0.25)"
                : "1px solid rgba(13, 148, 136, 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Decorative dot */}
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                background: light ? "rgba(255,255,255,0.7)" : "#0d9488",
              }}
            />
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className={cn(
          "font-display text-4xl md:text-5xl font-bold leading-tight mb-4",
          light ? "text-white" : ""
        )}
        style={
          !light
            ? { color: "#0f172a" }
            : undefined
        }
      >
        {/* Support gradient text via special marker in title */}
        {title.includes("{{") ? (
          <GradientTitle title={title} light={light} />
        ) : (
          title
        )}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-2xl",
            centered ? "mx-auto" : "",
            light ? "" : "text-slate-500"
          )}
          style={light ? { color: "rgba(255,255,255,0.72)" } : undefined}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        variants={itemVariants}
        className={cn("mt-6 flex", centered ? "justify-center" : "justify-start")}
      >
        <div className="relative h-1 w-16 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: light
                ? "rgba(255,255,255,0.4)"
                : "linear-gradient(90deg, #0d9488, #3b82f6)",
            }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: light
                ? "rgba(255,255,255,0.9)"
                : "linear-gradient(90deg, #0d9488, #3b82f6)",
              width: "40%",
            }}
            animate={
              isInView
                ? { x: ["0%", "150%", "0%"], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }
                : {}
            }
          />
        </div>
        <div
          className="ml-2 h-1 w-3 rounded-full"
          style={{
            background: light ? "rgba(255,255,255,0.3)" : "#3b82f6",
            opacity: 0.5,
          }}
        />
        <div
          className="ml-1.5 h-1 w-1 rounded-full"
          style={{
            background: light ? "rgba(255,255,255,0.2)" : "#0d9488",
            opacity: 0.4,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// Helper to render gradient text for parts of title wrapped in {{ }}
// Usage: title="Our {{Premium}} Services"  → "Premium" gets gradient
function GradientTitle({ title, light }: { title: string; light: boolean }) {
  const parts = title.split(/(\{\{.*?\}\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\{\{(.*?)\}\}$/);
        if (match) {
          return (
            <span
              key={i}
              style={{
                background: light
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                  : "linear-gradient(135deg, #14b8a6, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {match[1]}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

