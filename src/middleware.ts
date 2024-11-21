import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/utils/db';
import { AuditLogEntry } from '@/types/audit';

// List of public routes
const publicRoutes = [
  '/api/public/*',
  '/public/*',
  '/anonymous-report',
  '/anonymous-report/*',
  '/api/anonymous-report',
  '/socket.io/*',
  '/api/evidence/upload',
];

export default async function middleware(request: NextRequest) {
  const { userId } = auth();

  // Create audit log entry
  const logEntry: AuditLogEntry = {
    userId: userId || null,
    action: request.nextUrl.pathname,
    method: request.method,
    timestamp: new Date(),
    ipAddress:
      request.headers.get('x-forwarded-for') ||
      request.ip ||
      request.headers.get('x-real-ip') ||
      '',
  };

  // Save log entry to database
  const db = await connectToDatabase();
  const auditCollection = db.collection('audit_logs');
  await auditCollection.insertOne(logEntry);

  // Check if the route is public
  const isPublic = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isPublic) {
    return NextResponse.next();
  }

  // Protect private routes
  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/support/:path*'],
};
