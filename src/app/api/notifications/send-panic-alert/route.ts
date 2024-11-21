import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Implement notification logic here
    // E.g., send an email to support staff or create a system alert

    console.log(`Panic alert received from user ID: ${userId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling panic alert:', error);
    return NextResponse.json({ success: false, error: 'Failed to send alert' }, { status: 500 });
  }
}
