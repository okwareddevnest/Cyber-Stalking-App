'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';

export default function UploadEvidencePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/evidence/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      router.push('/evidence/upload-success');
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };

  return (
    <ClerkProvider>
      <SignedIn>
        <main className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Upload Evidence</h1>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="file" className="block text-sm font-medium">
                Select File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                required
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Upload
            </button>
          </form>
        </main>
      </SignedIn>
      <SignedOut>
        <main className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Please Sign In</h1>
          <SignIn />
        </main>
      </SignedOut>
    </ClerkProvider>
  );
}
