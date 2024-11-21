import { useUser, SignedIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/auth';
import { useState, useEffect } from 'react';
import { Report } from '@/types/reports';

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
  }, [user]);

  const fetchReports = async () => {
    const reportData = await fetch('/api/reports').then((res) => res.json());
    setReports(reportData);
  };

  const handleForward = async (reportId: string) => {
    const response = await fetch('/api/forward-report', {
      method: 'POST',
      body: JSON.stringify({ reportId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    if (result.success) {
      // Update the report's forwarded status in the UI
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId ? { ...report, forwarded: true, forwardedAt: new Date() } : report,
        ),
      );
    } else {
      alert(result.error || 'Failed to forward report.');
    }
  };

  if (!user) {
    return null; // Loading state or redirect
  }

  return (
    <SignedIn>
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Incident Reports</h1>
        {reports.map((report) => (
          <div key={report.id} className="report-item p-4 border rounded-md mb-4">
            <h3 className="font-semibold mb-2">Report ID: {report.id}</h3>
            <p className="mb-2">{report.incidentDescription}</p>
            {report.forwarded ? (
              <p className="text-green-600">
                Forwarded on {new Date(report.forwardedAt!).toLocaleString()}
              </p>
            ) : (
              <button
                onClick={() => handleForward(report.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Forward to Law Enforcement
              </button>
            )}
          </div>
        ))}
      </main>
    </SignedIn>
  );
}
