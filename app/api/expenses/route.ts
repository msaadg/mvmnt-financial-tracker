// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createExpense, getCollectorByName, updateExpense, deleteExpense, getUserRole } from '@/app/lib/db';
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, amount, vendorName, project, description } = body;
    
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({error: "Not Authenticated"}, {status: 401})
    }
    
    const role = await getUserRole(session.user?.email || "");
    const isAdmin = role.role === "admin" 

    // Validate required fields
    if (!date || amount === undefined || !vendorName || !project) {
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

    // Create the expense
    const expense = await createExpense({
      date: new Date(date),
      amount: parsedAmount,
      vendorName: vendorName,
      project : project,
      description : description,
      status: isAdmin ? "Approved" : "Pending", // pass computed status
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
    expenses.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    const { id, date, amount, vendorName, project, description } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { message: 'Expense ID is required' },
        { status: 400 }
      );
    }

    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({error: "Not Authenticated"}, {status: 401})
    }
    
    const role = await getUserRole(session.user?.email || "");
    const isAdmin = role.role === "admin" 

    // Perform the update (updateExpense will validate totals and handle payments)
    try {
      const expense = await updateExpense(parseInt(id), {
        date: date ? new Date(date) : undefined,
        amount: amount !== undefined ? Number(amount) : undefined,
        vendorName: vendorName,
        project: project,
        description: description,
        status: isAdmin ? "Approved" : "Pending",
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
