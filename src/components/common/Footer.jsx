import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Mail, MapPin, Phone, Globe, MessageSquare, Send, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Nex<span className="text-indigo-400">Club</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering university students with innovative workshops, national hackathons, technical seminars, and vibrant cultural events. Where ideas meet opportunity.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors"
                aria-label="Community Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors"
                aria-label="Newsletter"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors"
                aria-label="Hall of Fame"
              >
                <Award className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-indigo-400 transition-colors">All Events</Link>
              </li>
              <li>
                <a href="/#timeline" className="hover:text-indigo-400 transition-colors">Project Roadmap</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-indigo-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/#stats" className="hover:text-indigo-400 transition-colors">Club Statistics</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Event Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/events?category=Hackathon" className="hover:text-indigo-400 transition-colors">Hackathons</Link>
              </li>
              <li>
                <Link to="/events?category=Workshop" className="hover:text-indigo-400 transition-colors">Coding Workshops</Link>
              </li>
              <li>
                <Link to="/events?category=Seminar" className="hover:text-indigo-400 transition-colors">AI & Tech Seminars</Link>
              </li>
              <li>
                <Link to="/events?category=Cultural" className="hover:text-indigo-400 transition-colors">Cultural & Fests</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Club Secretariat</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Student Activity Center, North Campus, Block C</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>contact@collegeclub.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>+91 (0) 1234-567890</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Admin Portal &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NexClub College Event Hub. Frontend-only Demo Application.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for University Community
          </p>
        </div>
      </div>
    </footer>
  );
}
