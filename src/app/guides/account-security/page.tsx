export const metadata = {
  title: 'Account Security Guide',
  description: 'Step-by-step guide to secure your accounts.',
};

export default function AccountSecurityGuide() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Account Security Guide</h1>
      <p>Follow these steps to enhance the security of your online accounts:</p>
      <ol className="list-decimal list-inside mt-4 space-y-2">
        <li>Review your privacy settings on social media platforms.</li>
        <li>Set up recovery options for your accounts.</li>
        <li>Monitor your accounts for suspicious activity.</li>
        {/* Add more steps as needed */}
      </ol>
    </main>
  );
}
