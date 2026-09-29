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
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Event Not Found</h2>
        <p className="text-sm text-slate-500">
          The event you are looking for does not exist or has been removed from the schedule.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
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
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Event</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Banner image */}
        <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full bg-slate-900 overflow-hidden">
          <img
            src={imgSrc}
            alt={event.title}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
            <CategoryBadge category={event.category} className="shadow-md bg-white/95" />
            <StatusBadge status={status} className="shadow-md bg-white/95" />
            {event.isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Header content below banner */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              {event.shortDescription}
            </p>
          </div>

          {/* Meta Detail Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">Event Date</p>
                <p className="font-bold text-slate-800">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">Time / Duration</p>
                <p className="font-bold text-slate-800">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">Venue / Location</p>
                <p className="font-bold text-slate-800 truncate max-w-[170px]">{event.venue}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">Reg. Deadline</p>
                <p className={`font-bold ${deadlinePassed ? 'text-rose-600' : 'text-slate-800'}`}>
                  {formatDate(event.registrationDeadline)}
                </p>
              </div>
            </div>
          </div>

          {/* Capacity and Registration Bar */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Live Attendance Status: <span className="font-bold text-indigo-600">{capacity.count} registered</span> / {capacity.max} max seats
                </span>
                {daysLeft !== null && daysLeft > 0 && !deadlinePassed && (
                  <span className="text-xs font-bold text-amber-600">
                    ⏳ {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left to register
                  </span>
                )}
              </div>
              <CapacityBar
                count={capacity.count}
                max={capacity.max}
                percentage={capacity.percentage}
                showText={false}
              />
              <p className="text-[11px] text-slate-500">
                {capacity.remaining} remaining seats available on a first-come, first-served basis.
              </p>
            </div>

            <div className="flex-shrink-0">
              {canRegister ? (
                <Link
                  to={`/register/${event.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/25 transition-all"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm cursor-not-allowed"
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
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">About This Event</h3>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
              {event.description}
            </div>
          </div>

          {/* Event Guidelines and Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                What's Included
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Entry pass with unique QR check-in</li>
                <li>Digital certificate of participation</li>
                <li>Mentorship from senior faculty & industry leaders</li>
                <li>Access to workshop materials & source code</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-500" />
                Important Instructions
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
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
