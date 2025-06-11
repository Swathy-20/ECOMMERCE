import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddProductForm } from '../../components/admin/AddProductForm';
import {useFetch} from '../../hooks/useFetch';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';


export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [data, loading, error] = useFetch('/admin/stats');
  const [showAddProductForm, setShowAddProductForm] = useState(false);


  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('authAdmin'));
    if (!storedAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (data) {
       //console.log("Fetched admin stats data:", data);
      setStats(data.stats);
      setRecentOrders(data.recentOrders || []);
      setSalesData(data.salesData || []);
    }
  }, [data]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;


  const quickActions = [
    { label: 'Add Product', path: '/admin/add-product', icon: '➕'},
    { label: 'Add Product Detail', path: '/admin/add-product-detail', icon: '📝'},
    { label: 'View Orders', path: '/admin/orders', icon: '📦' },
    { label: 'Manage Users', path: '/admin/customers', icon: '👥' },
    { label: 'View Reports', path: '/admin/statistics', icon: '📊' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <span className="text-2xl text-blue-600">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.users}</div>
            <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <span className="text-2xl text-green-600">🛍️</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.products || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">+12.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <span className="text-2xl text-purple-600">📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.orders || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">+8.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-2xl text-yellow-600">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{stats?.revenue?.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">+15.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24"
               onClick={() => navigate(action.path)}
              >
                <span className="text-2xl mb-2">{action.icon}</span>
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>

            {showAddProductForm && (
        <Card className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <Button
              onClick={() => setShowAddProductForm(false)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Close
            </Button>
          </div>
         
        </Card>
      )}

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders?.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id.slice(-8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.user?.name || 'Guest'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
