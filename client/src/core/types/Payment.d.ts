
// src/core/types/Payment.ts

export interface Payment {
  id: string;
  bookingId: string;       // The ID of the booking this payment is for
  amount: number;          // The amount paid
  status: PaymentStatus;   // Payment status (pending, success, failed, etc.)
  gateway: PaymentGateway; // Payment gateway (PhonePe, etc.)
  transactionId: string;   // The transaction ID for the payment
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled';

export type PaymentGateway = 'phonepe' | 'stripe' | 'paypal';

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  paymentMethod: PaymentGateway;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: PaymentStatus;
  message?: string;
}
