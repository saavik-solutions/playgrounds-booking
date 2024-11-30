import { NextResponse } from 'next/server';
import { AUTH_ERRORS } from '@/features/utils/constants';
import { ZodError } from 'zod';

type APIHandler = (...args: unknown[]) => Promise<NextResponse>;

export function withErrorHandler(handler: APIHandler): APIHandler {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        );
      }

      const status = (error as { status?: number }).status || 500;
      const message = (error as { message?: string }).message || AUTH_ERRORS.NETWORK_ERROR;

      return NextResponse.json({ error: message }, { status });
    }
  };
}
