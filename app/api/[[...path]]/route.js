import { NextResponse } from 'next/server';

// Simple health check API
export async function GET(request) {
  try {
    return NextResponse.json({
      message: 'NewsHub API is running',
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  return NextResponse.json(
    { message: 'Method not implemented' },
    { status: 501 }
  );
}