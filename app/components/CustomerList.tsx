import { useState, useEffect } from 'react';

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

interface CustomerListProps {
  customers?: Customer[];
  isLoading?: boolean;
}

export default function CustomerList({ customers = [], isLoading = false }: CustomerListProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Customer List</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">Loading customers...</div>
        </div>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Customer List</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">No customers found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Customer List</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Demographics</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Preferences</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {customer.firstName} {customer.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">{customer.email}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">{customer.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">Age: {customer.age}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">Gender: {customer.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Products: {Array.isArray(customer.preferredProducts) 
                      ? customer.preferredProducts.join(', ')
                      : typeof customer.preferredProducts === 'string'
                        ? customer.preferredProducts
                        : 'No products selected'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Reason: {customer.primaryReason}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 