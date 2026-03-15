import { type ReactNode } from 'react';

interface Props {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  size?: 'normal' | 'large';
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const variants = {
  primary: 'bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 shadow-lg shadow-amber-500/30',
  secondary: 'bg-gradient-to-b from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/30',
  accent: 'bg-gradient-to-b from-purple-400 to-purple-600 text-white shadow-lg shadow-purple-500/30',
  success: 'bg-gradient-to-b from-green-400 to-green-600 text-white shadow-lg shadow-green-500/30',
};

export function BigButton({ onClick, variant = 'primary', size = 'normal', disabled, children, className = '' }: Props) {
  const sizeClass = size === 'large' ? 'py-5 px-10 text-2xl' : 'py-4 px-8 text-xl';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} ${sizeClass}
        rounded-full font-bold
        active:scale-95 transition-transform
        disabled:opacity-50 disabled:active:scale-100
        min-w-[200px] max-w-full
        ${className}
      `}
    >
      {children}
    </button>
  );
}
