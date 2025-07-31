export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email, name } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const cookieStore = cookies();
  cookieStore.set('otp', otp, { maxAge: 300, httpOnly: true });
  cookieStore.set('user-info', JSON.stringify({ email, name }), { maxAge: 300, httpOnly: true });

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"NighaTech OTP" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Your NighaTech OTP',
      html: `
        <h3>Hello ${name || 'User'},</h3>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send OTP' }, { status: 500 });
  }
}
