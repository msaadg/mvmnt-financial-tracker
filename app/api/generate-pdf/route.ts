import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { latex, filename } = await request.json();

    if (!latex || !filename) {
      return NextResponse.json(
        { error: 'LaTeX content and filename are required' },
        { status: 400 }
      );
    }

    // Read image files from public folder and convert to base64
    const publicDir = path.join(process.cwd(), 'public');
    const images = ['logo.png', 'sign.png', 'stamp.png'];
    
    const imageResources: { path: string; file: string }[] = [];
    
    for (const image of images) {
      try {
        const imagePath = path.join(publicDir, image);
        const imageBuffer = await fs.readFile(imagePath);
        
        // Convert to base64 (without data URL prefix)
        const base64Image = imageBuffer.toString('base64');
        
        imageResources.push({
          path: image,
          file: base64Image
        });
        
        console.log(`Prepared ${image} as resource (${imageBuffer.length} bytes)`);
      } catch (err) {
        console.error(`Error reading ${image}:`, err);
      }
    }

    // Build request body as JSON according to LaTeX.Online API spec
    const requestBody = {
      compiler: 'pdflatex',
      resources: [
        {
          main: true,
          content: latex
        },
        ...imageResources
      ]
    };

    console.log('Sending request to LaTeX.Online...');
    console.log('Number of images:', imageResources.length);

    // Call LaTeX.Online API using POST with JSON
    const response = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('LaTeX.Online response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LaTeX compilation error:', errorText);
      console.error('Response status:', response.status);
      console.error('Response statusText:', response.statusText);
      throw new Error(`Failed to compile LaTeX document: ${response.status} ${response.statusText}`);
    }

    const pdfBuffer = await response.arrayBuffer();
    console.log('PDF generated successfully, size:', pdfBuffer.byteLength, 'bytes');

    // Return the PDF
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        message: error.message,
        details: 'Using LaTeX.Online cloud service for PDF generation.'
      },
      { status: 500 }
    );
  }
}
