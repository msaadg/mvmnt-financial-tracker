// app/api/donations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createDonation, getCollectorByName, getReferralByName } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, amount, paymentMethod, donorName, type, notes, referral, collector } = body;

    // Validate required fields
    if (!date || !amount || !paymentMethod || !donorName || !type || !referral || !collector) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the donation
    const expense = await createDonation({
      date: new Date(date),
      amount: parseInt(amount),
      paymentMethod: paymentMethod,
      donorName: donorName,
      type: type,
      notes: notes,
      referral: referral,
      collector: collector
    });

    return NextResponse.json({
      message: 'Donation created successfully',
      expense,
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create donation:', error);
    return NextResponse.json(
      { message: 'Failed to create donation', error: String(error) },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     const { getAllExpenses } = await import('@/app/lib/db');
//     const expenses = await getAllExpenses();
//     return NextResponse.json({ expenses });
//   } catch (error) {
//     console.error('Failed to fetch expenses:', error);
//     return NextResponse.json(
//       { message: 'Failed to load expenses' },
//       { status: 500 }
//     );
//   }
// }
