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
    <div className="bg-[#141414] rounded-2xl border border-white/10 p-4 sm:p-6 shadow-xl space-y-4 vintage-noise">
      {/* Top row: Search input and Status selector */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A69E8C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events by name, topic, or keyword..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-[#1c1c1c] text-[#F6F3EC] placeholder:text-[#A69E8C]/60 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ECE5D8] focus:border-[#ECE5D8] transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A69E8C] hover:text-white p-1 rounded-full focus:outline-none transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-[11px] font-mono uppercase tracking-widest text-[#A69E8C] whitespace-nowrap">
            Status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#1c1c1c] text-[#F6F3EC] text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#ECE5D8] focus:border-[#ECE5D8] transition-all cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#181818] text-[#F6F3EC]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills horizontal scrollable */}
      <div className="pt-3 border-t border-white/5">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#A69E8C]">
            [ CATEGORY FILTER ]
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-[11px] font-mono uppercase tracking-wider text-[#ECE5D8] hover:text-white hover:underline flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wide uppercase transition-all ${
                  isSelected
                    ? 'bg-[#F6F3EC] text-[#141414] font-bold shadow-md shadow-white/10'
                    : 'bg-[#1c1c1c] text-[#A69E8C] border border-white/10 hover:border-white/20 hover:text-[#F6F3EC] hover:bg-[#222222]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results counter */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#A69E8C] pt-1">
        <span>
          Showing <span className="font-bold text-[#F6F3EC]">{totalResults}</span> {totalResults === 1 ? 'event record' : 'event records'}
        </span>
        {hasActiveFilters && (
          <span className="text-[#ECE5D8] font-mono tracking-wider">[ FILTERED VIEW ]</span>
        )}
      </div>
    </div>
  );
}
