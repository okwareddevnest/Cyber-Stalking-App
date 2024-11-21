'use client';

import { sendPanicAlert } from '@/utils/notifications';
import { useAuth } from '@clerk/nextjs';

export function PanicButton() {
  const { userId } = useAuth();

  const handleClick = async () => {
    await sendPanicAlert(userId);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700"
      aria-label="Panic Button"
    >
      Panic Button
    </button>
  );
}
