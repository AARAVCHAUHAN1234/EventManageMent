import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  Users,
  PlusCircle,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StatCard } from '../../components/admin/StatCard';
import { CategoryBadge, StatusBadge } from '../../components/common/Badge';
import { formatDate, formatDateTime, getEventStatus } from '../../utils/dateUtils';

export function AdminDashboard() {
  const { events, registrations, getEventCapacity } = useEvents();

  // Dynamic Metrics Calculation
  const stats = useMemo(() => {
    const total = events.length;
    let upcoming = 0;
    let past = 0;
    let totalMaxSpots = 0;

    events.forEach((evt) => {
      const st = getEventStatus(evt);
      if (st === 'upcoming') upcoming++;
      else past++;
      totalMaxSpots += Number(evt.maxParticipants) || 0;
    });

    const totalRegs = registrations.length;
    const occupancyRate =
      totalMaxSpots > 0 ? Math.min(100, Math.round((totalRegs / totalMaxSpots) * 100)) : 0;

    // Featured event
    const featured = events.find((e) => e.isFeatured) || null;

    // Category distribution
    const catMap = {};
    events.forEach((evt) => {
      const cat = evt.category || 'Other';
      catMap[cat] = (catMap[cat] || 0) + 1;
    });

    return {
      total,
      upcoming,
      past,
      totalRegs,
      occupancyRate,
      featured,
      categories: Object.entries(catMap).sort((a, b) => b[1] - a[1]),
    };
  }, [events, registrations]);

  // Recent 5 registrations
  const recentRegistrations = useMemo(() => {
    return [...registrations]
      .sort((a, b) => new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0))
      .slice(0, 5);
  }, [registrations]);

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Real-time event performance and student participation metrics."
      actions={
        <Link
          to="/admin/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Event</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Total Events"
            value={stats.total}
            subtitle={`${stats.upcoming} Upcoming, ${stats.past} Past`}
            icon={Calendar}
            color="indigo"
          />

          <StatCard
            title="Total Registrations"
            value={stats.totalRegs}
            subtitle="Verified student entries"
            icon={Users}
            color="emerald"
          />

          <StatCard
            title="Upcoming Events"
            value={stats.upcoming}
            subtitle="Scheduled for this term"
            icon={CalendarClock}
            color="purple"
          />

          <StatCard
            title="Overall Fill Rate"
            value={`${stats.occupancyRate}%`}
            subtitle="Capacity utilization"
            icon={TrendingUp}
            color="amber"
          />
        </div>

        {/* Middle Section: Featured Event Spotlight & Category Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Event Admin Box */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Featured Highlight Event
              </h3>
              {stats.featured && (
                <Link
                  to={`/admin/events/edit/${stats.featured.id}`}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Edit Highlight &rarr;
                </Link>
              )}
            </div>

            {stats.featured ? (
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <img
                  src={stats.featured.image}
                  alt={stats.featured.title}
                  className="w-full sm:w-36 h-28 object-cover rounded-xl shadow-xs"
                />
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={stats.featured.category} />
                    <span className="text-xs font-semibold text-slate-500">
                      {formatDate(stats.featured.date)}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 truncate">
                    {stats.featured.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {stats.featured.shortDescription}
                  </p>
                  <p className="text-xs font-medium text-indigo-600 pt-1">
                    Venue: {stats.featured.venue} • {stats.featured.time}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
                No event is currently marked as featured. Set one in the Event Management table.
              </div>
            )}
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Event Categories
            </h3>

            <div className="space-y-3">
              {stats.categories.map(([cat, count]) => {
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{cat}</span>
                      <span className="font-bold text-slate-500">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                Recent Student Registrations
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest signups submitted across all events.
              </p>
            </div>
            <Link
              to="/admin/registrations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <span>View All Registrations ({stats.totalRegs})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentRegistrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5 font-bold">Student</th>
                    <th className="px-6 py-3.5 font-bold">Event Registered</th>
                    <th className="px-6 py-3.5 font-bold">College / Year</th>
                    <th className="px-6 py-3.5 font-bold">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentRegistrations.map((reg) => {
                    const evt = events.find((e) => e.id === reg.eventId);
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{reg.name}</p>
                          <p className="text-xs text-slate-500">{reg.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-800">
                            {evt?.title || 'Unknown Event'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <p className="truncate max-w-[200px]">{reg.college}</p>
                          <p className="text-xs text-slate-400">{reg.year}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          {formatDateTime(reg.registeredAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No registrations recorded yet.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
