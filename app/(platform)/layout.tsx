import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <div className="flex justify-center">{children} </div>
    </ClerkProvider>
  );
};

export default RootLayout;
