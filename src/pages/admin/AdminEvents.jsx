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
      subtitle="View, create, modify, and manage all campus club events and masterclasses."
      actions={
        <Link
          to="/admin/events/new"
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:shadow-white/10 transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Event</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-[#141414] p-4 sm:p-5 rounded-3xl border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 vintage-noise">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#A69E8C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or venue..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm bg-[#1c1c1c] text-[#F6F3EC] placeholder-[#A69E8C]/60 focus:outline-none focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8] transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <label className="text-[11px] font-mono uppercase tracking-widest text-[#A69E8C]">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm bg-[#1c1c1c] text-[#F6F3EC] font-medium focus:outline-none focus:border-[#ECE5D8] cursor-pointer"
            >
              <option value="All" className="bg-[#181818] text-[#F6F3EC]">All Categories</option>
              <option value="Workshop" className="bg-[#181818] text-[#F6F3EC]">Workshop</option>
              <option value="Hackathon" className="bg-[#181818] text-[#F6F3EC]">Hackathon</option>
              <option value="Seminar" className="bg-[#181818] text-[#F6F3EC]">Seminar</option>
              <option value="Competition" className="bg-[#181818] text-[#F6F3EC]">Competition</option>
              <option value="Cultural" className="bg-[#181818] text-[#F6F3EC]">Cultural</option>
              <option value="Sports" className="bg-[#181818] text-[#F6F3EC]">Sports</option>
              <option value="Technical" className="bg-[#181818] text-[#F6F3EC]">Technical</option>
              <option value="Other" className="bg-[#181818] text-[#F6F3EC]">Other</option>
            </select>
          </div>
        </div>

        {/* Events Table Container */}
        <div className="bg-[#141414] rounded-3xl border border-white/10 shadow-2xl overflow-hidden vintage-noise">
          {filteredEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#181818] text-[#A69E8C] uppercase tracking-widest text-[10px] font-mono border-b border-white/10">
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
                <tbody className="divide-y divide-white/5">
                  {filteredEvents.map((evt) => {
                    const capacity = getEventCapacity(evt);
                    const status = getEventStatus(evt);
                    return (
                      <tr key={evt.id} className="hover:bg-[#181818]/60 transition-colors">
                        {/* Title & Image */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5 max-w-sm">
                            <img
                              src={evt.image}
                              alt={evt.title}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-[#1c1c1c] border border-white/10 opacity-90 shadow-md"
                            />
                            <div className="min-w-0">
                              <p className="font-serif font-bold text-sm sm:text-base text-[#F6F3EC] truncate flex items-center gap-1.5">
                                {evt.title}
                                {evt.isFeatured && (
                                  <span className="p-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold" title="Featured Event">
                                    ★
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-[#A69E8C] truncate max-w-xs font-sans font-light">
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
                        <td className="px-6 py-4 whitespace-nowrap font-mono">
                          <p className="font-semibold text-stone-200 text-xs sm:text-sm">{formatDate(evt.date)}</p>
                          <p className="text-xs text-[#8A8272]">{evt.time}</p>
                        </td>

                        {/* Venue */}
                        <td className="px-6 py-4 text-stone-300 font-sans">
                          <p className="truncate max-w-[150px]">{evt.venue}</p>
                        </td>

                        {/* Registrations */}
                        <td className="px-6 py-4 whitespace-nowrap font-mono">
                          <div className="space-y-1">
                            <span className="font-bold text-[#ECE5D8] text-xs">
                              {capacity.count} / {capacity.max}
                            </span>
                            <div className="w-20 h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden border border-white/5">
                              <div
                                className="h-full bg-[#ECE5D8] rounded-full"
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
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to={`/events/${evt.id}`}
                              target="_blank"
                              className="p-2 rounded-xl text-[#A69E8C] hover:text-[#F6F3EC] hover:bg-white/5 transition-colors"
                              title="View Public Page"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            <Link
                              to={`/admin/events/edit/${evt.id}`}
                              className="p-2 rounded-xl text-[#A69E8C] hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                              title="Edit Event"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget(evt)}
                              className="p-2 rounded-xl text-[#A69E8C] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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
            <div className="p-12 text-center text-xs font-mono text-[#A69E8C] space-y-2">
              <Calendar className="w-8 h-8 text-[#A69E8C]/40 mx-auto" />
              <p className="font-bold text-[#ECE5D8]">No events found matching search criteria.</p>
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
