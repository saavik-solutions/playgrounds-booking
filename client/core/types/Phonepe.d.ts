// src/core/types/PhonePe.ts

export interface PhonePePaymentRequest {
  amount: number;
  transactionId: string;
  callbackUrl: string; // URL to send the callback to
  customerName: string;
  customerEmail: string;
}

export interface PhonePePaymentResponse {
  success: boolean;
  transactionId: string;
  paymentStatus: PhonePePaymentStatus;
  gatewayTransactionId: string;
  message?: string;
}

export type PhonePePaymentStatus = 'SUCCESS' | 'FAILURE' | 'PENDING';
