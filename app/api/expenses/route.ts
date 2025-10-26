// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createExpense, getCollectorByName, updateExpense, deleteExpense } from '@/app/lib/db';

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
    expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ expenses });
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
    return NextResponse.json(
      { message: 'Failed to load expenses' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, amount, paymentMethod, vendorProjId, category, description, status } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { message: 'Expense ID is required' },
        { status: 400 }
      );
    }

    // Update the expense
    const expense = await updateExpense(parseInt(id), {
      date: date ? new Date(date) : undefined,
      amount: amount ? parseInt(amount) : undefined,
      paymentMethod,
      vendorProjId: vendorProjId ? parseInt(vendorProjId) : undefined,
      category,
      description,
      status
    });

    return NextResponse.json({
      message: 'Expense updated successfully',
      expense,
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to update expense:', error);
    return NextResponse.json(
      { message: 'Failed to update expense', error: String(error) },
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
        { message: 'Expense ID is required' },
        { status: 400 }
      );
    }

    // Delete the expense
    await deleteExpense(parseInt(id));

    return NextResponse.json({
      message: 'Expense deleted successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to delete expense:', error);
    return NextResponse.json(
      { message: 'Failed to delete expense', error: String(error) },
      { status: 500 }
    );
  }
}
