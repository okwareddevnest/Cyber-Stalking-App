import { connectToDatabase } from '@/utils/db';
import { GridFSBucket, ObjectId } from 'mongodb';
import { ChainOfCustodyEntry } from '@/types/evidence';

export async function updateChainOfCustody(
  evidenceId: string,
  entry: ChainOfCustodyEntry
) {
  const db = await connectToDatabase();
  const bucket = new GridFSBucket(db, { bucketName: 'evidenceFiles' });

  await db.collection('evidenceFiles.files').updateOne(
    { _id: new ObjectId(evidenceId) },
    {
      $push: {
        'metadata.chainOfCustody': {
          ...entry,
          timestamp: new Date(),
        },
      },
    }
  );
}

export async function getEvidenceMetadata(evidenceId: string) {
  const db = await connectToDatabase();
  const file = await db
    .collection('evidenceFiles.files')
    .findOne({ _id: new ObjectId(evidenceId) });
  return file?.metadata;
}
