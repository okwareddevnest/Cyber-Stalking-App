import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/utils/db';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  const db = await connectToDatabase();
  const workflowsCollection = db.collection('workflows');

  const workflows = await workflowsCollection.find({}).toArray();

  return NextResponse.json(workflows);
}
