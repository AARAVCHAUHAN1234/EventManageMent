import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Workshop',
  'Hackathon',
  'Seminar',
  'Competition',
  'Cultural',
  'Sports',
  'Technical',
  'Other',
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Events' },
  { value: 'upcoming', label: 'Upcoming Only' },
  { value: 'past', label: 'Past Events' },
];

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  totalResults,
}) {
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedStatus !== 'all';

  const handleClearFilters = () => {
    onSearchChange('');
    onCategoryChange('All');
    onStatusChange('all');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm space-y-4">
      {/* Top row: Search input and Status selector */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events by name, topic, or keyword..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full focus:outline-none"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills horizontal scrollable */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Filter by Category:
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Showing <span className="font-semibold text-slate-800">{totalResults}</span> {totalResults === 1 ? 'event' : 'events'}
        </span>
        {hasActiveFilters && (
          <span className="text-indigo-600 font-medium">Filtered view</span>
        )}
      </div>
    </div>
  );
}
