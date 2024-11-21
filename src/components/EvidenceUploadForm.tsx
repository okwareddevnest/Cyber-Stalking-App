'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';

export function EvidenceUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);

      const response = await fetch('/api/evidence/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload evidence');
      }

      const data = await response.json();
      if (data.success) {
        router.push('/dashboard');
      } else {
        throw new Error(data.error || 'Failed to upload evidence');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Evidence</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-2 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              File
            </label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept="image/*,.pdf,.doc,.docx,.txt"
              disabled={uploading}
            />
            <p className="text-sm text-muted-foreground">
              Accepted file types: Images, PDF, DOC, DOCX, TXT
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>
            <textarea
              className="w-full min-h-[100px] p-2 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a description of the evidence..."
              disabled={uploading}
            />
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Evidence'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
