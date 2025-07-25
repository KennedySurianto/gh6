"use client";

import { useEffect, useState } from "react";

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], .cursor-hover')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor with logo colors */}
      <div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${
            mousePosition.y - 12
          }px) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      {/* Trailing cursor with flame effect */}
      <div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-orange-300/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 24}px, ${
            mousePosition.y - 24
          }px) scale(${isHovering ? 1.2 : 1})`,
          background: isHovering
            ? "radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)"
            : "transparent",
        }}
      />
    </>
  );
}
