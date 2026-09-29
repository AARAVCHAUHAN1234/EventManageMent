import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  PlusCircle,
  LogOut,
  Sparkles,
  Menu,
  X,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';

export function AdminLayout({ children, title, subtitle, actions }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const { logout } = useAuth();
  const { restoreDefaults } = useEvents();
  const toast = useToast();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Events Management', path: '/admin/events', icon: Calendar },
    { name: 'New Event', path: '/admin/events/new', icon: PlusCircle },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    toast.info('Logged out from admin session');
    navigate('/admin/login');
  };

  const handleConfirmReset = () => {
    restoreDefaults();
    setShowResetModal(false);
    toast.success('Sample events and registrations restored successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight">NexClub Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          aria-label="Toggle admin sidebar"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg text-white tracking-tight leading-none">
                  Nex<span className="text-indigo-400">Club</span>
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                  Admin Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Main Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Utilities */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            onClick={() => setShowResetModal(true)}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-400/90 hover:bg-amber-500/10 hover:text-amber-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Admin Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-slate-200 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>

        {/* Page Body */}
        <div className="p-6 sm:p-8 flex-1">
          {children}
        </div>
      </main>

      {/* Reset Demo Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Demo Data?"
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
            <strong>Warning:</strong> This will restore the initial 8 sample events, sample student registrations, and reset local custom changes.
          </div>
          <p className="text-sm text-slate-600">
            Are you sure you want to restore the default sample dataset?
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setShowResetModal(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReset}
              className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition-colors"
            >
              Confirm Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
