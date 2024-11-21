import { useUser, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Call API route to delete user data
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
      });
      if (response.ok) {
        // Redirect to homepage or confirmation page
        router.push('/');
      } else {
        alert('Failed to delete account.');
      }
    }
  };

  return (
    <SignedIn>
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Account</h1>
        <p>Name: {user?.fullName}</p>
        <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
        {/* Add other user information as needed */}
        <button
          onClick={handleDeleteAccount}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Delete Account
        </button>
      </main>
    </SignedIn>
  );
}
