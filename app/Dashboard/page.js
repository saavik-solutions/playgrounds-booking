"use client";
import React, { useEffect, useState } from 'react';
import GroundCard from '@/components/dashboard/GroundCard';
import SearchCard from '@/components/dashboard/SearchCard';
import axios from 'axios';
import MapSection from '../components/MapSection.js';
import Footer from '../components/Footer.js';

export default function Dashboard() {
  const [grounds, setGrounds] = useState([]);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/grounds/groundsHandler');
        setGrounds(response.data);
      } catch (error) {
        console.error('Error fetching ground data:', error);
      }
    };

    fetchGrounds();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      {/* Map Section */}
      <MapSection />

      {/* Search Card Section */}
      <SearchCard />

      {/* Title */}
      <h2 className="text-xl font-semibold text-center text-gray-800">Quick Bookings</h2>

      {/* Ground Cards Section */}
      <div className="flex flex-col w-full space-y-4 sm:grid sm:grid-cols-2 sm:gap-4">
        {grounds.length > 0 ? (
          grounds.map((ground) => (
            <GroundCard
              key={ground._id}
              stadiumName={ground.groundName}
              price={ground.pricePerHour}
              location={ground.location}
              rating={ground.rating}
              reviews={ground.reviews || 0}
              image={ground.media?.[0] || '/images/default-stadium.jpg'}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No grounds available for booking at the moment.</p>
        )}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
