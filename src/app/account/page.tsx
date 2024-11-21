'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export default function AccountPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch('/api/account/delete', {
          method: 'DELETE',
        });
        if (response.ok) {
          router.push('/');
        } else {
          alert('Failed to delete account.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account.');
      }
    }
  };

  if (!user) return null;

  return (
    <main className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1">{user.fullName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1">{user.emailAddresses[0]?.emailAddress}</p>
          </div>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            className="mt-6"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
