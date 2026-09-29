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
import { HeroEditorial } from '../../components/student/HeroEditorial';
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
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden bg-[#0c0c0c] text-[#F6F3EC]">
      {/* =========================================================================
          EDITORIAL BRUTALIST HERO SECTION
      ========================================================================= */}
      <HeroEditorial />

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
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#E5DEC9] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Mark Your Calendar</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F6F3EC] tracking-tight">
              Upcoming Club Events
            </h2>
            <p className="text-[#A69E8C] font-sans text-xs sm:text-sm mt-1 font-light">
              Handpicked workshops, competitions, and seminars scheduled for this semester.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#E5DEC9] hover:text-white transition-colors group"
          >
            <span>View All Catalog ({events.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="upcoming-masonry-grid">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="card-animation-layer">
                <EventCard event={evt} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#141414] rounded-3xl border border-white/10 p-12 text-center max-w-lg mx-auto space-y-3">
            <Calendar className="w-12 h-12 text-stone-600 mx-auto" />
            <h3 className="font-serif font-normal text-lg text-[#F6F3EC]">No Upcoming Events</h3>
            <p className="text-xs text-[#A69E8C] font-sans">
              New club events will be announced soon. Check back or view past events in the archive.
            </p>
            <Link
              to="/events"
              className="inline-flex px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#141414] bg-[#F6F3EC] rounded-xl hover:bg-white"
            >
              Browse Event Archive
            </Link>
          </div>
        )}
      </section>

      {/* =========================================================================
          CLUB INTRODUCTION & MISSION (ABOUT SECTION)
      ========================================================================= */}
      <section id="about" className="bg-[#121212] border-y border-white/10 py-16 sm:py-24 vintage-noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Col: Story & Pillars */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#E5DEC9]">
                <Rocket className="w-4 h-4" />
                <span>About Our College Club</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F6F3EC] tracking-tight leading-[1.1]">
                Empowering the next generation of builders, thinkers, and leaders.
              </h2>

              <p className="font-sans text-[#B8B1A2] text-sm sm:text-base leading-relaxed font-light">
                Founded by passionate students and faculty mentors, NexClub is our college's premier hub for technology, design, innovation, and cultural activities. We provide students with the stage to experiment, build real-world products, and collaborate across departments.
              </p>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 shadow-xs space-y-2 hover:border-white/20 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-white/10 text-[#E5DEC9] flex items-center justify-center font-bold">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-[#F6F3EC]">Our Mission</h3>
                  <p className="text-xs text-[#A69E8C] font-sans font-light leading-relaxed">
                    Bridge academia with practical industry engineering through accessible peer-led workshops and competitions.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 shadow-xs space-y-2 hover:border-white/20 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-white/10 text-[#E5DEC9] flex items-center justify-center font-bold">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-[#F6F3EC]">Our Vision</h3>
                  <p className="text-xs text-[#A69E8C] font-sans font-light leading-relaxed">
                    Cultivate a thriving campus ecosystem where every curious student can transform ideas into impactful ventures.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Activities Grid with high visual appeal */}
            <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 text-[#F6F3EC] space-y-6 shadow-xl border border-white/10">
              <h3 className="font-serif text-xl tracking-tight text-[#F6F3EC] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E5DEC9]" />
                What We Do Throughout The Year
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1d1d1d] border border-white/5 hover:border-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-white/10 text-[#E5DEC9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-[#F6F3EC]">National & Campus Hackathons</h4>
                    <p className="text-xs text-[#A69E8C] font-sans font-light mt-0.5">36-hour buildathons with industry mentors, prizes, and recruitments.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1d1d1d] border border-white/5 hover:border-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-white/10 text-[#E5DEC9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-[#F6F3EC]">Technical Masterclasses</h4>
                    <p className="text-xs text-[#A69E8C] font-sans font-light mt-0.5">Hands-on tutorials on Web3, React, Cloud, AI/ML, and Cybersecurity.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1d1d1d] border border-white/5 hover:border-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-white/10 text-[#E5DEC9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-[#F6F3EC]">Alumni & Founder Talks</h4>
                    <p className="text-xs text-[#A69E8C] font-sans font-light mt-0.5">Direct insights on startup fundraising, internships, and career roadmaps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CLUB STATS BAR (Dynamic Values)
          ========================================================================= */}
          <div id="stats" className="pt-8 border-t border-white/10">
            <div className="text-center max-w-xl mx-auto mb-8 font-mono">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#E5DEC9]">[CLUB IMPACT IN NUMBERS]</h3>
              <p className="text-xs text-[#A69E8C] mt-1 font-sans font-light">Live statistics generated dynamically from active events and registrations.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 shadow-xs text-center hover:border-white/20 transition-all">
                <p className="font-serif text-3xl sm:text-4xl font-normal text-[#F6F3EC] tracking-tight">
                  {500 + totalRegistrations}+
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A69E8C] mt-1">
                  Active Members
                </p>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 shadow-xs text-center hover:border-white/20 transition-all">
                <p className="font-serif text-3xl sm:text-4xl font-normal text-[#F6F3EC] tracking-tight">
                  {totalOrganized}
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A69E8C] mt-1">
                  Events Organized
                </p>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 shadow-xs text-center hover:border-white/20 transition-all">
                <p className="font-serif text-3xl sm:text-4xl font-normal text-[#F6F3EC] tracking-tight">
                  {totalWorkshops > 0 ? totalWorkshops : 12}+
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A69E8C] mt-1">
                  Hands-on Workshops
                </p>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 shadow-xs text-center hover:border-white/20 transition-all">
                <p className="font-serif text-3xl sm:text-4xl font-normal text-[#F6F3EC] tracking-tight">
                  6+
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A69E8C] mt-1">
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
        <div className="bg-[#141414] border border-white/15 rounded-3xl p-8 sm:p-12 text-[#F6F3EC] text-center space-y-6 shadow-2xl relative overflow-hidden vintage-noise">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F6F3EC] tracking-tight">
              Ready to Showcase Your Skills or Join the Team?
            </h2>
            <p className="text-[#C5BFAe] font-sans text-xs sm:text-sm font-light">
              Whether you want to participate in our upcoming events or volunteer as an event coordinator, we would love to have you.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-wider">
              <Link
                to="/events"
                className="px-6 py-3 rounded-xl bg-[#F6F3EC] text-[#141414] font-bold shadow-md hover:bg-white hover:scale-105 transition-all"
              >
                Browse All Events
              </Link>
              <a
                href="mailto:contact@collegeclub.edu"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#E5DEC9] font-medium border border-white/20 transition-all"
              >
                Contact Organizers &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
