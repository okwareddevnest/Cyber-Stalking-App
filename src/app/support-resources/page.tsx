export const metadata = {
  title: 'Support Resources',
  description: 'Access support resources for victims.',
};

export default function SupportResources() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Support Resources</h1>
      <p>If you're experiencing cyber stalking, the following resources may help:</p>
      <ul className="list-disc list-inside mt-4 space-y-2">
        <li>
          <a href="https://www.cybercrime.gov/help" className="text-blue-600 hover:underline">
            National Cyber Crime Support Center
          </a>
        </li>
        <li>
          <a href="https://www.victimhelp.org" className="text-blue-600 hover:underline">
            Victim Help Organization
          </a>
        </li>
        <li>
          <a href="https://www.mentalhealthsupport.net" className="text-blue-600 hover:underline">
            Mental Health Support
          </a>
        </li>
        {/* Add more resources as needed */}
      </ul>
    </main>
  );
}
