import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default function UserLayout({
  children,
  profile,
  dashboard,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
  dashboard: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>{profile}</div>
        <div>{dashboard}</div>
      </div>
      {children}
    </div>
  );
}
