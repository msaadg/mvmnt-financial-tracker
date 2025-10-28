import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

// GET - Fetch all collectors
export async function GET() {
  try {
    const collectors = await prisma.collectors.findMany({
      orderBy: { name: 'asc' },
    });
    
    return NextResponse.json({ collectors });
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

    // Check if collector already exists
    const existing = await prisma.collectors.findFirst({
      where: { name: name.trim() },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Collector with this name already exists' },
        { status: 400 }
      );
    }

    const collector = await prisma.collectors.create({
      data: { name: name.trim() },
    });

    return NextResponse.json({ collector }, { status: 201 });
  } catch (error) {
    console.error('Failed to create collector:', error);
    return NextResponse.json(
      { message: 'Failed to create collector', error: String(error) },
      { status: 500 }
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

    // Check if collector has associated donations or payments
    const collector = await prisma.collectors.findUnique({
      where: { collectorId: id },
      include: {
        donations: true,
        payments: true,
      },
    });

    if (!collector) {
      return NextResponse.json(
        { message: 'Collector not found' },
        { status: 404 }
      );
    }

    if (collector.donations.length > 0 || collector.payments.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete collector with associated donations or payments' },
        { status: 400 }
      );
    }

    await prisma.collectors.delete({
      where: { collectorId: id },
    });

    return NextResponse.json({ message: 'Collector deleted successfully' });
  } catch (error) {
    console.error('Failed to delete collector:', error);
    return NextResponse.json(
      { message: 'Failed to delete collector', error: String(error) },
      { status: 500 }
    );
  }
}
