'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers';
import { User, Smartphone, QrCode, Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user } = useAuth();
  const [deviceCode, setDeviceCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [registeredDevices, setRegisteredDevices] = useState([
    { id: '1', name: 'Device Alpha', code: 'ABC123XYZ789QWER', registeredAt: '2024-01-15' },
    { id: '2', name: 'Device Beta', code: 'DEF456UVW012TYUI', registeredAt: '2024-01-10' },
  ]);

  const handleRegisterDevice = () => {
    if (!deviceCode || deviceCode.length !== 16) {
      toast.error('Please enter a valid 16-digit device code');
      return;
    }

    // Simulate device registration
    const newDevice = {
      id: Date.now().toString(),
      name: `Device ${String.fromCharCode(65 + registeredDevices.length)}`,
      code: deviceCode,
      registeredAt: new Date().toISOString().split('T')[0],
    };

    setRegisteredDevices([...registeredDevices, newDevice]);
    setDeviceCode('');
    toast.success('Device registered successfully!');
  };

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      const mockQRCode = 'QR789XYZ123ABCDE';
      setDeviceCode(mockQRCode);
      setIsScanning(false);
      toast.success('QR code scanned successfully!');
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">
                Manage your profile and device registrations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user?.name || ''}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Badge variant={user?.role === 'admin' ? 'destructive' : 'default'}>
                      {user?.role === 'admin' ? 'Administrator' : 'User'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Register New Device
                  </CardTitle>
                  <CardDescription>
                    Add a new device using QR code or 16-digit code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="device-code">Device Code</Label>
                    <Input
                      id="device-code"
                      placeholder="Enter 16-digit device code"
                      value={deviceCode}
                      onChange={(e) => setDeviceCode(e.target.value)}
                      maxLength={16}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleRegisterDevice}
                      disabled={!deviceCode || deviceCode.length !== 16}
                      className="flex-1"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Register Device
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleQRScan}
                      disabled={isScanning}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      {isScanning ? 'Scanning...' : 'Scan QR'}
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button variant="ghost" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload QR Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Registered Devices
                </CardTitle>
                <CardDescription>
                  Devices currently registered to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registeredDevices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-gray-500">Code: {device.code}</p>
                        <p className="text-xs text-gray-400">Registered: {device.registeredAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Active</Badge>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}