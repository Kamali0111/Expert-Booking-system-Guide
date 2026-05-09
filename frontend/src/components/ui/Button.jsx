import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded-2xl shadow-soft';
  const variants = {
    primary:
      'bg-gradient-primary text-white hover:scale-[1.03] hover:shadow-lg',
    accent:
      'bg-gradient-accent text-white hover:scale-[1.03] hover:shadow-lg',
    glass:
      'bg-glass backdrop-blur-md text-primary hover:bg-white/80 border border-white/30',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.04 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      )}
      {children}
    </motion.button>
  );
}
