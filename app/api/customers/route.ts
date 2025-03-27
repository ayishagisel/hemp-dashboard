import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Customer } from '@prisma/client';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        emails: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format the data to ensure preferredProducts is always an array
    const formattedCustomers = customers.map((customer: Customer) => ({
      ...customer,
      preferredProducts: customer.preferredProducts ? 
        (Array.isArray(customer.preferredProducts) ? 
          customer.preferredProducts : 
          customer.preferredProducts.split(',').map((p: string) => p.trim())) : 
        []
    }));

    return NextResponse.json(formattedCustomers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Handle the "Other" reason case
    const primaryReason = data.primaryReason === 'Other' ? data.otherReason : data.primaryReason;

    // Ensure preferredProducts is a string
    const preferredProducts = Array.isArray(data.preferredProducts) 
      ? data.preferredProducts.join(',') 
      : data.preferredProducts;

    const customer = await prisma.customer.create({
      data: {
        ...data,
        primaryReason,
        preferredProducts,
        preferredShopping: data.preferredShoppingMethod // Map to the correct field name
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
} 