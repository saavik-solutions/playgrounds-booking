// src/types/errors.ts

// Define the ApiError interface
export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
}
