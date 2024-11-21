import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/utils/db';
import { EvidenceMetadata, ChainOfCustodyEntry } from '@/types/evidence';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const bucket = new GridFSBucket(db, { bucketName: 'evidenceFiles' });

    // Convert the File to a Node.js Readable stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    // Prepare metadata with chain of custody
    const metadata: EvidenceMetadata = {
      uploadedBy: userId,
      uploadDate: new Date(),
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      chainOfCustody: [
        {
          action: 'Uploaded',
          timestamp: new Date(),
          performedBy: userId,
        },
      ],
    };

    // Upload the file to GridFS with metadata
    const uploadStream = bucket.openUploadStream(file.name, { metadata });
    stream.pipe(uploadStream);

    await new Promise<void>((resolve, reject) => {
      uploadStream.on('error', reject);
      uploadStream.on('finish', resolve);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload evidence.' }, { status: 500 });
  }
}
