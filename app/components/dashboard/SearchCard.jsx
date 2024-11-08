import React from 'react';

export default function SearchCard() {
  return (
    <div
      className="relative h-72 bg-cover bg-center flex items-center justify-center flex-col p-5 rounded-lg"
      style={{
        backgroundImage: `url('/images/background-image.jpg')`, // Ensure this path is accessible from your public folder
      }}
    >
      <h1 className="text-white text-2xl mb-5">LOGO HERE</h1>
      <div className="bg-white bg-opacity-80 p-4 rounded-lg flex flex-col gap-3 w-4/5 max-w-sm">
        <input
          type="text"
          placeholder="Search for Venue"
          className="p-2 rounded border border-gray-300"
        />
        <input
          type="date"
          className="p-2 rounded border border-gray-300"
        />
        <button className="p-2 rounded bg-orange-500 text-white font-bold hover:bg-orange-600">
          Check Availability
        </button>
      </div>
    </div>
  );
}
