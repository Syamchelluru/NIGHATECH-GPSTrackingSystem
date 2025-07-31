'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/components/providers';
import { Mail, User, Shield } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSendOTP = async () => {
    if (!email || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      toast.success('OTP sent successfully to your email');
      setStep('otp');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'OTP verification failed');
      }

      // Set session client-side if needed
      login({ name, email, role: 'user' });

      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <CardTitle className="text-2xl">User Login</CardTitle>
          <CardDescription>
            {step === 'details' ? 'Enter your details to receive OTP' : 'Enter the OTP sent to your email'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'details' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep('details')}
                className="w-full"
              >
                Back to Details
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
