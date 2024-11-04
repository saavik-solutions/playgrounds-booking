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

 // If no token is found, redirect to unauthorized page
  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  try {
    // Verify JWT and decode the token
    const user = jwt.verify(token, JWT_SECRET);

    // Check if user has the required role for the matched route
    if (user.role !== matchedRoute.role) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to unauthorized page
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/user/:path*',
  ],
};