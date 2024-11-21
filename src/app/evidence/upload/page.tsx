import { Metadata } from 'next';
import { EvidenceUploadForm } from '@/components/EvidenceUploadForm';

export const metadata: Metadata = {
  title: 'Upload Evidence',
  description: 'Securely upload evidence related to your case.',
};

export default function EvidenceUploadPage() {
  return (
    <main className="p-4">
      <EvidenceUploadForm />
    </main>
  );
}
