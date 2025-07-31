export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email || !name) {
    return NextResponse.json({ success: false, message: 'Invalid user data' }, { status: 400 });
  }

  const client = await connectToMongoDB();
  const db = client.db('FINAL');
  const users = db.collection('users');

  const existingUser = await users.findOne({ email });

  if (!existingUser) {
    await users.insertOne({
      name,
      email,
      registeredDevices: 0,
      status: 'active',
      lastLogin: new Date().toISOString(),
      joinedAt: new Date().toISOString(),
    });
  } else {
    await users.updateOne(
      { email },
      { $set: { lastLogin: new Date().toISOString(), status: 'active' } }
    );
  }

  return NextResponse.json({ success: true, message: 'User stored/updated' });
}
