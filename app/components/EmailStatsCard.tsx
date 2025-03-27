import { ReactNode } from 'react';

interface EmailStatsCardProps {
  title: string;
  children: ReactNode;
}

export default function EmailStatsCard({ title, children }: EmailStatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
} 