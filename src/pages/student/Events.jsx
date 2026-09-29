import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Search, Sparkles, Filter, RefreshCw, XCircle } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { EventCard } from '../../components/student/EventCard';
import { SearchAndFilters } from '../../components/student/SearchAndFilters';
import { getEventStatus } from '../../utils/dateUtils';

export function Events() {
  const { events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params synchronization
  const initialCategory = searchParams.get('category') || 'All';
  const initialStatus = searchParams.get('status') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Filtered & sorted events list
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // 1. Search Query filter (matches title, description, venue)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = evt.title?.toLowerCase().includes(query);
        const descMatch = (evt.description || evt.shortDescription || '').toLowerCase().includes(query);
        const venueMatch = evt.venue?.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !venueMatch) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All') {
        if (evt.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Status filter
      if (selectedStatus !== 'all') {
        const eventStatus = getEventStatus(evt);
        if (eventStatus !== selectedStatus) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sort upcoming events first by date ascending, past events by date descending
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateA - dateB;
    });
  }, [events, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Explore All Activities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          College Events & Workshops
        </h1>
        <p className="text-slate-500 text-sm sm:text-base">
          Find hackathons, coding bootcamps, technical seminars, cultural nights, and sports meets.
        </p>
      </div>

      {/* Filter and Search controls */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        totalResults={filteredEvents.length}
      />

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-800">No matching events found</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We couldn't find any events matching your selected criteria. Try adjusting your search keywords or resetting the active filters.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedStatus('all');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
