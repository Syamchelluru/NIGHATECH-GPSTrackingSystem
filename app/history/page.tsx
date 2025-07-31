'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { History, MapPin, Clock, Gauge, ChevronRight } from 'lucide-react';

interface DeviceHistoryItem {
  id: string;
  name: string;
  lastActive: string;
  totalTrips: number;
  avgSpeed: number;
  status: 'active' | 'inactive';
}

export default function HistoryPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<DeviceHistoryItem[]>([]);

  useEffect(() => {
    // Simulate device history data
    const mockDevices: DeviceHistoryItem[] = [
      {
        id: '1',
        name: 'Device Alpha',
        lastActive: '2024-01-15T10:30:00Z',
        totalTrips: 24,
        avgSpeed: 35.5,
        status: 'active',
      },
      {
        id: '2',
        name: 'Device Beta',
        lastActive: '2024-01-14T16:45:00Z',
        totalTrips: 18,
        avgSpeed: 42.3,
        status: 'inactive',
      },
      {
        id: '3',
        name: 'Device Gamma',
        lastActive: '2024-01-15T09:15:00Z',
        totalTrips: 31,
        avgSpeed: 28.7,
        status: 'active',
      },
    ];

    setDevices(mockDevices);
  }, []);

  const handleViewDetails = (deviceId: string) => {
    router.push(`/device/${deviceId}`);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Device History</h1>
              <p className="text-gray-600">
                View historical data and travel patterns for your devices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                  <MapPin className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {devices.reduce((sum, device) => sum + device.totalTrips, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last 7 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
                  <Gauge className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(devices.reduce((sum, device) => sum + device.avgSpeed, 0) / devices.length || 0).toFixed(1)} km/h
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all devices
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
                  <History className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {devices.filter(d => d.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently tracking
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Device History Overview
                </CardTitle>
                <CardDescription>
                  Click on any device to view detailed travel history and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${device.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(device.lastActive).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {device.totalTrips} trips
                            </span>
                            <span className="flex items-center gap-1">
                              <Gauge className="h-3 w-3" />
                              {device.avgSpeed} km/h avg
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={device.status === 'active' ? 'default' : 'secondary'}>
                          {device.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(device.id)}
                        >
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
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