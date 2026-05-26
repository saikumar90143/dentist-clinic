'use client';

import { useState } from 'react';
import { LayoutDashboard, Calendar, Users, UserRound, FileText, DollarSign, Settings, Bell, TrendingUp, ChevronRight } from 'lucide-react';

const stats = [
  { label: "Today's Appointments", value: '8', change: '+2 vs yesterday', icon: Calendar, color: '#0d9488' },
  { label: 'New Leads Today', value: '12', change: '+5 vs yesterday', icon: TrendingUp, color: '#3b82f6' },
  { label: 'Monthly Revenue', value: '₹4.2L', change: '+18% vs last month', icon: DollarSign, color: '#f59e0b' },
  { label: 'Total Patients', value: '1,247', change: '+23 this month', icon: Users, color: '#8b5cf6' },
];

const appointments = [
  { id: 'SC-48291', patient: 'Ananya Mehta', doctor: 'Dr. Priya Verma', service: 'Smile Designing', time: '10:00 AM', date: 'Today', status: 'Confirmed' },
  { id: 'SC-48292', patient: 'Rohit Kapoor', doctor: 'Dr. Rajesh Sharma', service: 'Dental Implants', time: '11:30 AM', date: 'Today', status: 'Confirmed' },
  { id: 'SC-48293', patient: 'Preethi Nair', doctor: 'Dr. Amit Joshi', service: 'Invisible Braces', time: '2:00 PM', date: 'Today', status: 'Pending' },
  { id: 'SC-48294', patient: 'Sameer Khan', doctor: 'Dr. Rajesh Sharma', service: 'Root Canal', time: '3:30 PM', date: 'Today', status: 'Confirmed' },
  { id: 'SC-48295', patient: 'Deepika Sharma', doctor: 'Dr. Priya Verma', service: 'Teeth Whitening', time: '5:00 PM', date: 'Today', status: 'Cancelled' },
  { id: 'SC-48296', patient: 'Vikram Nanda', doctor: 'Dr. Sunita Patel', service: 'Gum Surgery', time: '9:00 AM', date: 'Tomorrow', status: 'Confirmed' },
];

const leads = [
  { name: 'Rahul Gupta', phone: '+91-98765-00001', concern: 'Missing tooth', source: 'Google', date: '2 hrs ago' },
  { name: 'Kavita Singh', phone: '+91-98765-00002', concern: 'Teeth whitening', source: 'Website', date: '3 hrs ago' },
  { name: 'Arun Mehta', phone: '+91-98765-00003', concern: 'Crooked teeth', source: 'WhatsApp', date: '5 hrs ago' },
  { name: 'Nisha Patel', phone: '+91-98765-00004', concern: 'Toothache', source: 'Emergency', date: '6 hrs ago' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Appointments', active: false },
  { icon: Users, label: 'Patients', active: false },
  { icon: UserRound, label: 'Doctors', active: false },
  { icon: FileText, label: 'Blog Posts', active: false },
  { icon: DollarSign, label: 'Pricing', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  Confirmed: { bg: '#f0fdfa', text: '#0d9488' },
  Pending: { bg: '#fffbeb', text: '#f59e0b' },
  Cancelled: { bg: '#fef2f2', text: '#ef4444' },
};

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'var(--font-inter)', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col" style={{ background: '#0f172a', minHeight: '100vh' }}>
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">SmileCraft</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeNav === item.label ? 'rgba(13,148,136,0.2)' : 'transparent',
                color: activeNav === item.label ? '#5eead4' : 'rgba(255,255,255,0.6)',
              }}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Demo notice */}
        <div className="p-4">
          <div className="rounded-xl p-3 text-xs" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
            ⚠️ DEMO — For presentation purposes only
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between" style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#0f172a' }}>Dashboard</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>Monday, 27 May 2024 — Have a great day!</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Bell size={16} style={{ color: '#475569' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
              A
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.color + '15' }}>
                    <stat.icon size={18} style={{ color: stat.color }} />
                  </div>
                  <ChevronRight size={14} style={{ color: '#94a3b8' }} />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#0f172a' }}>{stat.value}</div>
                <div className="text-xs font-medium mb-0.5" style={{ color: '#64748b' }}>{stat.label}</div>
                <div className="text-xs font-semibold" style={{ color: stat.color }}>{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: '+ New Appointment', color: '#0d9488' },
              { label: '+ Add Doctor', color: '#3b82f6' },
              { label: '+ New Blog Post', color: '#8b5cf6' },
              { label: 'Update Pricing', color: '#f59e0b' },
            ].map((action) => (
              <button key={action.label} className="py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: action.color }}>
                {action.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Appointments table */}
            <div className="xl:col-span-2 rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#f1f5f9' }}>
                <h2 className="font-bold" style={{ color: '#0f172a' }}>Today&apos;s Appointments</h2>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#f0fdfa', color: '#0d9488' }}>8 total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {['ID', 'Patient', 'Doctor', 'Service', 'Time', 'Status'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: '#94a3b8' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="border-b" style={{ borderColor: '#f8fafc' }}>
                        <td className="px-4 py-3 text-xs font-mono" style={{ color: '#64748b' }}>{apt.id}</td>
                        <td className="px-4 py-3 font-medium" style={{ color: '#0f172a' }}>{apt.patient}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#64748b' }}>{apt.doctor.split(' ').slice(0, 2).join(' ')}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#334155' }}>{apt.service}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#334155' }}>{apt.time}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: statusColors[apt.status].bg, color: statusColors[apt.status].text }}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#f1f5f9' }}>
                <h2 className="font-bold" style={{ color: '#0f172a' }}>Recent Leads</h2>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#eff6ff', color: '#3b82f6' }}>12 new</span>
              </div>
              <div className="divide-y" style={{ borderColor: '#f8fafc' }}>
                {leads.map((lead) => (
                  <div key={lead.name} className="px-5 py-4">
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-semibold text-sm" style={{ color: '#0f172a' }}>{lead.name}</div>
                      <span className="text-xs" style={{ color: '#94a3b8' }}>{lead.date}</span>
                    </div>
                    <div className="text-xs mb-1" style={{ color: '#64748b' }}>{lead.phone}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f0fdfa', color: '#0d9488' }}>{lead.concern}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }}>{lead.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
