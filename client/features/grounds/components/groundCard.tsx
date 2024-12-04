"use client"
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Types remain the same
interface GroundCardProps {
  name: string;
  location: string;
  price: number;
  rating: number;
  imageUrl?: string;
  amenities: string[];
  totalReviews: number;
}

// Sample data
export const groundsData: GroundCardProps[] = [
  {
    name: "Tiger Sports Arena",
    location: "Koramangala, Bangalore",
    price: 1500,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1641997217176-72650c3018c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Floodlights", "Parking", "Changing Room", "Water"],
    totalReviews: 128
  },
  {
    name: "Green Valley Ground",
    location: "Indiranagar, Bangalore",
    price: 1200,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1641997217176-72650c3018c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Floodlights", "Parking", "First Aid"],
    totalReviews: 96
  },
  {
    name: "Victory Cricket Ground",
    location: "HSR Layout, Bangalore",
    price: 1800,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1641997217176-72650c3018c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Floodlights", "Parking", "Changing Room", "Cafeteria"],
    totalReviews: 156
  }
];

const timeSlots = {
  morning: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00'],
  evening: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
};

const generateNextWeekDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short'
    }).toUpperCase();
    dates.push(dateStr);
  }
  
  return dates;
};

const GroundCard: React.FC<GroundCardProps> = ({
  name,
  location,
  price,
  rating,
  imageUrl = "/api/placeholder/400/320",
  amenities,
  totalReviews
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  const dates = generateNextWeekDates();

  const handlePayment = () => {
    if (selectedDate && selectedTime) {
      setIsPaid(true);
      setTimeout(() => {
        setIsPaid(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setIsExpanded(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image Section - Optimized for mobile */}
      <div className="relative w-full">
        <Image 
          src={imageUrl} 
                  alt={name}
                  width={500}
                  height={150}
        />
        {/* Larger touch targets for mobile */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 left-3 p-3 bg-white rounded-full shadow-md active:scale-95 transition-transform"
        >
          <Heart 
            className={`w-6 h-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white px-4 py-2 rounded-full shadow-md">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-base font-medium">{rating}</span>
          <span className="text-sm text-gray-500">({totalReviews})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Header Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{name}</h3>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-bold text-[#0053a7]">₹{price}</span>
              <span className="text-gray-500 text-sm">/hr</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-1" />
            <span className="text-base">{location}</span>
          </div>

          {/* Amenities - Scrollable on mobile */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {amenities.map((amenity, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-blue-50 text-[#0053a7] text-sm rounded-full whitespace-nowrap"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-colors text-lg"
                   
        >
          <span>{isExpanded ? 'Hide Details' : 'Book Now'}</span>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>

        {/* Expandable Booking Section */}
        <div className={`mt-6 space-y-6 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          {/* Date Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-6 h-6 text-[#0053a7]" />
              <h4 className="text-lg font-semibold text-gray-900">Select Date</h4>
            </div>
            {/* Horizontal scrollable dates for mobile */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-3 min-w-max">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                    className={`px-4 py-3 text-base rounded-lg transition-colors ${
                      selectedDate === date
                        ? 'bg-[#0053a7] text-white'
                        : 'bg-blue-50 text-gray-700 active:bg-blue-100'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-[#0053a7]" />
              <h4 className="text-lg font-semibold text-gray-900">Available Slots</h4>
            </div>
            <div className="space-y-4">
              {Object.entries(timeSlots).map(([period, slots]) => (
                <div key={period}>
                  <h5 className="text-base font-medium text-gray-600 capitalize mb-3">{period}</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(selectedTime === time ? null : time)}
                        className={`py-3 text-base rounded-lg transition-colors ${
                          selectedTime === time
                            ? 'bg-[#0053a7] text-white'
                            : 'bg-blue-50 text-gray-700 active:bg-blue-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Button */}
  
      <Button
        onClick={handlePayment}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg"
      >
        Confirm Booking
      </Button>
   

    {/* Payment Success Message */}
    {isPaid && (
      <div className="mt-2 text-green-600 text-center">
        Booking Confirmed! 🎉
      </div>
    )}
  </div>
</div>
</div>
);
};

// Grid Container Component
export const GroundsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
      {groundsData.map((ground, index) => (
        <GroundCard key={index} {...ground} />
      ))}
    </div>
  );
};

export default GroundCard;