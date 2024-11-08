import React from 'react';
import Image from 'next/image';

const GroundCard = ({ ground }) => {
  return (
    <div className="ground-card border rounded-lg shadow-md p-4 max-w-sm">
      <div className="relative">
        <Image
          src={ground.media}
          alt={ground.groundName}
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-48"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 shadow-md text-sm flex items-center">
          <span className="text-orange-500 mr-1">★</span> {ground.rating} ({ground.totalPeopleRated})
        </div>
        {ground.availability && (
          <div className="absolute bottom-4 right-4 bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-bold">
            bookable
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-lg">{ground.groundName}</h3>
        <p className="text-gray-500 text-sm">{ground.location}</p>
        <p className="text-orange-600 font-semibold mt-2">₹ {ground.pricePerHour}/hr</p>
      </div>
    </div>
  );
};
export default GroundCard;