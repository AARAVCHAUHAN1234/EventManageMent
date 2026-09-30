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
        <div className="w-16 h-16 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">[ REGISTRATION CONFIRMED ]</div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F3EC] tracking-tight">
          Pass Issued Successfully!
        </h2>
        <p className="text-[#A69E8C] text-xs sm:text-sm max-w-md mx-auto font-sans font-light">
          You are officially registered for <span className="font-semibold text-[#F6F3EC]">{event.title}</span>. Present this pass at the entrance on event day.
        </p>
      </div>

      {/* Digital Ticket Card */}
      <div
        ref={ticketRef}
        className="relative bg-[#141414] rounded-3xl border border-white/15 shadow-2xl overflow-hidden vintage-noise print:border-black print:bg-white print:text-black"
      >
        {/* Top Header of Ticket */}
        <div className="bg-[#181818] border-b border-white/10 text-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8]">
                Official Event Entry Pass
              </span>
            </div>
            <CategoryBadge category={event.category} />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F6F3EC] leading-tight">
            {event.title}
          </h3>

          <p className="text-xs text-[#A69E8C] font-mono mt-2">
            PASS ID: <span className="font-bold text-[#F6F3EC] uppercase">{registration.id}</span>
          </p>
        </div>

        {/* Perforated ticket punch notches */}
        <div className="relative flex items-center justify-between px-6 bg-[#111111] py-3 border-y border-dashed border-white/15">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0c0c0c] border-r border-white/15 print:hidden" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0c0c0c] border-l border-white/15 print:hidden" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#8A8272]">
            [ VERIFIED CAMPUS PASS ]
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#8A8272]">
            Issued: {formatDate(registration.registeredAt)}
          </span>
        </div>

        {/* Ticket Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Attendee Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <p className="text-[10px] font-mono text-[#8A8272] uppercase tracking-wider">Attendee Name</p>
              <p className="text-lg font-serif font-bold text-[#F6F3EC] flex items-center gap-2 mt-0.5">
                <User className="w-4 h-4 text-[#ECE5D8]" />
                {registration.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <p className="text-[10px] font-mono text-[#8A8272] uppercase tracking-wider">Email Address</p>
                <p className="font-medium text-[#ECE5D8] truncate mt-0.5">{registration.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#8A8272] uppercase tracking-wider">Phone Number</p>
                <p className="font-medium text-[#ECE5D8] mt-0.5">{registration.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#8A8272] uppercase tracking-wider">College / Institution</p>
                <p className="font-medium text-[#ECE5D8] truncate mt-0.5">{registration.college}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#8A8272] uppercase tracking-wider">Academic Year</p>
                <p className="font-medium text-[#ECE5D8] mt-0.5">{registration.year}</p>
              </div>
            </div>

            {/* Event Timing & Venue */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#A69E8C]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ECE5D8] flex-shrink-0" />
                <span className="font-bold text-[#F6F3EC]">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ECE5D8] flex-shrink-0" />
                <span className="text-[#ECE5D8]">{event.time}</span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ECE5D8] flex-shrink-0" />
                <span className="text-[#ECE5D8] truncate">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* QR Code Graphic Box */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#181818] rounded-2xl border border-white/10 text-center">
            {/* High visual fidelity QR icon / representation */}
            <div className="w-28 h-28 bg-[#F6F3EC] p-2 rounded-xl border border-white/20 shadow-inner flex items-center justify-center text-[#141414]">
              <QrCode className="w-24 h-24 text-[#141414]" />
            </div>
            <p className="mt-2 text-[10px] font-mono text-[#8A8272] uppercase tracking-wide">
              Scan at Entrance
            </p>
            <p className="text-[10px] font-mono font-bold text-emerald-400 mt-0.5">● VALID PASS</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-[#141414] text-[#A69E8C] hover:text-[#F6F3EC] hover:bg-[#1f1f1f] font-mono text-xs uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Form</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#222222] hover:bg-[#2c2c2c] border border-white/10 text-[#F6F3EC] font-mono text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] font-bold font-mono text-xs uppercase tracking-wider shadow-md transition-all"
          >
            <span>Browse More Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
