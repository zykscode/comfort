import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

import { prisma } from '@/lib/db';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const bookings = await prisma.booking.findMany({
    where: { clerkId: user.id },
    include: { payments: true },
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Recent Bookings</h3>
          {bookings.length > 0 ? (
            <ul className="space-y-2">
              {bookings.slice(0, 5).map((booking) => (
                <li key={booking.id} className="border-b pb-2">
                  <p>Hotel ID: {booking.hotelId}</p>
                  <p>Check-in: {booking.checkIn.toDateString()}</p>
                  <p>Check-out: {booking.checkOut.toDateString()}</p>
                  <p>Status: {booking.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent bookings</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Booking Statistics</h3>
          <p>Total Bookings: {bookings.length}</p>
          <p>
            Completed Bookings:{' '}
            {
              bookings.filter((booking) => booking.status === 'confirmed')
                .length
            }
          </p>
          <p>
            Pending Bookings:{' '}
            {bookings.filter((booking) => booking.status === 'pending').length}
          </p>
        </div>
      </div>
    </div>
  );
}
