// app/api/collectors/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getAllProjects } from '@/app/lib/db';

type Project = Awaited<ReturnType<typeof getAllProjects>>[number];

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json({
      projects: projects.map((p: Project) => p.project),
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { message: 'Failed to load projects', error: String(error) },
      { status: 500 }
    );
  }
}