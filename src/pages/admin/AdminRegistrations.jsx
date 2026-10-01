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
      subtitle="Track verified attendees, filter by event, view student profiles and export digital rosters."
      actions={
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:shadow-white/10 transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search and Filters Strip */}
        <div className="bg-[#141414] p-4 sm:p-5 rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 vintage-noise">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A69E8C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, email, or college..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm bg-[#1c1c1c] text-[#F6F3EC] placeholder-[#A69E8C]/60 focus:outline-none focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8] transition-all font-sans"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Event Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#A69E8C]">Event:</label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm bg-[#1c1c1c] text-[#F6F3EC] font-medium focus:outline-none focus:border-[#ECE5D8] max-w-[200px] truncate cursor-pointer"
              >
                <option value="all" className="bg-[#181818] text-[#F6F3EC]">All Events ({registrations.length})</option>
                {events.map((evt) => (
                  <option key={evt.id} value={evt.id} className="bg-[#181818] text-[#F6F3EC]">
                    {evt.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Year Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#A69E8C]">Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm bg-[#1c1c1c] text-[#F6F3EC] font-medium focus:outline-none focus:border-[#ECE5D8] cursor-pointer"
              >
                <option value="all" className="bg-[#181818] text-[#F6F3EC]">All Years</option>
                {yearsList.map((year) => (
                  <option key={year} value={year} className="bg-[#181818] text-[#F6F3EC]">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-[#141414] rounded-3xl border border-white/10 shadow-2xl overflow-hidden vintage-noise">
          {filteredRegistrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#181818] text-[#A69E8C] uppercase tracking-widest text-[10px] font-mono border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-bold">Student Name</th>
                    <th className="px-6 py-4 font-bold">Event</th>
                    <th className="px-6 py-4 font-bold">Contact</th>
                    <th className="px-6 py-4 font-bold">College / Year</th>
                    <th className="px-6 py-4 font-bold">Registered Date</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRegistrations.map((reg) => {
                    const evt = eventMap[reg.eventId];
                    return (
                      <tr key={reg.id} className="hover:bg-[#181818]/60 transition-colors">
                        {/* Student */}
                        <td className="px-6 py-4">
                          <p className="font-serif font-bold text-sm sm:text-base text-[#F6F3EC]">{reg.name}</p>
                          <p className="text-xs text-[#8A8272] font-mono">{reg.id}</p>
                        </td>

                        {/* Event */}
                        <td className="px-6 py-4">
                          <p className="font-medium text-stone-200 max-w-xs truncate">
                            {evt?.title || 'Unknown Event'}
                          </p>
                          {evt && <CategoryBadge category={evt.category} className="mt-1" />}
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <p className="text-stone-300 font-sans text-xs">{reg.email}</p>
                          <p className="text-xs text-[#8A8272] font-mono">{reg.phone}</p>
                        </td>

                        {/* College & Year */}
                        <td className="px-6 py-4 text-stone-300">
                          <p className="truncate max-w-[180px] font-sans text-xs">{reg.college}</p>
                          <p className="text-xs text-[#8A8272] font-mono">{reg.year}</p>
                        </td>

                        {/* Registered At */}
                        <td className="px-6 py-4 text-[#A69E8C] font-mono whitespace-nowrap text-xs">
                          {formatDateTime(reg.registeredAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setViewRegistration(reg)}
                              className="p-2 rounded-xl text-[#A69E8C] hover:text-[#F6F3EC] hover:bg-white/5 transition-colors"
                              title="View Full Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget(reg)}
                              className="p-2 rounded-xl text-[#A69E8C] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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
            <div className="p-12 text-center text-xs font-mono text-[#A69E8C] space-y-2">
              <Users className="w-8 h-8 text-[#A69E8C]/40 mx-auto" />
              <p className="font-bold text-[#ECE5D8]">No student registrations found.</p>
              <p className="text-[#8A8272]">Try changing your search query or event filter.</p>
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
            <div className="p-4.5 bg-[#181818] border border-white/10 rounded-2xl space-y-1 vintage-noise">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ECE5D8]">
                [ REGISTERED EVENT ]
              </p>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#F6F3EC]">
                {eventMap[viewRegistration.eventId]?.title || 'Unknown Event'}
              </h4>
              <p className="text-xs text-[#A69E8C] font-mono">
                {formatDate(eventMap[viewRegistration.eventId]?.date)} • {eventMap[viewRegistration.eventId]?.venue}
              </p>
            </div>

            {/* Student Info Fields */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Student Name</p>
                <p className="font-serif font-bold text-sm text-[#F6F3EC] mt-0.5">{viewRegistration.name}</p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Registration ID</p>
                <p className="font-bold text-[#ECE5D8] mt-0.5">{viewRegistration.id}</p>
              </div>

              <div>
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Email Address</p>
                <p className="font-medium text-stone-200 mt-0.5 font-sans">{viewRegistration.email}</p>
              </div>

              <div>
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Phone Number</p>
                <p className="font-medium text-stone-200 mt-0.5">{viewRegistration.phone}</p>
              </div>

              <div className="col-span-2">
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">College / University</p>
                <p className="font-medium text-stone-200 mt-0.5 font-sans">{viewRegistration.college}</p>
              </div>

              <div>
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Academic Year</p>
                <p className="font-medium text-stone-200 mt-0.5">{viewRegistration.year}</p>
              </div>

              <div>
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Department</p>
                <p className="font-medium text-stone-200 mt-0.5 font-sans">
                  {viewRegistration.department || 'Not provided'}
                </p>
              </div>

              {viewRegistration.studentId && (
                <div>
                  <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Student ID / Roll No.</p>
                  <p className="font-medium text-stone-200 mt-0.5">{viewRegistration.studentId}</p>
                </div>
              )}

              <div>
                <p className="text-[#8A8272] uppercase tracking-wider text-[10px]">Registration Timestamp</p>
                <p className="font-medium text-stone-200 mt-0.5">
                  {formatDateTime(viewRegistration.registeredAt)}
                </p>
              </div>
            </div>

            {/* Footer Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono">
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(viewRegistration);
                }}
                className="px-3.5 py-2 text-xs uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Entry</span>
              </button>

              <button
                type="button"
                onClick={() => setViewRegistration(null)}
                className="px-4.5 py-2 text-xs uppercase tracking-wider font-bold bg-[#222222] hover:bg-[#2c2c2c] border border-white/10 text-[#F6F3EC] rounded-xl transition-colors"
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
