import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { CategoryBadge, StatusBadge } from '../common/Badge';
import { CapacityBar } from '../common/CapacityBar';
import { formatDate, getEventStatus, isDatePassed } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';

export function EventCard({ event }) {
  const [imgSrc, setImgSrc] = useState(event.image || FALLBACK_IMAGE);
  const { getEventCapacity } = useEvents();
  const capacity = getEventCapacity(event);

  const status = getEventStatus(event);
  const isPast = status === 'past';
  const deadlinePassed = isDatePassed(event.registrationDeadline);
  const canRegister = !isPast && !deadlinePassed && !capacity.isFull;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <CategoryBadge category={event.category} className="shadow-sm backdrop-blur-md bg-white/90" />
          <StatusBadge status={status} className="shadow-sm backdrop-blur-md bg-white/90" />
        </div>

        {/* Featured Tag if applicable */}
        {event.isFeatured && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-amber-500 text-white text-[11px] font-bold tracking-wide uppercase shadow-md flex items-center gap-1">
            Featured Event
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 leading-tight">
            {event.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
            {event.shortDescription || event.description}
          </p>

          {/* Event Meta Details */}
          <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="font-medium text-slate-700">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* Capacity Progress */}
          <div className="mt-4">
            <CapacityBar
              count={capacity.count}
              max={capacity.max}
              percentage={capacity.percentage}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 mt-4 grid grid-cols-2 gap-2.5">
          <Link
            to={`/events/${event.id}`}
            className="w-full inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            View Details
          </Link>

          {canRegister ? (
            <Link
              to={`/register/${event.id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow-indigo-500/25 transition-all"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              disabled
              className="w-full inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 bg-slate-100 cursor-not-allowed"
              title={
                isPast
                  ? 'Event has ended'
                  : deadlinePassed
                  ? 'Registration deadline passed'
                  : 'Event is at full capacity'
              }
            >
              {isPast ? 'Closed' : deadlinePassed ? 'Deadline Passed' : 'Full'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
