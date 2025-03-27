import { useState } from 'react';

interface EmailFiltersProps {
  onFilterChange: (filters: EmailFilters) => void;
}

export interface EmailFilters {
  status: 'all' | 'pending' | 'sent' | 'failed';
  search: string;
  sortBy: 'date' | 'customer' | 'subject';
  sortOrder: 'asc' | 'desc';
}

export default function EmailFilters({ onFilterChange }: EmailFiltersProps) {
  const [filters, setFilters] = useState<EmailFilters>({
    status: 'all',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const handleChange = (key: keyof EmailFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Search by customer or subject..."
          />
        </div>

        <div className="w-full sm:w-48">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="w-full sm:w-48">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="date">Date</option>
            <option value="customer">Customer</option>
            <option value="subject">Subject</option>
          </select>
        </div>

        <div className="w-full sm:w-48">
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort Order
          </label>
          <select
            id="sortOrder"
            value={filters.sortOrder}
            onChange={(e) => handleChange('sortOrder', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
} 