// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createExpense, getCollectorByName } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, amount, paymentMethod, vendorProjId, category, description, status, collectors } = body;

    // Validate required fields
    if (!date || !amount || !paymentMethod || !vendorProjId || !category || !status) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find each collector in the database
    for (const c of collectors) {
      const collector = await getCollectorByName(c.name);
      if (!collector) {
        return NextResponse.json(
          { message: `Collector "${collector}" not found in database. Please seed the database first.` },
          { status: 404 }
        );
      }
    }

    // Create the expense
    const expense = await createExpense({
      date: new Date(date),
      amount: parseInt(amount),
      paymentMethod: paymentMethod,
      vendorProjId: parseInt(vendorProjId),
      category,
      description,
      status,
      collectors: collectors,
    });

    return NextResponse.json({
      message: 'Expense created successfully',
      expense,
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create expense:', error);
    return NextResponse.json(
      { message: 'Failed to create expense', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getAllExpenses } = await import('@/app/lib/db');
    const expenses = await getAllExpenses();
    return NextResponse.json({ expenses });
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
    return NextResponse.json(
      { message: 'Failed to load expenses' },
      { status: 500 }
    );
  }
}
