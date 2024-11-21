'use client';

import { IncidentReportForm } from '@/types/forms';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ReportIncidentForm() {
  const router = useRouter();
  const [form, setForm] = useState<IncidentReportForm>({
    name: '',
    email: '',
    incidentDescription: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/report', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();

    if (result.success) {
      router.push('/report/success');
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };

  return (
    <>
      <SignedIn>
        <main className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Report an Incident</h1>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
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
            {/* Add additional form fields as needed */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Report
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
    </>
  );
}
