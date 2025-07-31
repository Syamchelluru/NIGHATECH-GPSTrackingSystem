// app/dashboard/user/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers';
import { MapPin, Smartphone, Activity, Eye, Clock } from 'lucide-react';
import { MapComponent } from '@/components/map/map-component';

interface Device {
  id: string;
  name: string;
  isOnline: boolean;
  lastSeen: string;
  location: { lat: number; lng: number };
  assignedTo?: string;
}

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const mockDevices: Device[] = [
      {
        id: '1',
        name: 'Device Alpha',
        isOnline: true,
        lastSeen: new Date().toISOString(),
        location: { lat: 17.6868, lng: 83.2185 }, // Vizag
        assignedTo: user?.email,
      },
      {
        id: '2',
        name: 'Device Beta',
        isOnline: false,
        lastSeen: new Date(Date.now() - 300000).toISOString(),
        location: { lat: 16.5062, lng: 80.6480 }, // Vijayawada
        assignedTo: user?.email,
      },
    ];

    setDevices(mockDevices);
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="text-sm">Your Devices</CardTitle>
                <Smartphone className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{devices.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="text-sm">Online Devices</CardTitle>
                <Activity className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {devices.filter((d) => d.isOnline).length}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Device Locations
                </CardTitle>
                <CardDescription>Real-time locations of your devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <MapComponent devices={devices} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Device Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            device.isOnline ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        />
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(device.lastSeen).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={device.isOnline ? 'default' : 'secondary'}>
                        {device.isOnline ? 'Online' : 'Offline'}
                      </Badge>
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
