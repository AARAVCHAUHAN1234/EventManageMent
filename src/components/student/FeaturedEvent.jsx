import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, ArrowUpRight, ArrowRight } from 'lucide-react';
import { CategoryBadge, StatusBadge } from '../common/Badge';
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
    <section className="relative overflow-hidden rounded-3xl bg-[#141414] text-[#F6F3EC] shadow-2xl border border-white/10 vintage-noise group transition-all duration-300 hover:border-white/20">
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-12 z-10">
        {/* Left Col: Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5DEC9] text-[#141414] font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3 text-[#141414]" />
              Featured Highlight of the Term
            </span>
            <CategoryBadge category={event.category} className="bg-black/50 text-[#E5DEC9] border-white/20 text-[10px]" />
            <StatusBadge status={status} className="bg-black/40 text-[#C5BFAe] border-white/15 text-[10px]" />
          </div>

          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F6F3EC] tracking-tight leading-[1.05]">
              {event.title}
            </h2>
            <p className="mt-3 font-sans text-[#B8B1A2] text-sm sm:text-base leading-relaxed line-clamp-3 font-light">
              {event.description || event.shortDescription}
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#E5DEC9] border border-white/10">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#A69E8C] uppercase font-semibold">Date</p>
                <p className="text-xs font-bold text-[#F6F3EC]">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#E5DEC9] border border-white/10">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#A69E8C] uppercase font-semibold">Time</p>
                <p className="text-xs font-bold text-[#F6F3EC]">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#E5DEC9] border border-white/10">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#A69E8C] uppercase font-semibold">Venue</p>
                <p className="text-xs font-bold text-[#F6F3EC] truncate max-w-[130px]">{event.venue}</p>
              </div>
            </div>
          </div>

          {/* Registration status / deadline urgency */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2.5 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C5BFAe] font-medium text-[11px]">
                {capacity.count} of {capacity.max} seats reserved ({capacity.percentage}%)
              </span>
              {daysLeft !== null && daysLeft > 0 && !deadlinePassed && (
                <span className="text-[#E5DEC9] font-bold text-[11px]">
                  ⏳ {daysLeft} {daysLeft === 1 ? 'day' : 'days'} remaining
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E5DEC9] to-white rounded-full transition-all duration-500"
                style={{ width: `${capacity.percentage}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs uppercase tracking-wider">
            {canRegister ? (
              <Link
                to={`/register/${event.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] font-bold shadow-lg hover:scale-105 transition-all"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                disabled
                className="px-6 py-3 rounded-xl bg-white/5 text-stone-500 font-medium cursor-not-allowed border border-white/10"
              >
                {isPast ? 'Concluded' : deadlinePassed ? 'Registration Closed' : 'Fully Booked'}
              </button>
            )}

            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#E5DEC9] hover:text-white font-medium border border-white/15 transition-all backdrop-blur-md"
            >
              Full Details & Schedule &rarr;
            </Link>
          </div>
        </div>

        {/* Right Col: Large Showcase Image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] group/img bg-black">
            <img
              src={imgSrc}
              alt={event.title}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#F6F3EC] bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex items-center justify-between">
              <span className="text-[#A69E8C]">DEADLINE:</span>
              <span className="font-bold text-[#E5DEC9]">{formatDate(event.registrationDeadline)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
