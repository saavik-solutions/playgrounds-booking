class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public stack: string | undefined;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // to distinguish between operational and programming errors

    Error.captureStackTrace(this, this.constructor); // Capturing the stack trace
  }
}

export default ApiError;
