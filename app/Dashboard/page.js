"use client"
import SearchCard from '@/app/components/dashboard/SearchCard';
import React, { useEffect, useState } from 'react';
import GroundCard from '../components/dashboard/GroundCard';

export default function Dashboard() {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/grounds');
        const data = await response.json();
        setGrounds(data);
      } catch (error) {
        console.error('Error fetching grounds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrounds();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!grounds.length) return <p>No grounds available.</p>;

  return (
    <>
      <SearchCard />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {grounds.map((ground) => (
          <GroundCard key={ground.groundName} ground={ground} />
        ))}
      </div>
    </>
  );
}
