// app/api/auth/send/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { email, name } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP and user info in cookies (5 minutes)
  const cookieStore = cookies();
  cookieStore.set('otp', otp, { maxAge: 300, httpOnly: true });
  cookieStore.set('user-info', JSON.stringify({ email, name }), { maxAge: 300, httpOnly: true });

  // Send Email with OTP using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
    from: `"NighaTech" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Hello ${name || ''},\n\nYour OTP is: ${otp}\nIt is valid for 5 minutes.\n\nThanks,\nNighaTech Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
    return NextResponse.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send OTP' }, { status: 500 });
  }
}
