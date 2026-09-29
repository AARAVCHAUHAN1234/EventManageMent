import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Bookmark, Sparkles, Users } from 'lucide-react';
import { CategoryBadge, StatusBadge } from '../common/Badge';
import { CapacityBar } from '../common/CapacityBar';
import { formatDate, getEventStatus, isDatePassed } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';
import { useToast } from '../../context/ToastContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';

export function EventCard({ event }) {
  const [imgSrc, setImgSrc] = useState(event.image || FALLBACK_IMAGE);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { getEventCapacity } = useEvents();
  const toast = useToast();

  const capacity = getEventCapacity(event);
  const status = getEventStatus(event);
  const isPast = status === 'past';
  const deadlinePassed = isDatePassed(event.registrationDeadline);
  const canRegister = !isPast && !deadlinePassed && !capacity.isFull;

  const handleBookmarkToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (nextState) {
      toast.success(`Saved "${event.title}" to bookmarks!`);
    } else {
      toast.info(`Removed "${event.title}" from bookmarks.`);
    }
  };

  return (
    <div className="event-shadow-card group p-6 sm:p-7">
      {/* Front Card Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6 text-white">
        {/* Top Header: Category, Date, Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryBadge category={event.category} className="bg-white/20 text-white border-white/30 backdrop-blur-md text-[11px]" />
              {event.isFeatured && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-md">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span className="truncate max-w-[170px]">{event.venue}</span>
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="text-xs font-bold text-slate-200 bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-300" />
              <span>{formatDate(event.date)}</span>
            </div>
            <StatusBadge status={status} className="bg-black/30 text-white border-white/20 text-[10px]" />
          </div>
        </div>

        {/* Bottom Section: Title, Description, Capacity, Actions */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1">
              <h3 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug group-hover:text-indigo-200 transition-colors line-clamp-2">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {event.shortDescription || event.description}
              </p>
            </div>

            {/* Bookmark SVG Action Button */}
            <button
              type="button"
              onClick={handleBookmarkToggle}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isBookmarked
                  ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-lg shadow-amber-400/30 scale-105'
                  : 'bg-white/10 border-white/40 text-white hover:bg-white/30 hover:scale-110 backdrop-blur-md'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Save Event'}
              aria-label="Bookmark Event"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Timing and Capacity Meter */}
          <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {event.time}
              </span>
              <span className="font-semibold text-slate-200">
                {capacity.count} / {capacity.max} spots
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${capacity.percentage}%` }}
              />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to={`/events/${event.id}`}
              className="w-full inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all text-center"
            >
              View Details
            </Link>

            {canRegister ? (
              <Link
                to={`/register/${event.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/40 hover:shadow-indigo-600/60 transition-all text-center"
              >
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                disabled
                className="w-full inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-white/10 cursor-not-allowed border border-white/10"
              >
                {isPast ? 'Concluded' : deadlinePassed ? 'Closed' : 'Full'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Background Image with Gradient Overlay */}
      <div className="card-bg">
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="bg-img"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/40" />
      </div>

      {/* Ambient Blurred Shadow Image Glow Effect */}
      <div className="shadow">
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="shadow-img"
          loading="lazy"
        />
      </div>
    </div>
  );
}
