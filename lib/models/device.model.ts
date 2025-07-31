// lib/models/device.model.ts
import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    registeredDevices: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    lastLogin: { type: Date, default: Date.now },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Device || mongoose.model('Device', DeviceSchema);
