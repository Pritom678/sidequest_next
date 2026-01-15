"use client";

import { useState } from "react";

export default function MobileOptimizedCard({
  children,
  className = "",
  onClick,
  href,
  disabled = false,
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    if (href) {
      window.location.href = href;
    }
  };

  const cardClasses = `
    relative 
    bg-white 
    dark:bg-gray-900 
    rounded-2xl 
    shadow-lg 
    border 
    border-gray-200 
    dark:border-gray-700
    transition-all 
    duration-200 
    ease-out
    cursor-pointer
    select-none
    ${
      isPressed
        ? "scale-95 shadow-md"
        : isHovered
        ? "scale-[1.02] shadow-2xl"
        : "shadow-lg"
    }
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick || href ? "button" : "article"}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          handleClick(e);
        }
      }}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
}
