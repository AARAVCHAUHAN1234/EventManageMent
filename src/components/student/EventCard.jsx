import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Bookmark, Sparkles, Users } from 'lucide-react';
import { CategoryBadge, StatusBadge } from '../common/Badge';
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
    <div className="event-shadow-card group p-6 sm:p-7 transition-all duration-300">
      {/* Front Card Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6 text-[#F6F3EC]">
        {/* Top Header: Category, Date, Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryBadge category={event.category} className="bg-black/50 text-[#E5DEC9] border-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider" />
              {event.isFeatured && (
                <span className="px-2 py-0.5 rounded-full bg-[#E5DEC9] text-[#141414] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-md">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs text-[#A69E8C] font-mono flex items-center gap-1.5 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#E5DEC9] flex-shrink-0" />
              <span className="truncate max-w-[170px]">{event.venue}</span>
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="text-xs font-mono font-bold text-[#F6F3EC] bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#E5DEC9]" />
              <span>{formatDate(event.date)}</span>
            </div>
            <StatusBadge status={status} className="bg-black/40 text-[#C5BFAe] border-white/15 text-[10px] font-mono" />
          </div>
        </div>

        {/* Bottom Section: Title, Description, Capacity, Actions */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 flex-1">
              <h3 className="font-serif text-xl sm:text-2xl text-[#F6F3EC] tracking-tight leading-snug group-hover:text-white transition-colors line-clamp-2">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#B8B1A2] line-clamp-2 leading-relaxed font-sans font-light">
                {event.shortDescription || event.description}
              </p>
            </div>

            {/* Bookmark Action Button */}
            <button
              type="button"
              onClick={handleBookmarkToggle}
              className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isBookmarked
                  ? 'bg-[#E5DEC9] border-[#E5DEC9] text-[#141414] shadow-lg scale-105'
                  : 'bg-black/40 border-white/20 text-[#E5DEC9] hover:bg-white/20 hover:text-white hover:scale-110 active:scale-95 backdrop-blur-md'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Save Event'}
              aria-label="Bookmark Event"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Timing and Capacity Meter */}
          <div className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 space-y-2 font-mono">
            <div className="flex items-center justify-between text-[11px] text-[#A69E8C]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E5DEC9]" />
                {event.time}
              </span>
              <span className="font-semibold text-[#F6F3EC]">
                {capacity.count} / {capacity.max} SPOTS
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E5DEC9] to-white rounded-full transition-all duration-500"
                style={{ width: `${capacity.percentage}%` }}
              />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
            <Link
              to={`/events/${event.id}`}
              className="w-full inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl uppercase tracking-wider text-[#E5DEC9] bg-white/10 hover:bg-white/20 hover:text-white border border-white/15 backdrop-blur-md transition-all text-center"
            >
              Details
            </Link>

            {canRegister ? (
              <Link
                to={`/register/${event.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl uppercase tracking-wider font-bold text-[#141414] bg-[#F6F3EC] hover:bg-white shadow-md hover:scale-[1.02] active:scale-98 transition-all text-center"
              >
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                disabled
                className="w-full inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl uppercase tracking-wider font-medium text-stone-500 bg-white/5 cursor-not-allowed border border-white/10"
              >
                {isPast ? 'Closed' : deadlinePassed ? 'Expired' : 'Full'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Background Image with Editorial Scrim Overlay */}
      <div className="card-bg">
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="bg-img"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/98 via-[#0c0c0c]/75 to-[#0c0c0c]/45" />
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
