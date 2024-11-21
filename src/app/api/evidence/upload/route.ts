import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/utils/db';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Connect to MongoDB and get GridFS bucket
    const db = await connectToDatabase();
    const bucket = new GridFSBucket(db, {
      bucketName: 'evidenceFiles',
    });

    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);

    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        uploadedBy: userId,
        description,
        originalName: file.name,
        mimeType: file.type,
        uploadDate: new Date(),
        chainOfCustody: [{
          action: 'UPLOAD',
          timestamp: new Date(),
          performedBy: userId,
        }],
      },
    });

    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', resolve);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading evidence:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload evidence' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
