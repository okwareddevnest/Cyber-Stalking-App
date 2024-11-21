import { Metadata } from 'next';
import ReportForm from '@/components/ReportForm';

export const metadata: Metadata = {
  title: 'Report an Incident',
  description: 'Securely report a cyber stalking incident.',
};

export default function ReportPage() {
  return <ReportForm />;
}
