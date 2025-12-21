// app/api/donations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createDonation, getAllDonations, updateDonation, deleteDonation } from '@/app/lib/db';

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
    const donation = await createDonation({
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
      donation,
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create donation:', error);
    return NextResponse.json(
      { message: 'Failed to create donation', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const donations = await getAllDonations();
    donations.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ donations });
  } catch (error) {
    console.error('Failed to fetch donations:', error);
    return NextResponse.json(
      { message: 'Failed to load donations' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, amount, paymentMethod, donorName, type, notes, referral, collector } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { message: 'Donation ID is required' },
        { status: 400 }
      );
    }

    // Update the donation
    const donation = await updateDonation(parseInt(id), {
      date: date ? new Date(date) : undefined,
      amount: amount ? parseInt(amount) : undefined,
      paymentMethod,
      donorName,
      type,
      notes,
      referral,
      collector
    });

    return NextResponse.json({
      message: 'Donation updated successfully',
      donation,
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to update donation:', error);
    return NextResponse.json(
      { message: 'Failed to update donation', error: String(error) },
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
        { message: 'Donation ID is required' },
        { status: 400 }
      );
    }

    // Delete the donation
    await deleteDonation(parseInt(id));

    return NextResponse.json({
      message: 'Donation deleted successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to delete donation:', error);
    return NextResponse.json(
      { message: 'Failed to delete donation', error: String(error) },
      { status: 500 }
    );
  }
}
