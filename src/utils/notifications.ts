export async function sendPanicAlert(userId: string | null) {
  if (!userId) {
    // Handle unauthenticated users, perhaps prompt to sign in
    alert('Please sign in to use the panic button.');
    return;
  }

  // Send notification to support staff or trigger an alert
  try {
    await fetch('/api/notifications/send-panic-alert', {
      method: 'POST',
      body: JSON.stringify({ userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    alert('Panic alert sent. Our support team will reach out to you shortly.');
  } catch (error) {
    console.error('Error sending panic alert:', error);
    alert('Failed to send panic alert. Please try again.');
  }
}
