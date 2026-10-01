import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  FileText,
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

const PRESET_IMAGES = [
  { name: 'Hackathon', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Coding Workshop', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80' },
  { name: 'AI Seminar', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Competition', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Cultural Night', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sports Meet', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80' },
];

export function AddEvent() {
  const navigate = useNavigate();
  const toast = useToast();
  const { addNewEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Workshop',
    date: '',
    time: '02:00 PM - 05:00 PM',
    venue: '',
    shortDescription: '',
    description: '',
    image: PRESET_IMAGES[0].url,
    registrationDeadline: '',
    maxParticipants: 100,
    isFeatured: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    addNewEvent({
      ...formData,
      maxParticipants: Number(formData.maxParticipants),
    });

    toast.success('New event published successfully!');
    navigate('/admin/events');
  };

  return (
    <AdminLayout
      title="Create New Event"
      subtitle="Publish a new club event, workshop, or competition to the campus hub."
      actions={
        <Link
          to="/admin/events"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A69E8C] hover:text-[#F6F3EC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ Back to Events List ]</span>
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
              placeholder="e.g. Annual Campus Hackathon 2026"
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
            {/* Category */}
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

            {/* Event Date */}
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

            {/* Event Time */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Time / Duration <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="02:00 PM - 05:00 PM"
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
            {/* Venue */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8] mb-2">
                Venue Location <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Main Auditorium / Lab 304"
                className={`w-full px-3.5 py-3 rounded-xl border text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none transition-all font-sans ${
                  errors.venue
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                    : 'border-white/10 focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8]/20'
                }`}
              />
              {errors.venue && <p className="text-xs text-rose-400 mt-1.5 font-mono">{errors.venue}</p>}
            </div>

            {/* Max Participants */}
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

            {/* Registration Deadline */}
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
              Short Description (Card preview) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief 1-2 sentence overview of the event for cards..."
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
              placeholder="Detailed schedule, prerequisites, perks, agenda, guidelines..."
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

          {/* Image URL & Preset Picker */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#ECE5D8]">
              Event Banner Image URL
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1 w-full">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 text-sm text-[#F6F3EC] bg-[#181818] placeholder-[#736c60] focus:outline-none focus:border-[#ECE5D8] font-sans"
                />
              </div>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-16 rounded-xl object-cover border border-white/10 bg-[#1c1c1c] shadow-md opacity-90"
                  onError={(e) => {
                    e.target.src = PRESET_IMAGES[0].url;
                  }}
                />
              )}
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-[#A69E8C]">
              <span>Preset Suggestions:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                  className="px-2.5 py-1 rounded-lg bg-[#1c1c1c] text-stone-300 border border-white/10 hover:border-white/25 hover:text-white hover:bg-[#242424] transition-all text-[11px]"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Toggle with notice */}
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
              <span>Publish Event</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
