export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { email, name } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const cookieStore = cookies();
  cookieStore.set('otp', otp, { maxAge: 300, httpOnly: true });
  cookieStore.set('user-info', JSON.stringify({ email, name }), { maxAge: 300, httpOnly: true });

  console.log(`🔐 OTP for ${email}:`, otp); // Replace this with your email service

  return NextResponse.json({ success: true, message: 'OTP sent to email (simulated)' });
}
