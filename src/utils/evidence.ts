import { connectToDatabase } from '@/utils/db';
import { GridFSBucket, ObjectId } from 'mongodb';

interface ChainOfCustodyEntry {
  timestamp: Date;
  action: string;
  user: string;
  notes?: string;
}

export async function updateChainOfCustody(evidenceId: string, entry: ChainOfCustodyEntry) {
  const db = await connectToDatabase();
  const bucket = new GridFSBucket(db, { bucketName: 'evidenceFiles' });

  await db.collection('evidenceFiles.files').updateOne(
    { _id: new ObjectId(evidenceId) },
    { $push: { 'metadata.chainOfCustody': entry as any } }
  );
}
