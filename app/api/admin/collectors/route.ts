import { NextRequest, NextResponse } from 'next/server';
import { getAllCollectors, createCollector, deleteCollector } from '@/app/lib/db';

// GET - Fetch all collectors
export async function GET() {
  try {
    const collectors = await getAllCollectors();
    // Sort by name since getAllCollectors doesn't include orderBy
    const sortedCollectors = collectors.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
    return NextResponse.json({ collectors: sortedCollectors });
  } catch (error) {
    console.error('Failed to fetch collectors:', error);
    return NextResponse.json(
      { message: 'Failed to load collectors', error: String(error) },
      { status: 500 }
    );
  }
}

// POST - Create a new collector
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: 'Collector name is required' },
        { status: 400 }
      );
    }

    const collector = await createCollector(name);
    return NextResponse.json({ collector }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create collector:', error);
    const status = error.message.includes('already exists') ? 400 : 500;
    return NextResponse.json(
      { message: error.message || 'Failed to create collector', error: String(error) },
      { status }
    );
  }
}

// DELETE - Delete a collector
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Collector ID is required' },
        { status: 400 }
      );
    }

    await deleteCollector(id);
    return NextResponse.json({ message: 'Collector deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete collector:', error);
    let status = 500;
    if (error.message.includes('not found')) status = 404;
    else if (error.message.includes('Cannot delete')) status = 400;
    else if (error.message.includes('required')) status = 400;
    
    return NextResponse.json(
      { message: error.message || 'Failed to delete collector', error: String(error) },
      { status }
    );
  }
}
