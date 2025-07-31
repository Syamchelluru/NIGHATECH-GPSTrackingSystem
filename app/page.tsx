'use client';

import { useAuth } from '@/components/providers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Shield, Users, Smartphone } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="h-12 w-12 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Nigha GPS</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced GPS tracking and device management system with real-time monitoring and comprehensive analytics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your devices in real-time with precise GPS coordinates and movement history
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle>Secure Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                OTP-based authentication for users and secure admin access with role-based permissions
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Smartphone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle>Device Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easy device registration via QR codes or 16-digit codes with comprehensive device analytics
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Button size="lg" onClick={() => router.push('/auth/login')}>
            User Login
          </Button>
          <Button size="lg" variant="outline" onClick={() => router.push('/auth/admin')}>
            Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
}