import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  Calendar,
  Mail,
  Phone,
  School,
  IdCard,
  BookOpen,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useToast } from '../../context/ToastContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Modal } from '../../components/common/Modal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { formatDate, formatDateTime } from '../../utils/dateUtils';
import { CategoryBadge } from '../../components/common/Badge';

export function AdminRegistrations() {
  const { registrations, events, removeRegistration } = useEvents();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const [viewRegistration, setViewRegistration] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Map of events for quick title lookup
  const eventMap = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      map[e.id] = e;
    });
    return map;
  }, [events]);

  // Unique list of years from registrations
  const yearsList = useMemo(() => {
    const set = new Set();
    registrations.forEach((r) => {
      if (r.year) set.add(r.year);
    });
    return Array.from(set);
  }, [registrations]);

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      // Search by name, email, college
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        reg.name.toLowerCase().includes(q) ||
        reg.email.toLowerCase().includes(q) ||
        reg.college.toLowerCase().includes(q);

      // Event filter
      const matchEvent = selectedEventId === 'all' || reg.eventId === selectedEventId;

      // Year filter
      const matchYear = selectedYear === 'all' || reg.year === selectedYear;

      return matchSearch && matchEvent && matchYear;
    });
  }, [registrations, search, selectedEventId, selectedYear]);

  // Delete handler
  const handleDelete = () => {
    if (!deleteTarget) return;
    removeRegistration(deleteTarget.id);
    toast.success(`Registration for ${deleteTarget.name} removed successfully.`);
    setDeleteTarget(null);
    if (viewRegistration?.id === deleteTarget.id) {
      setViewRegistration(null);
    }
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      toast.warning('No registrations available to export.');
      return;
    }

    const headers = [
      'Registration ID',
      'Student Name',
      'Email',
      'Phone',
      'College',
      'Year',
      'Department',
      'Student ID',
      'Event Name',
      'Registered At',
    ];

    const rows = filteredRegistrations.map((reg) => {
      const evt = eventMap[reg.eventId];
      return [
        `"${reg.id || ''}"`,
        `"${(reg.name || '').replace(/"/g, '""')}"`,
        `"${(reg.email || '').replace(/"/g, '""')}"`,
        `"${(reg.phone || '').replace(/"/g, '""')}"`,
        `"${(reg.college || '').replace(/"/g, '""')}"`,
        `"${(reg.year || '').replace(/"/g, '""')}"`,
        `"${(reg.department || '').replace(/"/g, '""')}"`,
        `"${(reg.studentId || '').replace(/"/g, '""')}"`,
        `"${(evt?.title || 'Unknown Event').replace(/"/g, '""')}"`,
        `"${reg.registeredAt || ''}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `club_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Registrations exported as CSV file.');
  };

  return (
    <AdminLayout
      title="Student Registrations"
      subtitle="Track verified attendees, filter by event, view student profiles and export data."
      actions={
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search and Filters Strip */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, email, or college..."
              className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Event Filter */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Event:</label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 font-medium focus:outline-none focus:border-indigo-500 max-w-[200px] truncate cursor-pointer"
              >
                <option value="all">All Events ({registrations.length})</option>
                {events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Year Filter */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Years</option>
                {yearsList.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredRegistrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold">Student Name</th>
                    <th className="px-6 py-4 font-bold">Event</th>
                    <th className="px-6 py-4 font-bold">Contact</th>
                    <th className="px-6 py-4 font-bold">College / Year</th>
                    <th className="px-6 py-4 font-bold">Registered Date</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegistrations.map((reg) => {
                    const evt = eventMap[reg.eventId];
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Student */}
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{reg.name}</p>
                          <p className="text-xs text-slate-400 font-mono">{reg.id}</p>
                        </td>

                        {/* Event */}
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800 max-w-xs truncate">
                            {evt?.title || 'Unknown Event'}
                          </p>
                          {evt && <CategoryBadge category={evt.category} className="mt-1" />}
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <p className="text-slate-700">{reg.email}</p>
                          <p className="text-xs text-slate-400">{reg.phone}</p>
                        </td>

                        {/* College & Year */}
                        <td className="px-6 py-4 text-slate-600">
                          <p className="truncate max-w-[180px]">{reg.college}</p>
                          <p className="text-xs text-slate-400">{reg.year}</p>
                        </td>

                        {/* Registered At */}
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          {formatDateTime(reg.registeredAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewRegistration(reg)}
                              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="View Full Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget(reg)}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Registration"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 space-y-2">
              <Users className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No student registrations found.</p>
              <p className="text-slate-400">Try changing your search query or event filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Details Modal */}
      <Modal
        isOpen={!!viewRegistration}
        onClose={() => setViewRegistration(null)}
        title="Student Registration Details"
        maxWidth="max-w-lg"
      >
        {viewRegistration && (
          <div className="space-y-5">
            {/* Event Header in Modal */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Registered Event
              </p>
              <h4 className="font-bold text-base text-slate-900">
                {eventMap[viewRegistration.eventId]?.title || 'Unknown Event'}
              </h4>
              <p className="text-xs text-slate-500">
                {formatDate(eventMap[viewRegistration.eventId]?.date)} • {eventMap[viewRegistration.eventId]?.venue}
              </p>
            </div>

            {/* Student Info Fields */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="col-span-2 sm:col-span-1">
                <p className="text-slate-400 uppercase font-semibold">Student Name</p>
                <p className="font-bold text-sm text-slate-800 mt-0.5">{viewRegistration.name}</p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-slate-400 uppercase font-semibold">Registration ID</p>
                <p className="font-mono font-bold text-slate-800 mt-0.5">{viewRegistration.id}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold">Email Address</p>
                <p className="font-medium text-slate-800 mt-0.5">{viewRegistration.email}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold">Phone Number</p>
                <p className="font-medium text-slate-800 mt-0.5">{viewRegistration.phone}</p>
              </div>

              <div className="col-span-2">
                <p className="text-slate-400 uppercase font-semibold">College / University</p>
                <p className="font-medium text-slate-800 mt-0.5">{viewRegistration.college}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold">Academic Year</p>
                <p className="font-medium text-slate-800 mt-0.5">{viewRegistration.year}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold">Department</p>
                <p className="font-medium text-slate-800 mt-0.5">
                  {viewRegistration.department || 'Not provided'}
                </p>
              </div>

              {viewRegistration.studentId && (
                <div>
                  <p className="text-slate-400 uppercase font-semibold">Student ID / Roll No.</p>
                  <p className="font-medium text-slate-800 mt-0.5">{viewRegistration.studentId}</p>
                </div>
              )}

              <div>
                <p className="text-slate-400 uppercase font-semibold">Registration Timestamp</p>
                <p className="font-medium text-slate-800 mt-0.5">
                  {formatDateTime(viewRegistration.registeredAt)}
                </p>
              </div>
            </div>

            {/* Footer Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(viewRegistration);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Registration</span>
              </button>

              <button
                type="button"
                onClick={() => setViewRegistration(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Registration?"
        message={`Are you sure you want to cancel and remove the registration for "${deleteTarget?.name}"?`}
        confirmText="Remove Registration"
      />
    </AdminLayout>
  );
}
