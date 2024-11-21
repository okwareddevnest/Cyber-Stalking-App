import { Chat } from '@/components/Chat';

export default function AnonymousReportSuccessPage() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Report Submitted</h1>
      <p>Thank you for submitting your report. You can chat with our support team below.</p>
      <div className="mt-6">
        <Chat />
      </div>
    </main>
  );
}
