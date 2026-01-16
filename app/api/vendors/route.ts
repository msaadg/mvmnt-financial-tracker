// app/api/collectors/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAllVendors, deleteVendor, getUserRole } from '@/app/lib/db';

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    // Validate ID
    if (!name) {
      return NextResponse.json(
        { message: 'Vendor name is required' },
        { status: 400 }
      );
    }

    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({error: "Not Authenticated"}, {status: 401})
    }
    
    const role = await getUserRole(session.user?.email || "");
    const isAdmin = role.role === "admin" 

    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Only admins can delete payments' },
        { status: 403 }
      );
    }

    // Delete the payment
    await deleteVendor(name);

    return NextResponse.json({
      message: 'Vendor deleted successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to delete vendor:', error);
    return NextResponse.json(
      { message: 'Failed to delete vendor', error: String(error) },
      { status: 500 }
    );
  }
}