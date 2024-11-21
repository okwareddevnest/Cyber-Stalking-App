import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/utils/db';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  const db = await connectToDatabase();
  const progressCollection = db.collection('workflow_progress');

  const progressCursor = await progressCollection.find({ userId });
  const progressArray = await progressCursor.toArray();

  const progress = progressArray.reduce((acc, curr) => {
    acc[curr.workflowId] = curr.completedSteps;
    return acc;
  }, {});

  return NextResponse.json(progress);
}
