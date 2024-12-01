 
// src/core/types/Ground.ts

export interface Ground {
  id: string;
  name: string;        // Name of the ground
  location: string;    // Location of the ground
  size: number;        // Size of the ground (in square meters, for example)
  available: boolean;  // Availability status (is the ground available for booking?)
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGroundRequest {
  name: string;
  location: string;
  size: number;
}

export interface UpdateGroundRequest {
  available: boolean;
}
