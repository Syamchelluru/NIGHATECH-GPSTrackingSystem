// app/api/auth/get-users/route.ts
import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';

export async function GET() {
  const client = await connectToMongoDB();
  const db = client.db('FINAL');
  const users = await db.collection('users').find().toArray();

  return NextResponse.json(users);
}
