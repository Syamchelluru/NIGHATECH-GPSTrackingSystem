'use client';

import { useAuth } from '@/components/providers';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Layout, 
  Settings, 
  History, 
  Users, 
  Smartphone, 
  LogOut,
  Shield,
  User
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const userMenuItems = [
    { icon: Layout, label: 'Dashboard', href: '/dashboard' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: History, label: 'Device History', href: '/history' },
  ];

  const adminMenuItems = [
    { icon: Layout, label: 'Dashboard', href: '/dashboard' },
    { icon: Smartphone, label: 'Device Management', href: '/admin/devices' },
    { icon: Users, label: 'User Management', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Card className={cn("w-64 h-screen p-4 border-r", className)}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-8">
          <MapPin className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold">Nigha GPS</h2>
            <p className="text-sm text-gray-500">
              {user?.role === 'admin' ? 'Admin Panel' : 'User Dashboard'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
          {user?.role === 'admin' ? (
            <Shield className="h-5 w-5 text-red-600" />
          ) : (
            <User className="h-5 w-5 text-blue-600" />
          )}
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => router.push(item.href)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full mt-4"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </Card>
  );
}