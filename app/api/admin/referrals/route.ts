import { NextRequest, NextResponse } from 'next/server';
import { getAllReferrals, createReferral, deleteReferral } from '@/app/lib/db';

// GET - Fetch all referrals
export async function GET() {
  try {
    const referrals = await getAllReferrals();
    // Sort by name since getAllReferrals doesn't include orderBy
    const sortedReferrals = referrals.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
    return NextResponse.json({ referrals: sortedReferrals });
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

    const referral = await createReferral(name);
    return NextResponse.json({ referral }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create referral:', error);
    const status = error.message.includes('already exists') ? 400 : 500;
    return NextResponse.json(
      { message: error.message || 'Failed to create referral', error: String(error) },
      { status }
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

    await deleteReferral(id);
    return NextResponse.json({ message: 'Referral deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete referral:', error);
    let status = 500;
    if (error.message.includes('not found')) status = 404;
    else if (error.message.includes('Cannot delete')) status = 400;
    else if (error.message.includes('required')) status = 400;
    
    return NextResponse.json(
      { message: error.message || 'Failed to delete referral', error: String(error) },
      { status }
    );
  }
}
