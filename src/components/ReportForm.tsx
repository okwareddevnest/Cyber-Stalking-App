'use client';

import { IncidentReportForm } from '@/types/forms';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export default function ReportForm() {
  const router = useRouter();
  const [form, setForm] = useState<IncidentReportForm>({
    name: '',
    email: '',
    incidentDescription: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to submit report');
      }
    } catch (err) {
      setError('An error occurred while submitting the report');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <SignedIn>
        <main className="max-w-2xl mx-auto p-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Report an Incident</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-destructive/10 text-destructive p-2 rounded mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="incidentDescription" className="text-sm font-medium">
                    Incident Description
                  </label>
                  <Textarea
                    id="incidentDescription"
                    name="incidentDescription"
                    required
                    value={form.incidentDescription}
                    onChange={handleChange}
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </SignedIn>
      <SignedOut>
        <main className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Please Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <SignIn />
            </CardContent>
          </Card>
        </main>
      </SignedOut>
    </>
  );
}
