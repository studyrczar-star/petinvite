
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white',
    secondary: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    accent: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      className={`
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        px-8 py-4 rounded-2xl font-fredoka font-bold text-xl transition-all active:translate-y-1 shadow-lg disabled:opacity-50 disabled:translate-y-0
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
