'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/auth';
import { useState, useEffect } from 'react';
import { Report } from '@/types/reports';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (user) {
      const userRole = user.publicMetadata.role as UserRole;
      if (userRole !== 'support_staff' && userRole !== 'admin') {
        router.push('/unauthorized');
      } else {
        fetchReports();
      }
    }
  }, [user, router]);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleForward = async (reportId: string) => {
    try {
      const response = await fetch('/api/forward-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
      });
      const result = await response.json();

      if (result.success) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId
              ? { ...report, forwarded: true, forwardedAt: new Date() }
              : report
          )
        );
      } else {
        alert(result.error || 'Failed to forward report.');
      }
    } catch (error) {
      console.error('Error forwarding report:', error);
      alert('An error occurred while forwarding the report.');
    }
  };

  if (!user) return null;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Report ID: {report.id}</h3>
                  <p className="mb-4 text-gray-600">{report.incidentDescription}</p>
                  {report.forwarded ? (
                    <p className="text-green-600">
                      Forwarded on {new Date(report.forwardedAt!).toLocaleString()}
                    </p>
                  ) : (
                    <Button
                      onClick={() => handleForward(report.id)}
                      variant="secondary"
                    >
                      Forward to Law Enforcement
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
