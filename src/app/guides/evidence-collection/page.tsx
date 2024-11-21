export const metadata = {
  title: 'Evidence Collection Guide',
  description: 'Learn how to collect and preserve evidence.',
};

export default function EvidenceCollectionGuide() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Evidence Collection Guide</h1>
      <p>
        Proper evidence collection is crucial. Follow these steps to ensure all evidence is
        collected accurately:
      </p>
      <ol className="list-decimal list-inside mt-4 space-y-2">
        <li>Do not delete any messages or emails related to the incident.</li>
        <li>Take screenshots of all communications, ensuring timestamps are visible.</li>
        <li>Note down any usernames, profiles, or identifiers of the perpetrator.</li>
        <li>Secure any devices that may contain evidence.</li>
        <li>Contact support if you need assistance with evidence collection.</li>
      </ol>
    </main>
  );
}
