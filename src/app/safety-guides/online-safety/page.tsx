export const metadata = {
  title: 'Online Safety Guide',
  description: 'Learn how to stay safe online.',
};

export default function OnlineSafetyGuide() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Online Safety Guide</h1>
      <p>Protect yourself online with these tips:</p>
      <ul className="list-disc list-inside mt-4 space-y-2">
        <li>Use strong, unique passwords for all your accounts.</li>
        <li>Enable two-factor authentication where possible.</li>
        <li>Be cautious of suspicious emails and links.</li>
        <li>Regularly update your software and devices.</li>
        {/* Add more tips as needed */}
      </ul>
    </main>
  );
}
