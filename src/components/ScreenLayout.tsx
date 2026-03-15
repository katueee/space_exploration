import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function ScreenLayout({ children, className = '' }: Props) {
  return (
    <div className={`star-bg flex flex-col h-full w-full overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}
