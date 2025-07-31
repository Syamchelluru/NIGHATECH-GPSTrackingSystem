'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers';
import { Settings, Mail, Database, Bell, Shield, Key } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.resend.com',
    smtpPort: '587',
    smtpUser: 'otp@nigha.tech',
    smtpPass: '********',
  });
  const [systemSettings, setSystemSettings] = useState({
    autoRefreshInterval: '5',
    maxDevicesPerUser: '10',
    dataRetentionDays: '30',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    deviceOfflineAlerts: true,
    loginNotifications: true,
    systemMaintenanceAlerts: true,
  });

  const handleSaveEmailSettings = () => {
    // Simulate saving email settings
    toast.success('Email settings saved successfully');
  };

  const handleSaveSystemSettings = () => {
    // Simulate saving system settings
    toast.success('System settings saved successfully');
  };

  const handleSaveNotificationSettings = () => {
    // Simulate saving notification settings
    toast.success('Notification settings saved successfully');
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
              <p className="text-gray-600">
                Configure system settings and preferences
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Administrator Profile
                  </CardTitle>
                  <CardDescription>
                    Your administrative account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value={user?.name || ''} readOnly className="bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={user?.email || ''} readOnly className="bg-gray-50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div>
                      <Badge variant="destructive">Administrator</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure OTP email service settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input
                        id="smtp-host"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input
                        id="smtp-port"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-user">SMTP Username</Label>
                      <Input
                        id="smtp-user"
                        value={emailSettings.smtpUser}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-pass">SMTP Password</Label>
                      <Input
                        id="smtp-pass"
                        type="password"
                        value={emailSettings.smtpPass}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpPass: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveEmailSettings}>
                    Save Email Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure system-wide settings and limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="refresh-interval">Auto Refresh Interval (seconds)</Label>
                      <Input
                        id="refresh-interval"
                        type="number"
                        value={systemSettings.autoRefreshInterval}
                        onChange={(e) => setSystemSettings({...systemSettings, autoRefreshInterval: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-devices">Max Devices Per User</Label>
                      <Input
                        id="max-devices"
                        type="number"
                        value={systemSettings.maxDevicesPerUser}
                        onChange={(e) => setSystemSettings({...systemSettings, maxDevicesPerUser: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Data Retention (days)</Label>
                      <Input
                        id="data-retention"
                        type="number"
                        value={systemSettings.dataRetentionDays}
                        onChange={(e) => setSystemSettings({...systemSettings, dataRetentionDays: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveSystemSettings}>
                    Save System Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure system-wide notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Device Offline Alerts</Label>
                        <p className="text-sm text-gray-500">
                          Send notifications when devices go offline
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.deviceOfflineAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, deviceOfflineAlerts: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Send notifications for new user logins
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.loginNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, loginNotifications: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Maintenance Alerts</Label>
                        <p className="text-sm text-gray-500">
                          Send notifications for scheduled maintenance
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemMaintenanceAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemMaintenanceAlerts: checked})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveNotificationSettings}>
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}