import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This is a placeholder for actual email sending functionality
async function sendEmail(email: any) {
  try {
    // TODO: Implement actual email sending using a service like SendGrid
    // For now, we'll simulate email sending with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random failures (20% chance)
    if (Math.random() < 0.2) {
      throw new Error('Simulated email sending failure');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Get all pending emails
    const pendingEmails = await prisma.email.findMany({
      where: {
        status: 'pending'
      },
      include: {
        customer: true
      }
    });

    console.log(`Found ${pendingEmails.length} pending emails to send`);

    // Process each email
    const results = await Promise.all(
      pendingEmails.map(async (email) => {
        const success = await sendEmail(email);
        
        return prisma.email.update({
          where: { id: email.id },
          data: {
            status: success ? 'sent' : 'failed',
            updatedAt: new Date()
          }
        });
      })
    );

    const sentCount = results.filter(email => email.status === 'sent').length;
    const failedCount = results.filter(email => email.status === 'failed').length;

    return NextResponse.json({
      success: true,
      message: `Processed ${results.length} emails: ${sentCount} sent, ${failedCount} failed`,
      emails: results
    });
  } catch (error) {
    console.error('Error processing emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process emails' },
      { status: 500 }
    );
  }
} 