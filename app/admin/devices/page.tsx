'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Smartphone, Plus, QrCode, Copy, Users, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface Device {
  id: string;
  name: string;
  code16: string;
  qrCode: string;
  assignedTo: string | null;
  status: 'assigned' | 'unassigned';
  createdAt: string;
}

export default function AdminDevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate loading devices
    const mockDevices: Device[] = [
      {
        id: '1',
        name: 'Device Alpha',
        code16: 'ABC123XYZ789QWER',
        qrCode: 'QR_ABC123XYZ789QWER',
        assignedTo: 'john@example.com',
        status: 'assigned',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Device Beta',
        code16: 'DEF456UVW012TYUI',
        qrCode: 'QR_DEF456UVW012TYUI',
        assignedTo: null,
        status: 'unassigned',
        createdAt: '2024-01-14',
      },
      {
        id: '3',
        name: 'Device Gamma',
        code16: 'GHI789OPQ345ASDF',
        qrCode: 'QR_GHI789OPQ345ASDF',
        assignedTo: 'jane@example.com',
        status: 'assigned',
        createdAt: '2024-01-13',
      },
    ];

    setDevices(mockDevices);
  }, []);

  const generateDeviceCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateDevice = () => {
    if (!newDeviceName.trim()) {
      toast.error('Please enter a device name');
      return;
    }

    const code16 = generateDeviceCode();
    const newDevice: Device = {
      id: Date.now().toString(),
      name: newDeviceName,
      code16,
      qrCode: `QR_${code16}`,
      assignedTo: null,
      status: 'unassigned',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setDevices([...devices, newDevice]);
    setNewDeviceName('');
    setIsCreateDialogOpen(false);
    toast.success('Device created successfully!');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  const stats = {
    total: devices.length,
    assigned: devices.filter(d => d.status === 'assigned').length,
    unassigned: devices.filter(d => d.status === 'unassigned').length,
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Device Management</h1>
                  <p className="text-gray-600">
                    Create and manage GPS tracking devices
                  </p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Device
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Device</DialogTitle>
                      <DialogDescription>
                        Enter a name for the new GPS tracking device
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="device-name">Device Name</Label>
                        <Input
                          id="device-name"
                          placeholder="Enter device name"
                          value={newDeviceName}
                          onChange={(e) => setNewDeviceName(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateDevice}>
                          Create Device
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                  <Smartphone className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">All created devices</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assigned</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.assigned}</div>
                  <p className="text-xs text-muted-foreground">Devices in use</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
                  <Activity className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.unassigned}</div>
                  <p className="text-xs text-muted-foreground">Available devices</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  All Devices
                </CardTitle>
                <CardDescription>
                  Manage all GPS tracking devices and their assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          device.status === 'assigned' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Code: {device.code16}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyCode(device.code16)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-400">
                            Created: {device.createdAt}
                            {device.assignedTo && (
                              <span className="ml-2">• Assigned to: {device.assignedTo}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={device.status === 'assigned' ? 'default' : 'secondary'}>
                          {device.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Code
                        </Button>
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