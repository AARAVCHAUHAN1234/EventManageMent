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
        <div className="max-w-md mx-auto text-center py-12 space-y-4 font-mono">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-bold font-serif text-[#F6F3EC]">Event does not exist</h2>
          <Link
            to="/admin/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F6F3EC] hover:bg-white text-[#141414] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
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
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A69E8C] hover:text-[#F6F3EC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ Cancel & Back ]</span>
        </Link>
      }
    >
      <div className="max-w-4xl mx-auto bg-[#141414] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl vintage-noise">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Event Title */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
              Event Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none transition-all font-sans ${
                errors.title
                  ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                  : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.title}</p>}
          </div>

          {/* Category, Date, Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Category <span className="text-rose-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-xl border border-white/10 text-sm bg-[#181818] text-[#F6F3EC] focus:outline-none focus:border-[#ECE5D8] cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#181818] text-[#F6F3EC]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Event Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] focus:outline-none transition-all font-mono ${
                  errors.date
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                    : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
                }`}
              />
              {errors.date && <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Time / Duration <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none transition-all font-mono ${
                  errors.time
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                    : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
                }`}
              />
              {errors.time && <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.time}</p>}
            </div>
          </div>

          {/* Venue & Max Participants & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Venue Location <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className={`w-full px-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none transition-all font-sans ${
                  errors.venue
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                    : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
                }`}
              />
              {errors.venue && <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.venue}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Max Capacity <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
                className={`w-full px-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none transition-all font-mono ${
                  errors.maxParticipants
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                    : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
                }`}
              />
              {errors.maxParticipants && (
                <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.maxParticipants}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Reg. Deadline <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className={`w-full px-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] focus:outline-none transition-all font-mono ${
                  errors.registrationDeadline
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                    : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
                }`}
              />
              {errors.registrationDeadline && (
                <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.registrationDeadline}</p>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
              Short Description <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none transition-all font-sans ${
                errors.shortDescription
                  ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                  : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
              }`}
            />
            {errors.shortDescription && (
              <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.shortDescription}</p>
            )}
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
              Full Event Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none transition-all font-sans ${
                errors.description
                  ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                  : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.description}</p>
            )}
          </div>

          {/* Image URL & Preview */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8]">
              Event Banner Image URL
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="flex-1 w-full px-4 py-3 rounded-xl border border-white/10 text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:border-[#ECE5D8] font-sans"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-16 rounded-xl object-cover border border-white/10 bg-[#1c1c1c] shadow-md opacity-90"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              )}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="p-4.5 rounded-2xl bg-[#1c1a14] border border-amber-500/25 flex items-start gap-3 vintage-noise">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded border-amber-400/40 text-amber-500 bg-[#181818] focus:ring-amber-400 cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs text-stone-300 cursor-pointer font-sans">
              <strong className="font-serif font-bold text-sm text-[#F6F3EC] block">Mark as Featured Highlight</strong>
              Enabling this will highlight this event on the public showcase homepage.
            </label>
          </div>

          {/* Submit Action */}
          <div className="pt-6 flex items-center justify-end gap-3 border-t border-white/10 font-mono">
            <Link
              to="/admin/events"
              className="px-5 py-2.5 rounded-xl border border-white/10 text-xs uppercase tracking-wider text-[#A69E8C] hover:bg-[#1f1f1f] hover:text-[#F6F3EC] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-white/10 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
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
