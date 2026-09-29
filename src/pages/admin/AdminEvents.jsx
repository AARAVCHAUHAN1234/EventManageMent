import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  Eye,
  Sparkles,
  MapPin,
  Users,
  AlertCircle,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useToast } from '../../context/ToastContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CategoryBadge, StatusBadge } from '../../components/common/Badge';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { formatDate, getEventStatus } from '../../utils/dateUtils';

export function AdminEvents() {
  const { events, removeEvent, getEventCapacity } = useEvents();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchSearch =
        evt.title.toLowerCase().includes(search.toLowerCase()) ||
        evt.venue.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        selectedCategory === 'All' ||
        evt.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [events, search, selectedCategory]);

  const handleDelete = () => {
    if (!deleteTarget) return;
    removeEvent(deleteTarget.id);
    toast.success(`Event "${deleteTarget.title}" deleted successfully.`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout
      title="Event Management"
      subtitle="View, create, modify, and manage all college club events."
      actions={
        <Link
          to="/admin/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Event</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event title or venue..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-semibold text-slate-500">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Seminar">Seminar</option>
              <option value="Competition">Competition</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Technical">Technical</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Events Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold">Event Details</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Date & Time</th>
                    <th className="px-6 py-4 font-bold">Venue</th>
                    <th className="px-6 py-4 font-bold">Registrations</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEvents.map((evt) => {
                    const capacity = getEventCapacity(evt);
                    const status = getEventStatus(evt);
                    return (
                      <tr key={evt.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Title & Image */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5 max-w-sm">
                            <img
                              src={evt.image}
                              alt={evt.title}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-slate-100 shadow-2xs"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                                {evt.title}
                                {evt.isFeatured && (
                                  <span className="p-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold" title="Featured Event">
                                    ⭐
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-slate-500 truncate max-w-xs">
                                {evt.shortDescription}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <CategoryBadge category={evt.category} />
                        </td>

                        {/* Date & Time */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-semibold text-slate-800">{formatDate(evt.date)}</p>
                          <p className="text-xs text-slate-400">{evt.time}</p>
                        </td>

                        {/* Venue */}
                        <td className="px-6 py-4 text-slate-600">
                          <p className="truncate max-w-[150px]">{evt.venue}</p>
                        </td>

                        {/* Registrations */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className="font-bold text-slate-800">
                              {capacity.count} / {capacity.max}
                            </span>
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${capacity.percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={status} />
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/events/${evt.id}`}
                              target="_blank"
                              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="View Public Page"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            <Link
                              to={`/admin/events/edit/${evt.id}`}
                              className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                              title="Edit Event"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget(evt)}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Event"
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
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No events found matching search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Event?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This will also remove all registrations associated with this event.`}
        confirmText="Delete Event"
      />
    </AdminLayout>
  );
}
