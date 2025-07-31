import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { otp: userOtp } = await req.json();
  const cookieStore = cookies();

  const storedOtp = cookieStore.get('otp')?.value;
  const userInfo = cookieStore.get('user-info')?.value;

  if (!storedOtp || !userInfo) {
    return NextResponse.json({ success: false, message: 'OTP expired or missing' }, { status: 400 });
  }

  if (userOtp !== storedOtp) {
    return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
  }

  const { email, name } = JSON.parse(userInfo);

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/store-user`, {
    method: 'POST',
    body: JSON.stringify({ email, name }),
    headers: { 'Content-Type': 'application/json' },
  });

  cookieStore.delete('otp');
  cookieStore.delete('user-info');

  return NextResponse.json({ success: true, message: 'OTP verified and user stored' });
}
