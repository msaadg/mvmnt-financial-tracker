// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createExpense, getCollectorByName, updateExpense, deleteExpense } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, amount, paymentMethod, vendorProjId, category, description, status: incomingStatus, collectors } = body;

    // Validate required fields
    if (!date || amount === undefined || !paymentMethod || !vendorProjId || !category) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure collectors array is provided and is an array
    if (!Array.isArray(collectors) || collectors.length === 0) {
      return NextResponse.json(
        { message: 'Collectors must be provided and cannot be empty' },
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

    // Validate collectors exist and sum their amounts
    let collectorsTotal = 0;
    for (const c of collectors) {
      if (!c || !c.name) {
        return NextResponse.json(
          { message: `Collector entry missing name` },
          { status: 400 }
        );
      }
      const collectorEntry = await getCollectorByName(c.name);
      if (!collectorEntry) {
        return NextResponse.json(
          { message: `Collector "${c.name}" not found in database. Please seed the database first.` },
          { status: 404 }
        );
      }
      const cAmount = Number(c.amount || 0);
      if (isNaN(cAmount) || cAmount < 0) {
        return NextResponse.json(
          { message: `Invalid amount for collector "${c.name}"` },
          { status: 400 }
        );
      }
      collectorsTotal += cAmount;
    }

    // Ensure collectors total does not exceed the expense amount
    if (collectorsTotal > parsedAmount) {
      return NextResponse.json(
        { message: 'Sum of collector amounts exceeds the total expense amount' },
        { status: 400 }
      );
    }

    // Compute status based on collectors total vs amount
    const computedStatus = collectorsTotal < parsedAmount ? "Pending" : "Paid";

    // Create the expense
    const expense = await createExpense({
      date: new Date(date),
      amount: parsedAmount,
      paymentMethod: paymentMethod,
      vendorProjId: parseInt(vendorProjId),
      category,
      description,
      status: computedStatus, // pass computed status
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
    const { id, date, amount, paymentMethod, vendorProjId, category, description, status, collectors } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { message: 'Expense ID is required' },
        { status: 400 }
      );
    }

    // If collectors provided, validate array and each collector
    if (collectors !== undefined) {
      if (!Array.isArray(collectors)) {
        return NextResponse.json(
          { message: 'Collectors must be an array' },
          { status: 400 }
        );
      }

      for (const c of collectors) {
        if (!c || !c.name) {
          return NextResponse.json(
            { message: 'Collector entry missing name' },
            { status: 400 }
          );
        }
        const collectorEntry = await getCollectorByName(c.name);
        if (!collectorEntry) {
          return NextResponse.json(
            { message: `Collector "${c.name}" not found in database. Please seed the database first.` },
            { status: 404 }
          );
        }
        const cAmount = Number(c.amount || 0);
        if (isNaN(cAmount) || cAmount < 0) {
          return NextResponse.json(
            { message: `Invalid amount for collector "${c.name}"` },
            { status: 400 }
          );
        }
      }
    }

    // Perform the update (updateExpense will validate totals and handle payments)
    try {
      const expense = await updateExpense(parseInt(id), {
        date: date ? new Date(date) : undefined,
        amount: amount !== undefined ? Number(amount) : undefined,
        paymentMethod,
        vendorProjId: vendorProjId ? parseInt(vendorProjId) : undefined,
        category,
        description,
        status,
        collectors // may be undefined
      });

      return NextResponse.json({
        message: 'Expense updated successfully',
        expense,
      }, { status: 200 });
    } catch (dbError: any) {
      const errMsg = String(dbError?.message || dbError);
      if (errMsg.includes('exceeds')) {
        return NextResponse.json({ message: errMsg }, { status: 400 });
      }
      throw dbError;
    }
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
