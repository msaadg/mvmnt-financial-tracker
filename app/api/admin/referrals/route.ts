import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

// GET - Fetch all referrals
export async function GET() {
  try {
    const referrals = await prisma.referrals.findMany({
      orderBy: { name: 'asc' },
    });
    
    return NextResponse.json({ referrals });
  } catch (error) {
    console.error('Failed to fetch referrals:', error);
    return NextResponse.json(
      { message: 'Failed to load referrals', error: String(error) },
      { status: 500 }
    );
  }
}

// POST - Create a new referral
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: 'Referral name is required' },
        { status: 400 }
      );
    }

    // Check if referral already exists
    const existing = await prisma.referrals.findFirst({
      where: { name: name.trim() },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Referral with this name already exists' },
        { status: 400 }
      );
    }

    const referral = await prisma.referrals.create({
      data: { name: name.trim() },
    });

    return NextResponse.json({ referral }, { status: 201 });
  } catch (error) {
    console.error('Failed to create referral:', error);
    return NextResponse.json(
      { message: 'Failed to create referral', error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Delete a referral
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Referral ID is required' },
        { status: 400 }
      );
    }

    // Check if referral has associated donations
    const referral = await prisma.referrals.findUnique({
      where: { referralId: id },
      include: {
        donations: true,
      },
    });

    if (!referral) {
      return NextResponse.json(
        { message: 'Referral not found' },
        { status: 404 }
      );
    }

    if (referral.donations.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete referral with associated donations' },
        { status: 400 }
      );
    }

    await prisma.referrals.delete({
      where: { referralId: id },
    });

    return NextResponse.json({ message: 'Referral deleted successfully' });
  } catch (error) {
    console.error('Failed to delete referral:', error);
    return NextResponse.json(
      { message: 'Failed to delete referral', error: String(error) },
      { status: 500 }
    );
  }
}
