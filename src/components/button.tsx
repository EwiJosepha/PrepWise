import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isButtonDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  isButtonDisabled,
  ...rest
}) => {
  const baseStyles = 'font-bold rounded transition-colors duration-200';
  
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50'
  };
  
  const sizes = {
    small: 'px-2 py-3 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };
  
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''} ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`;
  
  return (
    <button className={buttonClasses} disabled={isButtonDisabled} {...rest} >
      {children}
    </button>
  );
};

export default Button;
