import { NextRequest, NextResponse } from 'next/server';
import { searchDrugs } from '../../data/drugs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Add realistic delay for Playwright testing (200-350ms)
    await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 150));

    const results = searchDrugs(body.query || '');

    return NextResponse.json({ drugs: results });
  } catch (error) {
    console.error('Drug search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to search drugs' }, { status: 405 });
}
