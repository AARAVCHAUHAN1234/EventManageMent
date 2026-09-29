import React, { useState } from 'react';
import {
  Lightbulb,
  Compass,
  PenTool,
  CheckCircle2,
  Info,
  ChevronDown,
  Sparkles,
  Milestone,
} from 'lucide-react';

const TIMELINE_STEPS = [
  {
    id: 'step-1',
    number: '01',
    title: 'Brainstorm & Ideation',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    description:
      'Brainwriting & Ideation — A collaborative brainstorm method where participants write down key ideas relating to the challenge statement. Spend 5 to 10 minutes formulating unique angles, then build upon each idea with bullet points and actionable strategies.',
    tip: 'Define clear user problem statements before writing any code or outlines.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Mindmap & Architecture',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    description:
      'Visualize and structure your concept using mindmaps and flowcharts. Break down complex systems into modular milestones, user flows, database schemas, and technical prerequisites.',
    tip: 'Create a clear system architecture diagram and feature backlog early.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Write a Draft & Prototype',
    icon: PenTool,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    description:
      'Begin constructing the core prototype or assignment draft. Focus on functional proof-of-concepts, clear documentation of methodologies, and building the MVP iteratively without getting blocked by micro-details.',
    tip: 'Commit code often and maintain a living README of your project progress.',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Proofread, Review & Submit',
    icon: CheckCircle2,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    description:
      'The final milestone focuses on quality assurance, peer reviews, eliminating typos or edge-case bugs, verifying submission guidelines, and polishing your final presentation deck or paper.',
    tip: 'Ensure all rubric points and club submission deadlines are strictly met.',
  },
];

export function EventTimeline() {
  const [openStep, setOpenStep] = useState('step-1');
  const [activeInfoModal, setActiveInfoModal] = useState(null);

  const toggleStep = (id) => {
    setOpenStep((prev) => (prev === id ? null : id));
  };

  return (
    <section id="timeline" className="py-16 sm:py-24 bg-[#0c0c0c] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-white/10 text-[#ECE5D8] text-[11px] font-mono uppercase tracking-widest">
            <Milestone className="w-3.5 h-3.5 text-[#ECE5D8]" />
            <span>Structured Blueprint // 4 Stages</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F6F3EC] tracking-tight">
            How to Ace Club Projects & Assignments
          </h2>

          <p className="text-[#A69E8C] font-sans font-light text-sm sm:text-base leading-relaxed">
            Follow our proven 4-stage roadmap to research, architect, build, and present winning projects at college competitions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Dashed Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0 border-r-2 border-dashed border-white/15 -translate-x-1/2 pointer-events-none" />
          <div className="md:hidden absolute left-6 top-4 bottom-4 w-0 border-r-2 border-dashed border-white/15 pointer-events-none" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {TIMELINE_STEPS.map((step, index) => {
              const isEven = index % 2 === 1;
              const isOpen = openStep === step.id;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-20 w-9 h-9 rounded-full bg-[#141414] border-2 border-[#ECE5D8] shadow-2xl flex items-center justify-center font-mono text-xs font-bold text-[#ECE5D8]">
                    {step.number}
                  </div>

                  {/* Card Column */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? 'md:pl-10' : 'md:pr-10'
                    }`}
                  >
                    <div className="group bg-[#141414] rounded-3xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300 overflow-hidden vintage-noise">
                      {/* Image Header with Hover Scale & Saturation */}
                      <div className="relative h-44 w-full overflow-hidden bg-[#0c0c0c]">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-500 ease-out opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#ECE5D8] bg-[#141414]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                          STAGE // {step.number}
                        </span>
                      </div>

                      {/* Accordion Trigger Header */}
                      <button
                        type="button"
                        onClick={() => toggleStep(step.id)}
                        className={`w-full px-5 py-4 flex items-center justify-between text-left font-serif font-bold text-base sm:text-lg transition-all ${
                          isOpen
                            ? 'bg-[#F6F3EC] text-[#141414] shadow-md'
                            : 'bg-[#181818] text-[#F6F3EC] hover:bg-[#202020]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isOpen ? 'text-[#141414]' : 'text-[#ECE5D8]'}`} />
                          {step.title}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-[#141414]' : 'text-[#A69E8C]'
                          }`}
                        />
                      </button>

                      {/* Accordion Collapsible Body */}
                      {isOpen && (
                        <div className="p-5 bg-[#141414] space-y-4 animate-fade-in border-t border-white/10">
                          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans font-light">
                            {step.description}
                          </p>

                          {/* Quick Pro-Tip Box */}
                          <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-white/10 text-xs text-[#ECE5D8] flex items-start gap-2.5 font-sans">
                            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="font-mono text-[11px] uppercase tracking-wider text-amber-300">Pro-Tip:</strong>{' '}
                              <span className="text-stone-300">{step.tip}</span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Card Footer with Info Action */}
                      <div className="px-5 py-3 bg-[#181818] border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#A69E8C] tracking-wide">
                          STAGE {index + 1} OF {TIMELINE_STEPS.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveInfoModal(step)}
                          className="w-8 h-8 rounded-full border border-white/15 hover:border-white/30 text-[#A69E8C] hover:text-[#F6F3EC] hover:scale-105 flex items-center justify-center transition-all bg-[#141414] shadow-sm"
                          title="More Info"
                          aria-label={`More information about ${step.title}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Modal */}
        {activeInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div
              className="fixed inset-0"
              onClick={() => setActiveInfoModal(null)}
            />
            <div className="relative bg-[#141414] text-[#F6F3EC] rounded-3xl shadow-2xl border border-white/15 w-full max-w-md p-6 z-10 space-y-4 vintage-noise">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif font-bold text-lg text-[#F6F3EC] flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#ECE5D8]" />
                  {activeInfoModal.title}
                </h3>
                <button
                  onClick={() => setActiveInfoModal(null)}
                  className="text-[#A69E8C] hover:text-white text-xs font-mono px-2 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10">
                <img
                  src={activeInfoModal.image}
                  alt={activeInfoModal.title}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans font-light">
                {activeInfoModal.description}
              </p>

              <div className="p-3.5 bg-[#1c1c1c] border border-white/10 rounded-xl text-xs text-stone-300 font-sans">
                <strong className="font-mono uppercase text-amber-300 text-[10px] tracking-wider block mb-1">
                  Best Practice
                </strong>
                {activeInfoModal.tip}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveInfoModal(null)}
                  className="px-5 py-2.5 bg-[#F6F3EC] hover:bg-white text-[#141414] font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
