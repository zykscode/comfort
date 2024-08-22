import React from 'react';

const RootLayout = () => {
  return   <ClerkProvider>
  <div className="flex justify-center">{children} </div>
</ClerkProvider>
};

export default RootLayout;
