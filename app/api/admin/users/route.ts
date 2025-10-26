import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getUsers, inviteUser, deleteUser } from "@/app/lib/db";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: 'Failed to load users', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const user = await inviteUser(email);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Failed to invite user:", error);
    return NextResponse.json(
      { message: "Failed to invite user", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const id = body?.id ? Number(body.id) : undefined;
    const email = body?.email?.toString().toLowerCase();

    const deletedUser = await deleteUser(id, email);
    return NextResponse.json(
      { message: `User ${deletedUser.email} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to delete user:", error);

    let status = 500;
    let message = "Failed to delete user";

    if (error.message.includes("not found")) status = 404;
    else if (error.message.includes("Provide")) status = 400;
    else if (error.message.includes("Cannot delete")) status = 403;

    return NextResponse.json({ message, error: error.message }, { status });
  }
}

