import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/utils/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { workflowId: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  const { stepIndex } = await request.json();

  const db = await connectToDatabase();
  const progressCollection = db.collection('workflow_progress');

  await progressCollection.updateOne(
    { userId, workflowId: params.workflowId },
    { $addToSet: { completedSteps: stepIndex } },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
