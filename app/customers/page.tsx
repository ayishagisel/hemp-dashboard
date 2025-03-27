'use client';

import { useState, useEffect } from 'react';
import CustomerList from '../components/CustomerList';
import AddCustomerModal from '../components/AddCustomerModal';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
  gender: string;
  preferredProducts: string[];
  primaryReason: string;
  otherReason?: string;
  frequencyOfUse: string;
  preferredShoppingMethod: string;
  discoveryMethod: string;
  incomeRange: string;
  occupation: string;
  educationLevel: string;
  preferredCommunication: string;
  interestsHobbies: string[];
  loyaltyProgramMember: boolean;
}

export default function CustomersPage() {
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (customerData: Omit<Customer, 'id'>) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      // Refresh the customer list
      fetchCustomers();
      setIsAddCustomerModalOpen(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Customer Management
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              onClick={() => setIsAddCustomerModalOpen(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Customer
            </button>
          </div>
        </div>

        <AddCustomerModal
          isOpen={isAddCustomerModalOpen}
          onClose={() => setIsAddCustomerModalOpen(false)}
          onAdd={handleAddCustomer}
        />

        <CustomerList customers={customers} isLoading={isLoading} />
      </div>
    </div>
  );
} 