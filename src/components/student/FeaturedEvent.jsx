import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CategoryBadge, StatusBadge } from '../common/Badge';
import { CapacityBar } from '../common/CapacityBar';
import { formatDate, getEventStatus, isDatePassed, getDaysRemaining } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80';

export function FeaturedEvent({ event }) {
  if (!event) return null;

  const [imgSrc, setImgSrc] = useState(event.image || FALLBACK_IMAGE);
  const { getEventCapacity } = useEvents();
  const capacity = getEventCapacity(event);

  const status = getEventStatus(event);
  const isPast = status === 'past';
  const deadlinePassed = isDatePassed(event.registrationDeadline);
  const daysLeft = getDaysRemaining(event.registrationDeadline);
  const canRegister = !isPast && !deadlinePassed && !capacity.isFull;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/20">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-12">
        {/* Left Col: Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Featured Event of the Month
            </span>
            <CategoryBadge category={event.category} className="bg-white/10 text-white border-white/20" />
            <StatusBadge status={status} className="bg-white/10 text-white border-white/20" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {event.title}
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
              {event.description || event.shortDescription}
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Date</p>
                <p className="text-sm font-bold text-white">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Time</p>
                <p className="text-sm font-bold text-white">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Venue</p>
                <p className="text-sm font-bold text-white truncate max-w-[140px]">{event.venue}</p>
              </div>
            </div>
          </div>

          {/* Registration status / deadline urgency */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">
                {capacity.count} out of {capacity.max} spots reserved ({capacity.percentage}%)
              </span>
              {daysLeft !== null && daysLeft > 0 && !deadlinePassed && (
                <span className="text-amber-400 font-semibold">
                  ⏳ {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left to register
                </span>
              )}
            </div>
            <div className="w-full h-2.5 bg-slate-700/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${capacity.percentage}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {canRegister ? (
              <Link
                to={`/register/${event.id}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Register for Event</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                disabled
                className="px-6 py-3.5 rounded-xl bg-slate-800 text-slate-400 font-bold text-sm cursor-not-allowed border border-slate-700"
              >
                {isPast ? 'Event Finished' : deadlinePassed ? 'Registration Closed' : 'Sold Out / Full'}
              </button>
            )}

            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all backdrop-blur-md"
            >
              Full Details & Schedule
            </Link>
          </div>
        </div>

        {/* Right Col: Large Showcase Image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 aspect-[4/3] group">
            <img
              src={imgSrc}
              alt={event.title}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
              <span>Registration Deadline</span>
              <span className="font-bold text-amber-300">{formatDate(event.registrationDeadline)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
