import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // ✅ Fixed: default import
import DeviceModel from '@/lib/models/device.model';

export async function GET() {
  await connectDB();
  const devices = await DeviceModel.find().sort({ createdAt: -1 });
  return NextResponse.json(devices);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  if (!body.code || body.code.length !== 16) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
  }

  const exists = await DeviceModel.findOne({ code: body.code });
  if (exists) {
    return NextResponse.json({ error: 'Device already exists' }, { status: 409 });
  }

  const device = await DeviceModel.create({ code: body.code });
  return NextResponse.json(device);
}
