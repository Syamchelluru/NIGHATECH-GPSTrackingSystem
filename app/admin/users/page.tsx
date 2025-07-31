'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Mail, Smartphone, Calendar, FileText, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';

interface User {
  _id: string;
  name: string;
  email: string;
  registeredDevices: number;
  lastLogin: string;
  status: 'active' | 'inactive';
  joinedAt: string;
}

const PAGE_SIZE = 5;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/auth/get-users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    withDevices: users.filter(u => u.registeredDevices > 0).length,
    totalDevices: users.reduce((sum, user) => sum + user.registeredDevices, 0),
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('User List', 14, 16);
    autoTable(doc, {
      head: [['Name', 'Email', 'Devices', 'Status', 'Joined', 'Last Login']],
      body: filteredUsers.map(u => [
        u.name,
        u.email,
        u.registeredDevices.toString(),
        u.status,
        new Date(u.joinedAt).toLocaleDateString(),
        new Date(u.lastLogin).toLocaleString()
      ])
    });
    doc.save('user-list.pdf');
  };

  const handleExportExcel = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(
      filteredUsers.map(u => ({
        Name: u.name,
        Email: u.email,
        Devices: u.registeredDevices,
        Status: u.status,
        Joined: new Date(u.joinedAt).toLocaleDateString(),
        LastLogin: new Date(u.lastLogin).toLocaleString()
      }))
    );
    utils.book_append_sheet(wb, ws, 'Users');
    writeFile(wb, 'user-list.xlsx');
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">View and manage all registered users</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All registered users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active}</div>
                <p className="text-xs text-muted-foreground">Recently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users with Devices</CardTitle>
                <Smartphone className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.withDevices}</div>
                <p className="text-xs text-muted-foreground">Have registered devices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                <Smartphone className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDevices}</div>
                <p className="text-xs text-muted-foreground">Registered by users</p>
              </CardContent>
            </Card>
          </div>

          {/* User List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    All Users
                  </CardTitle>
                  <CardDescription>
                    Complete list of registered users with their activity details
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button variant="outline" onClick={handleExportPDF} size="sm">
                    <FileText className="h-4 w-4 mr-2" /> PDF
                  </Button>
                  <Button onClick={handleExportExcel} size="sm">
                    <Download className="h-4 w-4 mr-2" /> Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedUsers.map((user) => (
                  <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Smartphone className="h-3 w-3" />
                            {user.registeredDevices} devices
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Joined {new Date(user.joinedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Last login: {new Date(user.lastLogin).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}
