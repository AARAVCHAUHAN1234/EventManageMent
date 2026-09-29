import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Info,
  CalendarCheck,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useToast } from '../../context/ToastContext';
import { CategoryBadge, StatusBadge } from '../../components/common/Badge';
import { CapacityBar } from '../../components/common/CapacityBar';
import { formatDate, formatDateTime, getEventStatus, isDatePassed, getDaysRemaining } from '../../utils/dateUtils';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';

export function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { events, getEventCapacity, getEventRegistrations } = useEvents();

  const event = events.find((e) => e.id === id);
  const [imgSrc, setImgSrc] = useState(event?.image || FALLBACK_IMAGE);

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-[#1e1e1e] text-rose-400 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#F6F3EC]">Event Not Found</h2>
        <p className="text-sm text-[#A69E8C]">
          The event you are looking for does not exist or has been removed from the schedule.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] font-bold text-xs uppercase font-mono tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const capacity = getEventCapacity(event);
  const eventRegistrations = getEventRegistrations(event.id);
  const status = getEventStatus(event);
  const isPast = status === 'past';
  const deadlinePassed = isDatePassed(event.registrationDeadline);
  const daysLeft = getDaysRemaining(event.registrationDeadline);
  const canRegister = !isPast && !deadlinePassed && !capacity.isFull;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard!');
    } else {
      toast.info('Copy this page URL to share!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top back navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#A69E8C] hover:text-[#F6F3EC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ Back to Directory ]</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141414] border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F6F3EC] hover:bg-[#202020] hover:border-white/20 shadow-sm transition-all"
        >
          <Share2 className="w-3.5 h-3.5 text-[#ECE5D8]" />
          <span>Share Link</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="bg-[#141414] rounded-3xl border border-white/10 shadow-2xl overflow-hidden vintage-noise">
        {/* Banner image */}
        <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full bg-[#0c0c0c] overflow-hidden">
          <img
            src={imgSrc}
            alt={event.title}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
            <CategoryBadge category={event.category} className="shadow-lg bg-[#141414]/90 backdrop-blur-md" />
            <StatusBadge status={status} className="shadow-lg bg-[#141414]/90 backdrop-blur-md" />
            {event.isFeatured && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/90 backdrop-blur-md text-[#141414] text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg">
                ★ FEATURED
              </span>
            )}
          </div>
        </div>

        {/* Header content below banner */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          <div>
            <div className="text-[11px] font-mono text-[#A69E8C] uppercase tracking-widest mb-2">
              [ OFFICIAL CLUB ACTIVITY // REF #{event.id?.slice(0, 6)} ]
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F6F3EC] tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed font-sans font-light">
              {event.shortDescription}
            </p>
          </div>

          {/* Meta Detail Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#181818] border border-white/10 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#222222] text-[#ECE5D8] border border-white/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#A69E8C] uppercase font-mono text-[10px] tracking-wider">Event Date</p>
                <p className="font-bold text-[#F6F3EC] mt-0.5">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#222222] text-[#ECE5D8] border border-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#A69E8C] uppercase font-mono text-[10px] tracking-wider">Time / Duration</p>
                <p className="font-bold text-[#F6F3EC] mt-0.5">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#222222] text-[#ECE5D8] border border-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#A69E8C] uppercase font-mono text-[10px] tracking-wider">Venue / Location</p>
                <p className="font-bold text-[#F6F3EC] truncate max-w-[170px] mt-0.5">{event.venue}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#222222] text-[#ECE5D8] border border-white/10 flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#A69E8C] uppercase font-mono text-[10px] tracking-wider">Reg. Deadline</p>
                <p className={`font-bold mt-0.5 ${deadlinePassed ? 'text-rose-400' : 'text-[#F6F3EC]'}`}>
                  {formatDate(event.registrationDeadline)}
                </p>
              </div>
            </div>
          </div>

          {/* Capacity and Registration Bar */}
          <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-xs text-stone-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ECE5D8]" />
                  Capacity: <span className="font-bold text-[#F6F3EC]">{capacity.count} registered</span> / {capacity.max} max seats
                </span>
                {daysLeft !== null && daysLeft > 0 && !deadlinePassed && (
                  <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                    ⏳ {daysLeft} {daysLeft === 1 ? 'DAY' : 'DAYS'} REMAINING
                  </span>
                )}
              </div>
              <CapacityBar
                count={capacity.count}
                max={capacity.max}
                percentage={capacity.percentage}
                showText={false}
              />
              <p className="text-[11px] font-mono text-[#A69E8C]">
                {capacity.remaining} remaining seats available on a first-come, first-served basis.
              </p>
            </div>

            <div className="flex-shrink-0">
              {canRegister ? (
                <Link
                  to={`/register/${event.id}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] font-bold font-mono uppercase text-xs sm:text-sm tracking-wider shadow-lg hover:shadow-white/20 transition-all active:scale-95"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 rounded-xl bg-[#222222] text-[#A69E8C] font-mono font-bold text-xs uppercase tracking-wider cursor-not-allowed border border-white/5"
                >
                  {isPast
                    ? 'Event Concluded'
                    : deadlinePassed
                    ? 'Registration Closed'
                    : 'Event Fully Booked'}
                </button>
              )}
            </div>
          </div>

          {/* Description Body */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl font-serif font-bold text-[#F6F3EC]">About This Event</h3>
            <div className="prose prose-invert max-w-none text-sm sm:text-base text-stone-300 leading-relaxed space-y-4 whitespace-pre-line font-sans font-light">
              {event.description}
            </div>
          </div>

          {/* Event Guidelines and Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
              <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-[#ECE5D8] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                What's Included
              </h4>
              <ul className="text-xs text-[#A69E8C] space-y-1.5 list-disc list-inside font-sans">
                <li>Entry pass with unique QR check-in</li>
                <li>Digital certificate of participation</li>
                <li>Mentorship from senior faculty & industry leaders</li>
                <li>Access to workshop materials & source code</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
              <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-[#ECE5D8] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#ECE5D8]" />
                Important Instructions
              </h4>
              <ul className="text-xs text-[#A69E8C] space-y-1.5 list-disc list-inside font-sans">
                <li>Please carry your valid college student ID card</li>
                <li>Arrive at the venue at least 15 minutes before start time</li>
                <li>Bring your laptop & charger for hands-on sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
