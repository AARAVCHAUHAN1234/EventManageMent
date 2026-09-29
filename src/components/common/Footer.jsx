import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Mail, MapPin, Phone, Globe, MessageSquare, Send, Award, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0c0c0c] text-[#A69E8C] text-sm border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-[#F6F3EC] text-[#141414] flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-all">
                <Sparkles className="w-5 h-5 text-[#141414]" />
              </div>
              <span className="font-serif text-2xl text-[#F6F3EC] tracking-tight">
                Nex<span className="italic font-light text-[#E5DEC9]">Club</span>
              </span>
            </Link>
            <p className="text-[#A69E8C] text-sm max-w-sm leading-relaxed font-light">
              Empowering university students with cutting-edge workshops, national hackathons, technical masterclasses, and creative cultural events. Where ideas happen.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#E5DEC9] hover:text-[#141414] hover:bg-[#F6F3EC] transition-all"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#E5DEC9] hover:text-[#141414] hover:bg-[#F6F3EC] transition-all"
                aria-label="Community Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#E5DEC9] hover:text-[#141414] hover:bg-[#F6F3EC] transition-all"
                aria-label="Newsletter"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#E5DEC9] hover:text-[#141414] hover:bg-[#F6F3EC] transition-all"
                aria-label="Hall of Fame"
              >
                <Award className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-[#F6F3EC] uppercase tracking-widest">[NAVIGATION]</h4>
            <ul className="space-y-2.5 text-[#B8B1A2]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">01. Home Page</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">02. All Events</Link>
              </li>
              <li>
                <a href="/#timeline" className="hover:text-white transition-colors">03. Project Roadmap</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">04. About the Club</a>
              </li>
              <li>
                <a href="/#stats" className="hover:text-white transition-colors">05. Club Statistics</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Event Categories */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-[#F6F3EC] uppercase tracking-widest">[CATEGORIES]</h4>
            <ul className="space-y-2.5 text-[#B8B1A2]">
              <li>
                <Link to="/events?category=Hackathon" className="hover:text-white transition-colors">&gt; Hackathons</Link>
              </li>
              <li>
                <Link to="/events?category=Workshop" className="hover:text-white transition-colors">&gt; Coding Workshops</Link>
              </li>
              <li>
                <Link to="/events?category=Seminar" className="hover:text-white transition-colors">&gt; AI Seminars</Link>
              </li>
              <li>
                <Link to="/events?category=Cultural" className="hover:text-white transition-colors">&gt; Cultural Fests</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Portal */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-[#F6F3EC] uppercase tracking-widest">[SECRETARIAT]</h4>
            <ul className="space-y-2.5 text-[#A69E8C]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5DEC9] flex-shrink-0 mt-0.5" />
                <span>Student Activity Center, Block C</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5DEC9] flex-shrink-0" />
                <span>contact@collegeclub.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5DEC9] flex-shrink-0" />
                <span>+91 (0) 1234-567890</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 font-bold text-[#F6F3EC] hover:text-white underline underline-offset-4"
                >
                  <span>Admin Console Login</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A7365]">
          <p>© {new Date().getFullYear()} NexClub. Editorial Brutalist Event Platform.</p>
          <p className="flex items-center gap-1 text-[#9E9685]">
            Handcrafted for University Students & Creators
          </p>
        </div>
      </div>
    </footer>
  );
}
