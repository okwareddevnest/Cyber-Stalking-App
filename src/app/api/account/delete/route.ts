import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/utils/db';

export async function DELETE(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete user data from the database
    const db = await connectToDatabase();
    await db.collection('incident_reports').deleteMany({ userId });
    await db.collection('evidenceFiles.files').deleteMany({ 'metadata.uploadedBy': userId });
    await db.collection('evidenceFiles.chunks').deleteMany({});

    // Delete user from Clerk
    // Note: Ensure you have the proper permissions and capabilities enabled in Clerk
    // Example:
    // await clerkClient.users.deleteUser(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete account.' }, { status: 500 });
  }
}
