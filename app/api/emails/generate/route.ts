import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { template } = await request.json();

    // Get all customers without welcome emails
    const customers = await prisma.customer.findMany({
      where: {
        emails: {
          none: {}
        }
      }
    });

    const generatedEmails = await Promise.all(
      customers.map(async (customer) => {
        const subject = getEmailSubject(template, customer);
        const body = await generateEmailBody(template, customer);

        return prisma.email.create({
          data: {
            customerId: customer.id,
            subject,
            body,
            isSent: false
          }
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: `Generated ${generatedEmails.length} emails`,
      emails: generatedEmails
    });
  } catch (error) {
    console.error('Error generating emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate emails' },
      { status: 500 }
    );
  }
}

function getEmailSubject(template: string, customer: any): string {
  switch (template) {
    case 'welcome':
      return `Welcome to Hempdash, ${customer.firstName}!`;
    case 'followup':
      return `How's your hemp journey going, ${customer.firstName}?`;
    case 'promotion':
      return `Special Offer for ${customer.firstName} - Hempdash`;
    default:
      return `Welcome to Hempdash, ${customer.firstName}!`;
  }
}

async function generateEmailBody(template: string, customer: any): Promise<string> {
  const preferredProducts = JSON.parse(customer.preferredProducts);
  const interests = JSON.parse(customer.interests);

  switch (template) {
    case 'welcome':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2F855A;">Welcome to Hempdash, ${customer.firstName}!</h1>
          <p>We're excited to have you join our community of hemp enthusiasts. Based on your preferences, we think you'll love our ${preferredProducts.join(', ')} products.</p>
          <p>Your interests in ${interests.join(', ')} align perfectly with our product offerings.</p>
          <p>As a valued customer, you'll receive:</p>
          <ul>
            <li>Exclusive product updates</li>
            <li>Special member discounts</li>
            <li>Educational content about hemp</li>
          </ul>
          <p>Ready to explore our products? Visit our website to get started!</p>
          <p>Best regards,<br>The Hempdash Team</p>
        </div>
      `;
    case 'followup':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2F855A;">How's Your Hemp Journey Going?</h1>
          <p>Hi ${customer.firstName},</p>
          <p>We noticed you're interested in ${interests.join(', ')}. We'd love to hear about your experience with our products.</p>
          <p>Here are some products you might like based on your preferences:</p>
          <ul>
            ${preferredProducts.map((product: string) => `<li>${product}</li>`).join('')}
          </ul>
          <p>Let us know if you need any assistance!</p>
          <p>Best regards,<br>The Hempdash Team</p>
        </div>
      `;
    case 'promotion':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2F855A;">Special Offer Just for You!</h1>
          <p>Hi ${customer.firstName},</p>
          <p>We've noticed your interest in ${interests.join(', ')} and wanted to offer you a special discount on our ${preferredProducts.join(', ')} products.</p>
          <p>Use code WELCOME10 for 10% off your first purchase!</p>
          <p>This offer is exclusive to you and expires in 7 days.</p>
          <p>Happy shopping!</p>
          <p>Best regards,<br>The Hempdash Team</p>
        </div>
      `;
    default:
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2F855A;">Welcome to Hempdash!</h1>
          <p>Hi ${customer.firstName},</p>
          <p>Thank you for joining our community. We're excited to have you on board!</p>
          <p>Best regards,<br>The Hempdash Team</p>
        </div>
      `;
  }
} 