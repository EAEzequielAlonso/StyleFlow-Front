import { ReactNode } from 'react';

interface PrincipalLayoutProps {
  children: ReactNode;
}

export const PrincipalLayout = ({ children }: PrincipalLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 min-h-screen">
      {children}
    </div>
  );
};