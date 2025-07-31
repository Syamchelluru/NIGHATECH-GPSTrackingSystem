'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, Gauge, Route, Calendar } from 'lucide-react';
import { MapComponent } from '@/components/map/map-component';

interface LocationPoint {
  lat: number;
  lng: number;
  timestamp: string;
  speed: number;
}

interface DeviceDetails {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastSeen: string;
  totalDistance: number;
  avgSpeed: number;
  maxSpeed: number;
  path: LocationPoint[];
}

export default function DeviceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [device, setDevice] = useState<DeviceDetails | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Simulate device details loading
    const mockDevice: DeviceDetails = {
      id: id as string,
      name: `Device ${String.fromCharCode(64 + parseInt(id as string))}`,
      status: 'online',
      lastSeen: new Date().toISOString(),
      totalDistance: 125.7,
      avgSpeed: 35.2,
      maxSpeed: 78.5,
      path: [
        { lat: 40.7128, lng: -74.0060, timestamp: '2024-01-15T09:00:00Z', speed: 25.3 },
        { lat: 40.7589, lng: -73.9851, timestamp: '2024-01-15T09:15:00Z', speed: 42.1 },
        { lat: 40.7505, lng: -73.9934, timestamp: '2024-01-15T09:30:00Z', speed: 38.7 },
        { lat: 40.7410, lng: -73.9897, timestamp: '2024-01-15T09:45:00Z', speed: 31.2 },
      ],
    };

    setDevice(mockDevice);
  }, [id]);

  if (!device) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  // Prepare devices array for the MapComponent (required prop)
  const devicesForMap = [
    {
      id: device.id,
      name: device.name,
      isOnline: device.status === 'online',
      location: device.path[0] ? { lat: device.path[0].lat, lng: device.path[0].lng } : { lat: 20.5937, lng: 78.9629 },
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to History
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{device.name}</h1>
                  <p className="text-gray-600">
                    Device tracking history and analytics
                  </p>
                </div>
                <Badge variant={device.status === 'online' ? 'default' : 'secondary'}>
                  {device.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
                  <Route className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{device.totalDistance} km</div>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
                  <Gauge className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{device.avgSpeed} km/h</div>
                  <p className="text-xs text-muted-foreground">All-time average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Max Speed</CardTitle>
                  <Gauge className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{device.maxSpeed} km/h</div>
                  <p className="text-xs text-muted-foreground">Peak recorded</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Seen</CardTitle>
                  <Clock className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold">
                    {new Date(device.lastSeen).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(device.lastSeen).toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Travel Path
                  </CardTitle>
                  <CardDescription>
                    Device movement history for selected date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    {/* Pass both devices and path */}
                    <MapComponent devices={devicesForMap} path={device.path} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                  <CardDescription>
                    Detailed movement timeline with timestamps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {device.path.map((point, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div>
                            <p className="text-sm font-medium">
                              {new Date(point.timestamp).toLocaleTimeString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {point.speed} km/h
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
