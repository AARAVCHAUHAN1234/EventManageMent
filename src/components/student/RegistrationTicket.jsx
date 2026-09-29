import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, MapPin, User, Mail, School, Award, Printer, ArrowLeft, Sparkles, QrCode } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { CategoryBadge } from '../common/Badge';

export function RegistrationTicket({ registration, event, onBack }) {
  const ticketRef = useRef(null);

  if (!registration || !event) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Registration Confirmed!
        </h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          You are officially registered for <span className="font-semibold text-slate-900">{event.title}</span>. Present this pass at the entrance on event day.
        </p>
      </div>

      {/* Digital Ticket Card */}
      <div
        ref={ticketRef}
        className="relative bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden print:border-black print:shadow-none"
      >
        {/* Top Header of Ticket */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">
                Official Event Entry Pass
              </span>
            </div>
            <CategoryBadge category={event.category} className="bg-white/20 text-white border-white/30" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {event.title}
          </h3>

          <p className="text-xs text-indigo-200 mt-2">
            Pass ID: <span className="font-mono font-bold text-white uppercase">{registration.id}</span>
          </p>
        </div>

        {/* Perforated ticket punch notches */}
        <div className="relative flex items-center justify-between px-6 bg-slate-50 py-3 border-y border-dashed border-slate-300">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 border-r border-slate-300 print:hidden" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 border-l border-slate-300 print:hidden" />
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
            College Club Verified Ticket
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Registered: {formatDate(registration.registeredAt)}
          </span>
        </div>

        {/* Ticket Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Attendee Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Attendee Name</p>
              <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                {registration.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 uppercase font-semibold">Email Address</p>
                <p className="font-medium text-slate-700 truncate">{registration.email}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold">Phone Number</p>
                <p className="font-medium text-slate-700">{registration.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold">College / University</p>
                <p className="font-medium text-slate-700 truncate">{registration.college}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold">Academic Year</p>
                <p className="font-medium text-slate-700">{registration.year}</p>
              </div>
            </div>

            {/* Event Timing & Venue */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span className="font-semibold">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span className="font-medium">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* QR Code Graphic Box */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
            {/* High visual fidelity QR icon / representation */}
            <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center text-slate-800">
              <QrCode className="w-24 h-24 text-slate-900" />
            </div>
            <p className="mt-2 text-[10px] font-mono text-slate-500 uppercase tracking-wide">
              Scan at Entrance
            </p>
            <p className="text-[10px] font-bold text-emerald-600 mt-0.5">● Valid Pass</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Event Details</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Ticket</span>
          </button>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition-all"
          >
            <span>Explore More Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
