import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'Cyber Stalking Response System',
  description: 'A comprehensive platform to support victims of cyber stalking.',
};

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-4xl font-bold mb-4">
            Welcome to the Cyber Stalking Response System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600 text-sm md:text-base">
            Our mission is to provide comprehensive support and resources for victims of cyber stalking.
            We offer tools to report incidents, collect evidence, and connect with law enforcement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Link href="/report" className="w-full">
              <Button size="lg" className="w-full">
                Report an Incident
              </Button>
            </Link>
            <Link href="/support-resources" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Access Support Resources
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Anonymous Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Report incidents anonymously and securely without revealing your identity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Evidence Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Learn how to collect and preserve digital evidence properly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Access support resources and connect with trained professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
