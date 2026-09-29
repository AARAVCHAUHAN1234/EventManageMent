import React from 'react';
import { HeroMainPanel } from './HeroMainPanel';
import { HeroImagePanel } from './HeroImagePanel';

export function HeroEditorial() {
  return (
    <section className="relative bg-[#0d0d0d] pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
      {/* Background paper noise subtle overlay */}
      <div className="absolute inset-0 vintage-noise pointer-events-none opacity-40" />

      {/* Main Asymmetric Composition Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {/* Dominant Left Main Panel (~68% width on desktop) */}
          <div className="lg:col-span-8 flex flex-col">
            <HeroMainPanel />
          </div>

          {/* Secondary Right Image Panel (~32% width on desktop) */}
          <div className="lg:col-span-4 flex flex-col">
            <HeroImagePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
