import { NextRequest, NextResponse } from 'next/server';
import { IncidentReportForm } from '@/types/forms';
import { ApiResponse } from '@/types/apiResponses';
import { connectToDatabase } from '@/utils/db';
import { auth } from '@clerk/nextjs';

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Unauthorized access.',
    };
    return NextResponse.json(response, { status: 401 });
  }

  // Parse JSON body
  const form: IncidentReportForm = await request.json();

  // Validate form data (you should add robust validation here)
  if (!form.name || !form.email || !form.incidentDescription) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Missing required fields.',
    };
    return NextResponse.json(response, { status: 400 });
  }

  try {
    // Connect to the database
    const db = await connectToDatabase();
    const reportsCollection = db.collection('incident_reports');

    // Save the report to the database
    await reportsCollection.insertOne({
      userId,
      ...form,
      submittedAt: new Date(),
    });

    const response: ApiResponse<null> = {
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to submit report.',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
