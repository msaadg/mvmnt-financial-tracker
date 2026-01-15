// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { 
  createPaymentForVendor, 
  updatePayment, 
  deletePayment, 
  getAllPayments,
  getUserRole 
} from '@/app/lib/db';
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendorName, collector, type, amount, date, paymentMethod } = body;
    
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({error: "Not Authenticated"}, {status: 401})
    }
    
    const role = await getUserRole(session.user?.email || "");
    const isAdmin = role.role === "admin" 

    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Only admins can create payments' },
        { status: 403 }
      );
    }

    // Validate required fields
    if (!vendorName || !collector || !type || amount === undefined || !paymentMethod) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { message: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // Create the payment
    const payment = await createPaymentForVendor({
      vendorName,
      collectorName: collector,
      type,
      amount: parsedAmount,
      date: date ? new Date(date) : new Date(),
      paymentMethod,
    });

    return NextResponse.json({
      message: 'Payment created successfully',
      payment,
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create payment:', error);
    return NextResponse.json(
      { message: 'Failed to create payment', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const payments = await getAllPayments();
    payments.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    return NextResponse.json(
      { message: 'Failed to load payments' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, vendorName, collector, type, amount, date, paymentMethod } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { message: 'Payment ID is required' },
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
        { message: 'Only admins can update payments' },
        { status: 403 }
      );
    }

    // Perform the update
    const payment = await updatePayment(parseInt(id), {
      vendorName,
      collectorName: collector,
      type,
      amount: amount !== undefined ? Number(amount) : undefined,
      date: date ? new Date(date) : undefined,
      paymentMethod,
    });

    return NextResponse.json({
      message: 'Payment updated successfully',
      payment,
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to update payment:', error);
    return NextResponse.json(
      { message: 'Failed to update payment', error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { message: 'Payment ID is required' },
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
    await deletePayment(parseInt(id));

    return NextResponse.json({
      message: 'Payment deleted successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to delete payment:', error);
    return NextResponse.json(
      { message: 'Failed to delete payment', error: String(error) },
      { status: 500 }
    );
  }
}
