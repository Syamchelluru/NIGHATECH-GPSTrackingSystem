// app/dashboard/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Smartphone, Activity, Eye } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalDevices: 0,
    onlineDevices: 0,
    totalUsers: 0,
    activeAlerts: 0,
  });

  useEffect(() => {
    // Simulate backend data
    setStats({
      totalDevices: 24,
      onlineDevices: 17,
      totalUsers: 12,
      activeAlerts: 3,
    });
  }, []);

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">System-wide stats overview</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="text-sm">Total Devices</CardTitle>
                <Smartphone className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDevices}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="text-sm">Online Devices</CardTitle>
                <Activity className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.onlineDevices}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="text-sm">Total Users</CardTitle>
                <Users className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="text-sm">Active Alerts</CardTitle>
                <Eye className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeAlerts}</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
