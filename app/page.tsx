"use client";

import { useState, useEffect } from 'react';
import DashboardCard from './components/DashboardCard';
import { UserGroupIcon, HeartIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import DemographicCharts from './components/DemographicCharts';

interface Stats {
  totalCustomers: number;
  loyaltyMembers: number;
  totalEmails: number;
  sentToday: number;
  engagementMetrics: {
    loyaltyRate: number;
    averageAge: number;
    mostPopularProduct: string;
    mostCommonReason: string;
    preferredShoppingChannel: string;
    topDiscoveryMethod: string;
  };
  demographics: {
    ageGroups: {
      '18-24': number;
      '25-34': number;
      '35-44': number;
      '45-54': number;
      '55+': number;
    };
    genderDistribution: {
      'Male': number;
      'Female': number;
      'Other': number;
    };
    incomeDistribution: {
      'Under $25,000': number;
      '$25,000 - $50,000': number;
      '$50,000 - $75,000': number;
      '$75,000 - $100,000': number;
      'Over $100,000': number;
    };
    educationDistribution: {
      'High School': number;
      'Some College': number;
      "Bachelor's Degree": number;
      "Master's Degree": number;
      'Doctorate': number;
    };
    productPreferences: {
      'CBD Oil': number;
      'Hemp-infused Edibles': number;
      'Topical Creams': number;
      'Hemp Flower': number;
      'Hemp Clothing/Textiles': number;
      'Hemp-based Supplements': number;
    };
    primaryReasons: {
      'Pain Relief': number;
      'Anxiety/Stress Management': number;
      'Sleep Aid': number;
      'General Wellness': number;
      'Skin Care': number;
      'Other': number;
    };
    discoveryMethods: {
      'Social Media': number;
      'Friend/Family': number;
      'Search Engine': number;
      'Advertisement': number;
      'Other': number;
    };
  };
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    totalCustomers: 0,
    loyaltyMembers: 0,
    totalEmails: 0,
    sentToday: 0,
    engagementMetrics: {
      loyaltyRate: 0,
      averageAge: 0,
      mostPopularProduct: '',
      mostCommonReason: '',
      preferredShoppingChannel: '',
      topDiscoveryMethod: ''
    },
    demographics: {
      ageGroups: {
        '18-24': 0,
        '25-34': 0,
        '35-44': 0,
        '45-54': 0,
        '55+': 0
      },
      genderDistribution: {
        'Male': 0,
        'Female': 0,
        'Other': 0
      },
      incomeDistribution: {
        'Under $25,000': 0,
        '$25,000 - $50,000': 0,
        '$50,000 - $75,000': 0,
        '$75,000 - $100,000': 0,
        'Over $100,000': 0
      },
      educationDistribution: {
        'High School': 0,
        'Some College': 0,
        "Bachelor's Degree": 0,
        "Master's Degree": 0,
        'Doctorate': 0
      },
      productPreferences: {
        'CBD Oil': 0,
        'Hemp-infused Edibles': 0,
        'Topical Creams': 0,
        'Hemp Flower': 0,
        'Hemp Clothing/Textiles': 0,
        'Hemp-based Supplements': 0
      },
      primaryReasons: {
        'Pain Relief': 0,
        'Anxiety/Stress Management': 0,
        'Sleep Aid': 0,
        'General Wellness': 0,
        'Skin Care': 0,
        'Other': 0
      },
      discoveryMethods: {
        'Social Media': 0,
        'Friend/Family': 0,
        'Search Engine': 0,
        'Advertisement': 0,
        'Other': 0
      }
    }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Overview of your hemp business metrics
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Total Customers"
              value={stats.totalCustomers}
              icon={<UserGroupIcon className="h-6 w-6 text-green-600" />}
            />
            <DashboardCard
              title="Loyalty Rate"
              value={`${stats.engagementMetrics.loyaltyRate.toFixed(2)}%`}
              icon={<HeartIcon className="h-6 w-6 text-red-600" />}
            />
            <DashboardCard
              title="Average Age"
              value={stats.engagementMetrics.averageAge}
              icon={<UserIcon className="h-6 w-6 text-blue-600" />}
            />
            <DashboardCard
              title="Most Popular Product"
              value={stats.engagementMetrics.mostPopularProduct}
              icon={<ShoppingBagIcon className="h-6 w-6 text-purple-600" />}
            />
          </div>

          {/* Demographics Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Demographics</h2>
            <DemographicCharts stats={stats} />
          </div>
        </main>
      </div>
    </div>
  );
}
