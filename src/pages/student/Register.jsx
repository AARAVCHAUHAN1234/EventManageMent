import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  User,
  Mail,
  School,
  GraduationCap,
  Phone,
  BookOpen,
  IdCard,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useToast } from '../../context/ToastContext';
import { isEmailRegisteredForEvent } from '../../utils/storage';
import { validateRegistrationForm } from '../../utils/validation';
import { formatDate, isDatePassed } from '../../utils/dateUtils';
import { RegistrationTicket } from '../../components/student/RegistrationTicket';
import { CategoryBadge } from '../../components/common/Badge';

const ACADEMIC_YEARS = [
  '1st Year (Freshman)',
  '2nd Year (Sophomore)',
  '3rd Year (Junior)',
  '4th Year (Senior)',
  'Postgraduate / Masters',
  'PhD Scholar',
];

export function Register() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { events, registerStudent, getEventCapacity } = useEvents();

  const event = events.find((e) => e.id === eventId);
  const capacity = getEventCapacity(event);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: 'Institute of Engineering & Technology',
    year: '2nd Year (Sophomore)',
    phone: '',
    department: 'Computer Science',
    studentId: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedRegistration, setCompletedRegistration] = useState(null);

  // Trigger celebration confetti upon success
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#10b981', '#f59e0b'],
      });
    } catch {
      // ignore in test environments
    }
  };

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-[#1e1e1e] text-rose-400 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#F6F3EC]">Event Not Found</h2>
        <p className="text-sm text-[#A69E8C]">
          The event you are attempting to register for could not be found.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] font-bold text-xs uppercase font-mono tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Active Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const isPast = isDatePassed(event.date);
  const deadlinePassed = isDatePassed(event.registrationDeadline);
  const isFull = capacity.isFull;

  // If already registered and showing success ticket
  if (completedRegistration) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <RegistrationTicket
          registration={completedRegistration}
          event={event}
          onBack={() => setCompletedRegistration(null)}
        />
      </div>
    );
  }

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Check Deadline
    if (deadlinePassed || isPast) {
      toast.error('Registration for this event has already closed.');
      return;
    }

    // 2. Check Capacity
    if (isFull) {
      toast.error('This event has reached maximum capacity.');
      return;
    }

    // 3. Client-side Form Validation
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please fill out all required fields properly.');
      return;
    }

    // 4. Duplicate Registration Check
    const alreadyRegistered = isEmailRegisteredForEvent(event.id, formData.email);
    if (alreadyRegistered) {
      setErrors((prev) => ({
        ...prev,
        email: 'You are already registered for this event.',
      }));
      toast.error('You are already registered for this event.');
      return;
    }

    // 5. Submit and Save to localStorage
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Smooth UX transition

    const newReg = registerStudent({
      eventId: event.id,
      name: formData.name.trim(),
      email: formData.email.trim(),
      college: formData.college.trim(),
      year: formData.year,
      phone: formData.phone.trim(),
      department: formData.department.trim(),
      studentId: formData.studentId.trim(),
    });

    setIsSubmitting(false);
    setCompletedRegistration(newReg);
    toast.success('Registration successful! Your pass is ready.');
    triggerConfetti();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <Link
        to={`/events/${event.id}`}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#A69E8C] hover:text-[#F6F3EC] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>[ Back to Event Details ]</span>
      </Link>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Event Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#141414] rounded-3xl border border-white/10 p-6 sm:p-7 shadow-2xl space-y-6 vintage-noise">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          <div>
            <CategoryBadge category={event.category} />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6F3EC] mt-3 leading-snug">
              {event.title}
            </h2>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-white/10 text-xs sm:text-sm text-[#A69E8C]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#222222] text-[#ECE5D8] border border-white/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-[#8A8272]">Date</p>
                <span className="font-bold text-[#F6F3EC]">{formatDate(event.date)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#222222] text-[#ECE5D8] border border-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-[#8A8272]">Time</p>
                <span className="font-bold text-[#F6F3EC]">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#222222] text-[#ECE5D8] border border-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-[#8A8272]">Venue</p>
                <span className="font-bold text-[#F6F3EC]">{event.venue}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#181818] rounded-2xl border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center text-[#A69E8C]">
              <span>Spots Available:</span>
              <span className="font-bold text-emerald-400">
                {capacity.remaining} of {capacity.max}
              </span>
            </div>
            <div className="flex justify-between items-center text-[#A69E8C]">
              <span>Reg. Deadline:</span>
              <span className="text-[#F6F3EC] font-semibold">{formatDate(event.registrationDeadline)}</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#1c1a14] border border-amber-500/25 rounded-2xl text-[11px] text-amber-200/90 flex items-start gap-2.5 font-mono">
            <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Instant confirmation pass with verifiable QR code will be generated upon submission.</span>
          </div>
        </div>

        {/* Right Col: Registration Form */}
        <div className="lg:col-span-7 bg-[#141414] rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl vintage-noise">
          <div className="mb-8">
            <div className="text-[11px] font-mono text-[#A69E8C] uppercase tracking-widest mb-1.5">
              [ OFFICIAL EVENT REGISTRATION // FORM ]
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F3EC] tracking-tight">
              Student Registration
            </h1>
            <p className="text-xs sm:text-sm text-[#A69E8C] mt-1 font-sans font-light">
              Please enter your details accurately to issue your verified digital pass.
            </p>
          </div>

          {/* Registration closed warning if applicable */}
          {(deadlinePassed || isFull || isPast) && (
            <div className="p-4 mb-6 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-xs text-rose-200 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold font-mono uppercase tracking-wider">Registration is closed</p>
                <p className="text-[#A69E8C] mt-0.5">
                  {isPast
                    ? 'This event has already concluded.'
                    : deadlinePassed
                    ? 'The registration deadline has passed.'
                    : 'This event has reached maximum capacity.'}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8] mb-2">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#736c60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-white/10 focus:border-[#ECE5D8] focus:ring-[#ECE5D8]/10'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8] mb-2">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#736c60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. student@university.edu"
                  className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-white/10 focus:border-[#ECE5D8] focus:ring-[#ECE5D8]/10'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8] mb-2">
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#736c60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-white/10 focus:border-[#ECE5D8] focus:ring-[#ECE5D8]/10'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.phone}</p>
              )}
            </div>

            {/* College / University */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8] mb-2">
                College / University <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-[#736c60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. Institute of Engineering & Technology"
                  className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:ring-2 transition-all ${
                    errors.college
                      ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-white/10 focus:border-[#ECE5D8] focus:ring-[#ECE5D8]/10'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.college && (
                <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.college}</p>
              )}
            </div>

            {/* Academic Year & Department in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8] mb-2">
                  Academic Year <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-[#736c60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-white/10 text-sm text-[#F6F3EC] bg-[#181818] focus:outline-none focus:border-[#ECE5D8] focus:ring-2 focus:ring-[#ECE5D8]/10 transition-all cursor-pointer"
                    disabled={deadlinePassed || isFull || isPast}
                  >
                    {ACADEMIC_YEARS.map((y) => (
                      <option key={y} value={y} className="bg-[#181818] text-[#F6F3EC]">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8] mb-2">
                  Department
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-[#736c60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-white/10 text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:border-[#ECE5D8] focus:ring-2 focus:ring-[#ECE5D8]/10 transition-all"
                    disabled={deadlinePassed || isFull || isPast}
                  />
                </div>
              </div>
            </div>

            {/* Student ID / Roll Number (Optional) */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#ECE5D8] mb-2">
                Student ID / Roll No. <span className="text-[#8A8272] lowercase font-normal">(optional)</span>
              </label>
              <div className="relative">
                <IdCard className="w-4 h-4 text-[#736c60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. CSE-2024-055"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-white/10 text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:border-[#ECE5D8] focus:ring-2 focus:ring-[#ECE5D8]/10 transition-all"
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting || deadlinePassed || isFull || isPast}
                className={`w-full py-4 px-6 rounded-xl font-bold font-mono uppercase text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 ${
                  deadlinePassed || isFull || isPast
                    ? 'bg-[#222222] text-[#736c60] border border-white/5 cursor-not-allowed shadow-none'
                    : 'bg-[#F6F3EC] hover:bg-white text-[#141414] shadow-xl hover:shadow-white/15 active:scale-[0.99] cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#141414]/30 border-t-[#141414] rounded-full animate-spin" />
                    <span>Issuing Digital Pass...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#141414]" />
                    <span>Confirm & Generate Event Pass</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
