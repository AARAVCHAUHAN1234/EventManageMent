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
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Event Not Found</h2>
        <p className="text-sm text-slate-500">
          The event you are attempting to register for could not be found.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Active Events</span>
        </Link>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <Link
        to={`/events/${event.id}`}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Event Details</span>
      </Link>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Event Summary Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <CategoryBadge category={event.category} />
            <h2 className="text-xl font-bold text-slate-900 mt-2 leading-snug">
              {event.title}
            </h2>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span className="font-semibold text-slate-800">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1 text-xs">
            <div className="flex justify-between font-medium text-slate-700">
              <span>Spots Available:</span>
              <span className="font-bold text-indigo-600">
                {capacity.remaining} of {capacity.max}
              </span>
            </div>
            <div className="flex justify-between font-medium text-slate-700">
              <span>Deadline:</span>
              <span>{formatDate(event.registrationDeadline)}</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-[11px] text-indigo-800 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <span>Instant confirmation ticket will be generated upon submitting.</span>
          </div>
        </div>

        {/* Right Col: Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Registration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please enter your details accurately to issue your event ticket.
            </p>
          </div>

          {/* Registration closed warning if applicable */}
          {(deadlinePassed || isFull || isPast) && (
            <div className="p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Registration is closed</p>
                <p>
                  {isPast
                    ? 'This event has ended.'
                    : deadlinePassed
                    ? 'The registration deadline has passed.'
                    : 'This event has reached full capacity.'}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-rose-400 focus:ring-rose-400/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. student@university.edu"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-400 focus:ring-rose-400/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-rose-400 focus:ring-rose-400/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>
              )}
            </div>

            {/* College / University */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                College / University <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. Institute of Engineering & Technology"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.college
                      ? 'border-rose-400 focus:ring-rose-400/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
              {errors.college && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.college}</p>
              )}
            </div>

            {/* Academic Year & Department in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Academic Year <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
                    disabled={deadlinePassed || isFull || isPast}
                  >
                    {ACADEMIC_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Department
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    disabled={deadlinePassed || isFull || isPast}
                  />
                </div>
              </div>
            </div>

            {/* Student ID / Roll Number (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Student ID / Roll No. (Optional)
              </label>
              <div className="relative">
                <IdCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. CSE-2024-055"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  disabled={deadlinePassed || isFull || isPast}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || deadlinePassed || isFull || isPast}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  deadlinePassed || isFull || isPast
                    ? 'bg-slate-300 cursor-not-allowed shadow-none'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25 active:scale-[0.99]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Get Event Pass</span>
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
