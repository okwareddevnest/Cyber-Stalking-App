import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/utils/db';
import { Report, ExternalServicePayload } from '@/types/reports';

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  const { reportId } = await request.json();

  if (!reportId) {
    return NextResponse.json({ success: false, error: 'Report ID is required.' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const reportsCollection = db.collection('incident_reports');

    const report = await reportsCollection.findOne({ id: reportId });
    if (!report) {
      return NextResponse.json({ success: false, error: 'Report not found.' }, { status: 404 });
    }

    const payload: ExternalServicePayload = {
      report,
    };

    const externalResponse = await fetch(process.env.EXTERNAL_SERVICE_ENDPOINT!, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXTERNAL_SERVICE_API_KEY}`,
      },
    });

    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      return NextResponse.json(
        { success: false, error: `External service error: ${errorText}` },
        { status: externalResponse.status },
      );
    }

    // Update report status
    await reportsCollection.updateOne(
      { id: reportId },
      { $set: { forwarded: true, forwardedAt: new Date() } },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error forwarding report:', error);
    return NextResponse.json({ success: false, error: 'Failed to forward report.' }, { status: 500 });
  }
}
