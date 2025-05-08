// app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    MONGODB_URI: process.env.MONGODB_URI ? 'exists' : 'undefined',
    env: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGODB_URI
  });
}