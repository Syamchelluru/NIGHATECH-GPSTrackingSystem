import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"NighaTech Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'WELCOME to NIGHATECH-GPSTracker',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #2E86C1;">WELCOME</h2>
        <p><strong>NIGHATECH-GPSTracker One Time Password (OTP) is:</strong></p>
        <p style="font-size: 24px; font-weight: bold;">${otp}</p>
        <p>Please do not share this OTP with anyone.</p>
        <br/>
        <p>Thank you,<br/>NighaTech Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ success: false, message: 'Failed to send OTP' }, { status: 500 });
  }
}
