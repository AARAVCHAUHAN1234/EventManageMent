import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Users,
  AlertCircle,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useToast } from '../../context/ToastContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { validateEventForm } from '../../utils/validation';

const CATEGORIES = [
  'Workshop',
  'Hackathon',
  'Seminar',
  'Competition',
  'Cultural',
  'Sports',
  'Technical',
  'Other',
];

export function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { events, editEvent } = useEvents();

  const existing = events.find((e) => e.id === id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Workshop',
    date: '',
    time: '',
    venue: '',
    shortDescription: '',
    description: '',
    image: '',
    registrationDeadline: '',
    maxParticipants: 100,
    isFeatured: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existing) {
      setFormData({
        title: existing.title || '',
        category: existing.category || 'Workshop',
        date: existing.date || '',
        time: existing.time || '',
        venue: existing.venue || '',
        shortDescription: existing.shortDescription || '',
        description: existing.description || '',
        image: existing.image || '',
        registrationDeadline: existing.registrationDeadline || '',
        maxParticipants: existing.maxParticipants || 100,
        isFeatured: !!existing.isFeatured,
      });
    }
  }, [existing]);

  if (!existing) {
    return (
      <AdminLayout title="Event Not Found">
        <div className="max-w-md mx-auto text-center py-12 space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Event does not exist</h2>
          <Link
            to="/admin/events"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
          >
            Return to Event Management
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateEventForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please resolve the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    editEvent(id, {
      ...formData,
      maxParticipants: Number(formData.maxParticipants),
    });

    toast.success('Event updated successfully!');
    navigate('/admin/events');
  };

  return (
    <AdminLayout
      title={`Edit: ${existing.title}`}
      subtitle="Modify schedule, details, max capacity or featured highlight status."
      actions={
        <Link
          to="/admin/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Back</span>
        </Link>
      }
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Event Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Event Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-400/20'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
          </div>

          {/* Category, Date, Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Event Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                  errors.date
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Time / Duration <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                  errors.time
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {errors.time && <p className="text-xs text-rose-500 mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* Venue & Max Participants & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Venue Location <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                  errors.venue
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {errors.venue && <p className="text-xs text-rose-500 mt-1">{errors.venue}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Max Capacity <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                  errors.maxParticipants
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {errors.maxParticipants && (
                <p className="text-xs text-rose-500 mt-1">{errors.maxParticipants}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Reg. Deadline <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                  errors.registrationDeadline
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {errors.registrationDeadline && (
                <p className="text-xs text-rose-500 mt-1">{errors.registrationDeadline}</p>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Short Description <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                errors.shortDescription
                  ? 'border-rose-400 focus:ring-rose-400/20'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
            {errors.shortDescription && (
              <p className="text-xs text-rose-500 mt-1">{errors.shortDescription}</p>
            )}
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Event Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-400/20'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image URL & Preview */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Event Banner Image URL
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="flex-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-16 rounded-xl object-cover border border-slate-200 bg-slate-100 shadow-2xs"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              )}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs text-amber-900 cursor-pointer">
              <strong className="font-bold block text-sm">Mark as Featured Event</strong>
              Enabling this will automatically make this event the single featured highlight across the platform.
            </label>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Link
              to="/admin/events"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
