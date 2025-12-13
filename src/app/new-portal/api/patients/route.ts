import { NextRequest, NextResponse } from 'next/server';
import { searchPatients } from '../../data/patients';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Add realistic delay for Playwright testing (300-500ms)
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));

    const results = searchPatients({
      lastName: body.lastName || undefined,
      firstName: body.firstName || undefined,
      account: body.account || undefined,
      phone: body.phone || undefined,
      dob: body.dob || undefined,
    });

    return NextResponse.json({ patients: results });
  } catch (error) {
    console.error('Patient search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to search patients' }, { status: 405 });
}
