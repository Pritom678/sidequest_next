import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    // Modern Primary - Enhanced gradient with depth
    default:
      "relative bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 text-white font-medium border-0 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/25 before:via-white/10 before:to-transparent before:rounded-inherit before:opacity-0 hover:before:opacity-100 transition-all duration-300 after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-r after:from-white/10 after:to-transparent after:blur-sm after:opacity-0 hover:after:opacity-100",

    // Vibrant Neon - Enhanced glow with better colors
    primary:
      "relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold border-0 shadow-lg hover:shadow-2xl hover:shadow-purple-500/40 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:via-white/15 before:to-transparent before:rounded-inherit before:opacity-0 hover:before:opacity-100 transition-all duration-300 after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-r after:from-purple-300/30 after:to-indigo-300/30 after:blur-lg after:opacity-0 hover:after:opacity-100",

    // Sleek Metallic - Modern metal finish
    secondary:
      "relative bg-gradient-to-br from-zinc-700 via-zinc-600 to-zinc-800 hover:from-zinc-800 hover:via-zinc-700 hover:to-zinc-900 text-white font-medium border-0 shadow-lg hover:shadow-2xl hover:shadow-zinc-500/30 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/20 before:via-white/10 before:to-transparent before:rounded-inherit after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-br after:from-transparent after:via-white/10 after:to-white/20 after:opacity-0 hover:after:opacity-100",

    // Fresh Success - Enhanced green with better gradients
    success:
      "relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-medium border-0 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/40 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/25 before:via-white/15 before:to-transparent before:rounded-inherit after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-br after:from-emerald-300/20 after:to-green-300/20 after:blur-md after:opacity-0 hover:after:opacity-100",

    // Vibrant Warning - Enhanced sunset colors
    warning:
      "relative bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white font-medium border-0 shadow-lg hover:shadow-2xl hover:shadow-orange-500/40 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/25 before:via-white/15 before:to-transparent before:rounded-inherit after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-br after:from-amber-300/20 after:to-orange-300/20 after:blur-md after:opacity-0 hover:after:opacity-100",

    // Bold Error - Enhanced red with better contrast
    error:
      "relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 hover:from-red-700 hover:via-rose-700 hover:to-pink-700 text-white font-medium border-0 shadow-lg hover:shadow-2xl hover:shadow-red-500/40 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/25 before:via-white/15 before:to-transparent before:rounded-inherit after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-br after:from-red-300/20 after:to-rose-300/20 after:blur-md after:opacity-0 hover:after:opacity-100",

    // Modern Outline - Borderless design
    outline:
      "relative bg-transparent text-blue-600 dark:text-blue-400 font-medium border-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10 before:rounded-inherit before:opacity-0 hover:before:opacity-100 transition-all duration-300 after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-r after:from-blue-200/5 after:to-purple-200/5 after:blur-sm after:opacity-0 hover:after:opacity-100",

    // Subtle Ghost - Enhanced hover effects
    ghost:
      "relative bg-transparent text-gray-700 dark:text-gray-300 font-medium border-0 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-200/50 before:to-gray-300/50 dark:before:from-gray-700/50 dark:before:to-gray-600/50 before:rounded-inherit before:opacity-0 hover:before:opacity-100 transition-all duration-300 after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-r after:from-gray-100/20 after:to-gray-200/20 dark:after:from-gray-800/20 dark:after:to-gray-700/20 after:blur-sm after:opacity-0 hover:after:opacity-100",

    // Fluid Link - Enhanced with better animations
    link: "relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium border-0 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/5 before:to-purple-500/5 before:rounded-inherit before:opacity-0 hover:before:opacity-100",

    // Modern Neutral - Enhanced dark theme
    neutral:
      "relative bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 text-white font-medium border-0 shadow-lg hover:shadow-2xl hover:shadow-gray-500/30 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/20 before:via-white/10 before:to-transparent before:rounded-inherit after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-br after:from-gray-500/20 after:to-gray-600/20 after:blur-md after:opacity-0 hover:after:opacity-100",
  },
  size: {
    xs: "px-2 py-1 text-xs rounded-md",
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-2xl",
    xl: "px-8 py-4 text-lg rounded-2xl",
  },
};

const ModernButton = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "md",
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center",
          "font-medium transition-all duration-300 ease-out",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "focus:ring-blue-500/50 dark:focus:ring-blue-400/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "disabled:hover:scale-100 disabled:active:scale-100",
          "relative overflow-hidden group",
          "border-0",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {/* Enhanced shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>

        {/* Enhanced pulse effect for primary buttons */}
        {variant === "primary" && (
          <div className="absolute inset-0 rounded-inherit animate-pulse bg-gradient-to-r from-purple-600/15 to-pink-600/15 pointer-events-none"></div>
        )}

        {/* Enhanced loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-inherit">
            <div className="relative">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-5 h-5 border-2 border-transparent border-t-white/60 rounded-full animate-spin animation-delay-150"></div>
            </div>
          </div>
        )}

        {/* Enhanced button content */}
        <span
          className={cn(
            "relative z-10 flex items-center gap-2",
            loading && "opacity-0"
          )}
        >
          {children}
        </span>

        {/* Enhanced inner glow */}
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-t from-transparent via-white/10 to-white/5 pointer-events-none"></div>
      </button>
    );
  }
);

ModernButton.displayName = "ModernButton";

export default ModernButton;
