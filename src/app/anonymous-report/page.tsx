'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AnonymousReportForm {
  incidentDescription: string;
  contactEmail?: string;
  // Add additional fields as necessary
}

export default function AnonymousReportPage() {
  const router = useRouter();
  const [form, setForm] = useState<AnonymousReportForm>({
    incidentDescription: '',
    contactEmail: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!form.incidentDescription.trim()) {
      setError('Incident description is required.');
      return;
    }

    const response = await fetch('/api/anonymous-report', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();

    if (result.success) {
      router.push('/anonymous-report/success');
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Anonymous Incident Report</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="incidentDescription" className="block text-sm font-medium">
            Incident Description
          </label>
          <textarea
            id="incidentDescription"
            name="incidentDescription"
            required
            value={form.incidentDescription}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium">
            Contact Email (Optional)
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </main>
  );
}
