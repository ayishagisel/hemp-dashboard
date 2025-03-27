import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get total customers and emails
    const [totalCustomers, totalEmails] = await Promise.all([
      prisma.customer.count(),
      prisma.email.count(),
    ]);

    // Get loyalty program members
    const loyaltyMembers = await prisma.customer.count({
      where: {
        loyaltyProgramMember: true,
      },
    });

    // Get emails sent today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sentToday = await prisma.email.count({
      where: {
        status: 'sent',
        createdAt: {
          gte: today,
        },
      },
    });

    // Get customer demographics
    const customers = await prisma.customer.findMany({
      select: {
        age: true,
        gender: true,
        preferredProducts: true,
        primaryReason: true,
        frequencyOfUse: true,
        preferredShoppingMethod: true,
        discoveryMethod: true,
        incomeRange: true,
        occupation: true,
        educationLevel: true,
        preferredCommunication: true,
        interestsHobbies: true,
      },
    });

    // Process demographics
    const ageGroups: Record<string, number> = {};
    const genderDistribution: Record<string, number> = {};
    const productPreferences: Record<string, number> = {};
    const reasonsForUse: Record<string, number> = {};
    const shoppingMethods: Record<string, number> = {};
    const discoveryMethods: Record<string, number> = {};
    const incomeRanges: Record<string, number> = {};
    const educationLevels: Record<string, number> = {};
    const communicationPreferences: Record<string, number> = {};
    const interestsHobbies: Record<string, number> = {};

    customers.forEach((customer) => {
      // Age groups
      const ageGroup = getAgeGroup(customer.age);
      ageGroups[ageGroup] = (ageGroups[ageGroup] || 0) + 1;

      // Gender distribution
      genderDistribution[customer.gender] = (genderDistribution[customer.gender] || 0) + 1;

      // Product preferences
      customer.preferredProducts.split(', ').forEach((product) => {
        productPreferences[product] = (productPreferences[product] || 0) + 1;
      });

      // Reasons for use
      reasonsForUse[customer.primaryReason] = (reasonsForUse[customer.primaryReason] || 0) + 1;

      // Shopping methods
      shoppingMethods[customer.preferredShoppingMethod] = (shoppingMethods[customer.preferredShoppingMethod] || 0) + 1;

      // Discovery methods
      discoveryMethods[customer.discoveryMethod] = (discoveryMethods[customer.discoveryMethod] || 0) + 1;

      // Income ranges
      incomeRanges[customer.incomeRange] = (incomeRanges[customer.incomeRange] || 0) + 1;

      // Education levels
      educationLevels[customer.educationLevel] = (educationLevels[customer.educationLevel] || 0) + 1;

      // Communication preferences
      communicationPreferences[customer.preferredCommunication] = (communicationPreferences[customer.preferredCommunication] || 0) + 1;

      // Interests and hobbies
      customer.interestsHobbies.split(', ').forEach((interest) => {
        interestsHobbies[interest] = (interestsHobbies[interest] || 0) + 1;
      });
    });

    // Calculate engagement metrics
    const engagementMetrics = {
      loyaltyRate: totalCustomers > 0 ? (loyaltyMembers / totalCustomers) * 100 : 0,
      averageAge: customers.length > 0 
        ? Math.round(customers.reduce((sum, c) => sum + c.age, 0) / customers.length)
        : 0,
      mostPopularProduct: Object.entries(productPreferences)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A',
      mostCommonReason: Object.entries(reasonsForUse)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A',
      preferredShoppingChannel: Object.entries(shoppingMethods)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A',
      topDiscoveryMethod: Object.entries(discoveryMethods)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A',
    };

    return NextResponse.json({
      totalCustomers,
      loyaltyMembers,
      totalEmails,
      sentToday,
      engagementMetrics,
      demographics: {
        ageGroups,
        genderDistribution,
        productPreferences,
        reasonsForUse,
        shoppingMethods,
        discoveryMethods,
        incomeRanges,
        educationLevels,
        communicationPreferences,
        interestsHobbies,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

function getAgeGroup(age: number): string {
  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  return '55+';
} 