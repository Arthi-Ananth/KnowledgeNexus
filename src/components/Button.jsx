import React from 'react';

/**
 * Reusable Button component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} props.variant
 * @param {'sm' | 'md' | 'lg'} props.size
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  id,
  icon,
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-600 shadow-md hover:shadow-primary/40 focus:ring-2 focus:ring-primary/50',
    secondary:
      'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-2 focus:ring-slate-200',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-2 focus:ring-slate-200',
    danger:
      'bg-red-500 text-white hover:bg-red-600 shadow-md focus:ring-2 focus:ring-red-300',
    outline:
      'bg-transparent text-primary border border-primary hover:bg-primary-50 focus:ring-2 focus:ring-primary/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
