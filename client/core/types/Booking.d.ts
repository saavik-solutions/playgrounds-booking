


export interface Booking {
  id: string;
  userId: string; // Refers to the user who made the booking
  groundId: string; 
  slotId :    number;
  status: BookingStatus; // Current status of the booking
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface CreateBookingRequest {
  userId: string;
  groundId: string;
  slotId :    number;
}

export interface UpdateBookingRequest {
  status: BookingStatus;
}
