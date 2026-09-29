import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Rocket,
  Compass,
  Zap,
  Target,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { EventCard } from '../../components/student/EventCard';
import { FeaturedEvent } from '../../components/student/FeaturedEvent';
import { EventTimeline } from '../../components/student/EventTimeline';
import { getEventStatus } from '../../utils/dateUtils';

export function Home() {
  const { events, registrations } = useEvents();

  // Find featured event or fallback to first upcoming event
  const featured =
    events.find((e) => e.isFeatured) ||
    events.find((e) => getEventStatus(e) === 'upcoming') ||
    events[0];

  // Upcoming events only, max 6 for the home page showcase
  const upcomingEvents = events
    .filter((e) => getEventStatus(e) === 'upcoming' && e.id !== featured?.id)
    .slice(0, 6);

  // Dynamic statistics calculated from live state
  const totalOrganized = events.length;
  const totalWorkshops = events.filter((e) => e.category === 'Workshop').length;
  const totalRegistrations = registrations.length;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* =========================================================================
          HERO SECTION
      ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden">
        {/* Soft background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Official Student Community & Event Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Where <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">Ideas Meet</span> Opportunity
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg sm:leading-relaxed max-w-2xl mx-auto">
              Discover cutting-edge hackathons, master coding workshops, network with inspiring alumni founders, and take your university journey beyond the classroom.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explore All Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-sm sm:text-base border border-slate-200 shadow-sm transition-all"
              >
                <span>Learn About Us</span>
                <Compass className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Quick social proof / badges */}
            <div className="pt-6 flex items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant Registration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Digital Entry Passes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Certified Participation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED EVENT SHOWCASE
      ========================================================================= */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedEvent event={featured} />
        </section>
      )}

      {/* =========================================================================
          UPCOMING EVENTS GRID
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Mark Your Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Upcoming Club Events
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Handpicked workshops, competitions, and seminars scheduled for this semester.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            <span>View All ({events.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto space-y-3">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-lg text-slate-800">No Upcoming Events</h3>
            <p className="text-xs text-slate-500">
              New club events will be announced soon. Check back or view past events in the catalog.
            </p>
            <Link
              to="/events"
              className="inline-flex px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100"
            >
              Browse Event Archive
            </Link>
          </div>
        )}
      </section>

      {/* =========================================================================
          CLUB INTRODUCTION & MISSION (ABOUT SECTION)
      ========================================================================= */}
      <section id="about" className="bg-gradient-to-b from-white to-slate-50 border-y border-slate-200/70 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Col: Story & Pillars */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <Rocket className="w-4 h-4" />
                <span>About Our College Club</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering the next generation of builders, thinkers, and leaders.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Founded by passionate students and faculty mentors, NexClub is our college's premier hub for technology, design, innovation, and cultural activities. We provide students with the stage to experiment, build real-world products, and collaborate across departments.
              </p>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Our Mission</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Bridge academia with practical industry engineering through accessible peer-led workshops and competitions.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Our Vision</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Cultivate a thriving campus ecosystem where every curious student can transform ideas into impactful ventures.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Activities Grid with high visual appeal */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-800">
              <h3 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                What We Do Throughout The Year
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs sm:text-sm">National & Campus Hackathons</h4>
                    <p className="text-xs text-slate-400 mt-0.5">36-hour buildathons with industry mentors, prizes, and recruitments.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs sm:text-sm">Technical Masterclasses</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Hands-on tutorials on Web3, React, Cloud, AI/ML, and Cybersecurity.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs sm:text-sm">Alumni & Founder Talks</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Direct insights on startup fundraising, internships, and career roadmaps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CLUB STATS BAR (Dynamic Values)
          ========================================================================= */}
          <div id="stats" className="pt-8 border-t border-slate-200/80">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="text-lg font-bold text-slate-900">Club Impact in Numbers</h3>
              <p className="text-xs text-slate-500">Live statistics generated dynamically from active events and registrations.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
                  {500 + totalRegistrations}+
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
                  Active Members
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-purple-600 tracking-tight">
                  {totalOrganized}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
                  Events Organized
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                  {totalWorkshops > 0 ? totalWorkshops : 12}+
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
                  Hands-on Workshops
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">
                  6+
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
                  Years Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EVENT / ASSIGNMENT PREPARATION ROADMAP TIMELINE
      ========================================================================= */}
      <EventTimeline />

      {/* =========================================================================
          CONTACT & CTA BANNER
      ========================================================================= */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Showcase Your Skills or Join the Team?
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm">
              Whether you want to participate in our upcoming events or volunteer as an event coordinator, we would love to have you.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/events"
                className="px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold text-sm shadow-md hover:bg-slate-100 transition-colors"
              >
                Browse All Events
              </Link>
              <a
                href="mailto:contact@collegeclub.edu"
                className="px-6 py-3 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold text-sm border border-indigo-400/30 transition-colors"
              >
                Contact Organizers
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
