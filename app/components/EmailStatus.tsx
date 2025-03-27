interface EmailStatusProps {
  status: 'pending' | 'sent' | 'failed';
}

export default function EmailStatus({ status }: EmailStatusProps) {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    sent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const statusText = {
    pending: 'Pending',
    sent: 'Sent',
    failed: 'Failed',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {statusText[status]}
    </span>
  );
} 