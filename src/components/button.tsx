import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  isButtonDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  isLoading = false,
  isButtonDisabled,
  ...rest
}) => {
  const baseStyles = 'font-bold rounded transition-colors duration-200 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-indigo-900 text-white hover:bg-blue-600',
    secondary: 'bg-black text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50'
  };
  
  const sizes = {
    small: 'px-2 py-3 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };
  
  const buttonClasses = `
    ${baseStyles} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${className || ''} 
    ${(isButtonDisabled || isLoading) ? 'cursor-not-allowed opacity-50' : ''}
  `;
  
  return (
    <button 
      className={buttonClasses} 
      disabled={isButtonDisabled || isLoading} 
      {...rest}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
};

export default Button;
