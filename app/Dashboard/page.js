import React from 'react';
import GroundCard from '@/components/dashboard/GroundCard';
import SearchCard from '@/components/dashboard/SearchCard';

export default function Dashboard() {
  return (
    <>
      <SearchCard />
      <h2 style={{ textAlign: 'center' }}>Quick Bookings</h2>
      <GroundCard
        stadiumName="Name of the Stadium"
        price="499"
        location="Location"
        rating="4.5"
        reviews="54"
        image="/path/to/ground-image.jpg"
      />
      <GroundCard
        stadiumName="Name of the Stadium"
        price="499"
        location="Location"
        rating="4.5"
        reviews="54"
        image="/path/to/ground-image.jpg"
      />
    </>
  );
}
