import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const { count } = await request.json();

    // Generate mock customers
    const customers = await Promise.all(
      Array.from({ length: count }, async () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const zipCode = faker.location.zipCode();
        const phoneNumber = faker.phone.number();
        const email = faker.internet.email({ firstName, lastName });
        const age = faker.number.int({ min: 18, max: 75 });
        const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
        const preferredProducts = faker.helpers.arrayElements([
          'CBD Oil',
          'Hemp-infused Edibles',
          'Topical Creams',
          'Hemp Flower',
          'Hemp Clothing/Textiles',
          'Hemp-based Supplements'
        ], { min: 1, max: 4 }).join(', ');
        const primaryReason = faker.helpers.arrayElement([
          'Pain Relief',
          'Anxiety/Stress Management',
          'Sleep Aid',
          'General Wellness',
          'Skin Care',
          'Other'
        ]);
        const frequencyOfUse = faker.helpers.arrayElement([
          'Daily',
          'Weekly',
          'Monthly',
          'Occasionally'
        ]);
        const preferredShoppingMethod = faker.helpers.arrayElement([
          'Online',
          'In-store',
          'Both'
        ]);
        const discoveryMethod = faker.helpers.arrayElement([
          'Social Media',
          'Word of Mouth',
          'Online Search',
          'Advertisement',
          'Other'
        ]);
        const incomeRange = faker.helpers.arrayElement([
          '$25,000 - $50,000',
          '$50,000 - $75,000',
          '$75,000 - $100,000',
          '$100,000+'
        ]);
        const occupation = faker.person.jobTitle();
        const educationLevel = faker.helpers.arrayElement([
          'High School',
          'Some College',
          'Bachelor\'s Degree',
          'Master\'s Degree',
          'Doctorate'
        ]);
        const preferredCommunication = faker.helpers.arrayElement([
          'Email',
          'SMS',
          'Phone Call'
        ]);
        const interestsHobbies = faker.helpers.arrayElements([
          'Yoga',
          'Meditation',
          'Fitness',
          'Natural Health',
          'Holistic Wellness',
          'Nutrition'
        ], { min: 1, max: 3 }).join(', ');
        const loyaltyProgramMember = faker.datatype.boolean();

        return await prisma.customer.create({
          data: {
            firstName,
            lastName,
            zipCode,
            phoneNumber,
            email,
            age,
            gender,
            preferredProducts,
            primaryReason,
            frequencyOfUse,
            preferredShoppingMethod,
            discoveryMethod,
            incomeRange,
            occupation,
            educationLevel,
            preferredCommunication,
            interestsHobbies,
            loyaltyProgramMember,
          },
        });
      })
    );

    // Generate mock emails for each customer
    await Promise.all(
      customers.flatMap((customer) => {
        const emailTypes = ['welcome', 'follow-up', 'promotional'] as const;
        return emailTypes.map((emailType) => {
          const subject = getEmailSubject(emailType, customer);
          const body = getEmailBody(emailType, customer);
          
          return prisma.email.create({
            data: {
              customerId: customer.id,
              emailType,
              subject,
              body,
              status: faker.helpers.arrayElement(['pending', 'sent', 'failed']),
            },
          });
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: `Generated ${count} customers with mock data`,
    });
  } catch (error) {
    console.error('Error generating mock data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate mock data' },
      { status: 500 }
    );
  }
}

function getEmailSubject(type: string, customer: any): string {
  switch (type) {
    case 'welcome':
      return `Welcome to Hempdash, ${customer.firstName}!`;
    case 'follow-up':
      return `How are you enjoying your hemp products, ${customer.firstName}?`;
    case 'promotional':
      return `Special Offer: New Hemp Products Just for You, ${customer.firstName}!`;
    default:
      return `Hello ${customer.firstName}!`;
  }
}

function getEmailBody(type: string, customer: any): string {
  switch (type) {
    case 'welcome':
      return `Dear ${customer.firstName},\n\nWelcome to Hempdash! We're excited to have you join our community of hemp enthusiasts.\n\nBased on your preferences for ${customer.preferredProducts}, we think you'll love our selection.\n\nBest regards,\nThe Hempdash Team`;
    case 'follow-up':
      return `Hi ${customer.firstName},\n\nWe hope you're enjoying your hemp products! We'd love to hear your feedback.\n\nYour preferred products: ${customer.preferredProducts}\n\nBest regards,\nThe Hempdash Team`;
    case 'promotional':
      return `Hello ${customer.firstName},\n\nWe have some exciting new hemp products that match your interests in ${customer.preferredProducts}!\n\nBest regards,\nThe Hempdash Team`;
    default:
      return `Hello ${customer.firstName},\n\nThank you for being a valued customer.\n\nBest regards,\nThe Hempdash Team`;
  }
} 