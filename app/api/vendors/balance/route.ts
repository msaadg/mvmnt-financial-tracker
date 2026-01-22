// app/api/vendors/balance/route.ts
import { NextResponse } from 'next/server';
import { getVendorBalance } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorName = searchParams.get('name');
    
    if (!vendorName) {
      return NextResponse.json(
        { message: 'Vendor name is required' },
        { status: 400 }
      );
    }

    const vendor = await getVendorBalance(vendorName);

    if (!vendor) {
      return NextResponse.json(
        { message: 'Vendor not found' },
        { status: 404 }
      );
    }

    const balance = vendor.balance;

    return NextResponse.json({
      vendorName: vendor.vendorName,
      balance,
    });
  } catch (error) {
    console.error('Failed to fetch vendor balance:', error);
    return NextResponse.json(
      { message: 'Failed to load vendor balance' },
      { status: 500 }
    );
  }
}
