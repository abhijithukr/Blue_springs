import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Clock, User, Phone, Mail, FileText } from 'lucide-react';
import Button from '../components/Button';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/appointments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setAppointments(data.appointments || []);
        } else {
          setError(data.error || 'Failed to fetch appointments');
        }
      } catch (err) {
        setError('Connection error. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-xl text-primary font-medium animate-pulse">Loading secure dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page-admin-dashboard pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container max-w-6xl">

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments Dashboard</h1>
            <p className="text-secondary text-sm">Manage your clinic bookings</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="mt-4 md:mt-0 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
            <LogOut size={18} /> Logout
          </Button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Appointments List */}
        <div className="space-y-6">
          {appointments.length === 0 && !error ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Appointments Yet</h3>
              <p className="text-secondary">When patients book online, they will appear here.</p>
            </div>
          ) : (
            appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-blue-50/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="badge bg-primary text-white font-bold">{apt.service}</span>
                    <span className="text-sm font-medium text-secondary">
                      Booked on: {new Date(apt.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0 text-primary-dark font-bold text-lg">
                    <div className="flex items-center gap-1.5"><Calendar size={18} className="text-primary" /> {formatDate(apt.date)}</div>
                    <div className="flex items-center gap-1.5"><Clock size={18} className="text-primary" /> {apt.time}</div>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User size={20} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Patient Name</p>
                        <p className="font-semibold text-gray-900">{apt.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone size={20} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Phone</p>
                        <p className="font-semibold text-gray-900">{apt.phone}</p>
                      </div>
                    </div>

                    {apt.email && (
                      <div className="flex items-start gap-3">
                        <Mail size={20} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Email</p>
                          <p className="font-semibold text-gray-900">{apt.email}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {apt.message && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                      <FileText size={20} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Additional Notes</p>
                        <p className="text-sm text-gray-800 italic">"{apt.message}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
