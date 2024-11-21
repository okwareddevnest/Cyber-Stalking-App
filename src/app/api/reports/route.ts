import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/utils/db';

export async function GET(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  try {
    const db = await connectToDatabase();
    const reportsCollection = db.collection('incident_reports');

    const reports = await reportsCollection.find({}).toArray();

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reports.' }, { status: 500 });
  }
}
