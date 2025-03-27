import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    console.log('Fetching emails with params:', { page, limit, skip });

    // Get total count for pagination
    const total = await prisma.email.count();
    console.log('Total emails:', total);

    const emails = await prisma.email.findMany({
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    console.log('Fetched emails:', emails);

    return NextResponse.json({
      emails,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
} 