// app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';

export default function DashboardRedirectPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (user.role === 'admin') {
      router.replace('/dashboard/admin');
    } else {
      router.replace('/dashboard/user');
    }
  }, [user, router]);

  return null;
}
