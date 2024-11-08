// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Get the user token from the request
  const token = await getToken({ req });

  // Define the roles required for accessing different paths
  const roleRequirements = {
    '/admin': 'admin',
    '/protected': 'user', // Allow access to users with the 'user' role
  };

  // Check if the requested path is a protected path
  const requiredRole = roleRequirements[req.nextUrl.pathname];

  if (requiredRole) {
    if (!token || token.role !== requiredRole) {
      // Redirect to restricted page if user is not authenticated or does not have the required role
      return NextResponse.redirect(new URL('/api/restricted', req.url));
    }
  }

  // Allow the request to proceed if authenticated and authorized
  return NextResponse.next();
}

// Configure the paths that the middleware applies to
export const config = {
  matcher: ['/admin/:path*', '/protected/:path*'], // Adjust to match your protected paths
};
