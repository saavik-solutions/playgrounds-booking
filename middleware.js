// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected routes and roles required for access
  const protectedRoutes = [
    { path: '/api/admin', role: 'admin' },
    { path: '/api/user', role: 'user' },
    // Add other protected paths as necessary
  ];

  // Check if the request path matches any protected route
  const matchedRoute = protectedRoutes.find((route) => pathname.startsWith(route.path));

  // If not a protected route, allow the request
  if (!matchedRoute) return NextResponse.next();

  // Get the token from request headers (e.g., Authorization: Bearer <token>)
  const token = request.headers.get('authorization')?.split(' ')[1];

  // If no token is found, deny access
  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized: No token provided' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Verify JWT and decode the token
    const user = jwt.verify(token, JWT_SECRET);

    // Check if user has the required role for the matched route
    if (user.role !== matchedRoute.role) {
      return new NextResponse(
        JSON.stringify({ message: 'Forbidden: Insufficient privileges' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add user data to the request (this data will be available in the request headers)
    request.user = user;

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, deny access
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized: Invalid token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const config = {
  matcher: [
    // Apply middleware to these routes only (customize as needed)
    '/api/admin/:path*',
    '/api/user/:path*',
  ],
};
