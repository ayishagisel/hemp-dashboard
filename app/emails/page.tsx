'use client';

import { useState, useEffect } from 'react';
import EmailStatsCard from '../components/EmailStatsCard';
import GenerateEmailModal from '../components/GenerateEmailModal';
import EmailStatus from '../components/EmailStatus';
import EmailFilters, { EmailFilters as EmailFiltersType } from '../components/EmailFilters';
import Pagination from '../components/Pagination';
import EmailPreview from '../components/EmailPreview';

interface Email {
  id: string;
  customerId: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  subject: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
  emailType: string;
  body: string;
  updatedAt: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface SortConfig {
  key: 'customer' | 'subject' | 'status' | 'createdAt';
  direction: 'asc' | 'desc';
}

export default function EmailsPage() {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [filters, setFilters] = useState<EmailFiltersType>({
    status: 'all',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'createdAt',
    direction: 'desc'
  });
  const [isSending, setIsSending] = useState(false);
  const [previewEmail, setPreviewEmail] = useState<Email | null>(null);

  useEffect(() => {
    fetchEmails();
  }, [currentPage, pageSize]);

  useEffect(() => {
    applyFilters();
  }, [filters, emails, sortConfig]);

  const fetchEmails = async () => {
    try {
      const response = await fetch(`/api/emails?page=${currentPage}&limit=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }
      const data = await response.json();
      console.log('Fetched emails:', data);
      setEmails(data.emails);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const applyFilters = () => {
    let filtered = [...emails];

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(email => email.status === filters.status);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(email => 
        email.customer.firstName.toLowerCase().includes(searchLower) ||
        email.customer.lastName.toLowerCase().includes(searchLower) ||
        email.subject.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortConfig.key) {
        case 'customer':
          comparison = `${a.customer.firstName} ${a.customer.lastName}`.localeCompare(
            `${b.customer.firstName} ${b.customer.lastName}`
          );
          break;
        case 'subject':
          comparison = a.subject.localeCompare(b.subject);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    setFilteredEmails(filtered);
  };

  const handleGenerateEmails = async (template: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/emails/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ template }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emails');
      }

      await fetchEmails(); // Refresh the email list
    } catch (error) {
      console.error('Error generating emails:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSendAllPending = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to send emails');
      }

      const data = await response.json();
      console.log('Sent emails:', data);
      
      // Refresh the email list
      await fetchEmails();
    } catch (error) {
      console.error('Error sending emails:', error);
    } finally {
      setIsSending(false);
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortConfig['key'] }) => {
    if (sortConfig.key !== columnKey) {
      return <span className="ml-1 text-gray-400">↕</span>;
    }
    return sortConfig.direction === 'asc' ? 
      <span className="ml-1 text-gray-400">↑</span> : 
      <span className="ml-1 text-gray-400">↓</span>;
  };

  return (
    <main>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Email Management
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 space-x-3">
          <button
            onClick={() => setIsGenerateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Generate Welcome Emails
          </button>
          <button
            onClick={handleSendAllPending}
            disabled={isSending || emails.filter(email => email.status === 'pending').length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Send All Pending'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <EmailStatsCard title="Email Statistics">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Emails</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{pagination.total}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sent Today</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {emails.filter(email => 
                  email.status === 'sent' && 
                  new Date(email.createdAt).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {emails.filter(email => email.status === 'pending').length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {pagination.total > 0
                  ? `${Math.round((emails.filter(email => email.status === 'sent').length / pagination.total) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </EmailStatsCard>
      </div>

      <EmailStatsCard title="Recent Emails">
        <EmailFilters onFilterChange={setFilters} />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('customer')}
                >
                  Customer <SortIcon columnKey="customer" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('subject')}
                >
                  Subject <SortIcon columnKey="subject" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('status')}
                >
                  Status <SortIcon columnKey="status" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('createdAt')}
                >
                  Created <SortIcon columnKey="createdAt" />
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmails.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300" colSpan={5}>
                    No emails found. Generate welcome emails to get started.
                  </td>
                </tr>
              ) : (
                filteredEmails.map((email) => (
                  <tr key={email.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {email.customer.firstName} {email.customer.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                      {email.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <EmailStatus status={email.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {new Date(email.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setPreviewEmail(email)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          pageSize={pageSize}
          totalItems={pagination.total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </EmailStatsCard>

      <GenerateEmailModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={handleGenerateEmails}
      />

      {previewEmail && (
        <EmailPreview
          email={previewEmail}
          onClose={() => setPreviewEmail(null)}
        />
      )}
    </main>
  );
} 