// app/api/collectors/route.ts
import { NextResponse } from 'next/server';
import { getAllVendors } from '@/app/lib/db';

type Vendor = Awaited<ReturnType<typeof getAllVendors>>[number];

export async function GET() {
  try {
    const vendors = await getAllVendors();
    return NextResponse.json({
      vendors: vendors.map((r: Vendor) => r.vendorName),
    });
  } catch (error) {
    console.error('Failed to fetch vendors:', error);
    return NextResponse.json(
      { message: 'Failed to load vendor', error: String(error) },
      { status: 500 }
    );
  }
}
