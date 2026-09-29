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
    <section id="timeline" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Milestone className="w-3.5 h-3.5 text-indigo-600" />
            <span>Structured Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How to Ace Club Projects & Assignments
          </h2>

          <p className="text-slate-500 text-sm sm:text-base">
            Follow our proven 4-stage roadmap to research, architect, build, and present winning projects at college competitions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Dashed Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0 border-r-2 border-dashed border-indigo-200 -translate-x-1/2 pointer-events-none" />
          <div className="md:hidden absolute left-6 top-4 bottom-4 w-0 border-r-2 border-dashed border-indigo-200 pointer-events-none" />

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
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-20 w-8 h-8 rounded-full bg-white border-4 border-indigo-600 shadow-md flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  </div>

                  {/* Card Column */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? 'md:pl-10' : 'md:pr-10'
                    }`}
                  >
                    <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Image Header with Hover Scale & Saturation */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-4 text-xs font-extrabold uppercase tracking-widest text-indigo-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                          Stage {step.number}
                        </span>
                      </div>

                      {/* Accordion Trigger Header */}
                      <button
                        type="button"
                        onClick={() => toggleStep(step.id)}
                        className={`w-full px-5 py-4 flex items-center justify-between text-left font-bold text-base transition-colors ${
                          isOpen
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-indigo-600'}`} />
                          {step.title}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-white' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {/* Accordion Collapsible Body */}
                      {isOpen && (
                        <div className="p-5 bg-white space-y-4 animate-fade-in border-t border-slate-100">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Quick Pro-Tip Box */}
                          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>Pro-Tip:</strong> {step.tip}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Card Footer with Info Action */}
                      <div className="px-5 py-3 bg-white border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-400">
                          Stage {index + 1} of {TIMELINE_STEPS.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveInfoModal(step)}
                          className="w-8 h-8 rounded-full border border-slate-300 hover:border-indigo-600 text-slate-500 hover:text-indigo-600 hover:scale-110 flex items-center justify-center transition-all bg-white shadow-2xs"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div
              className="fixed inset-0"
              onClick={() => setActiveInfoModal(null)}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md p-6 z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-600" />
                  {activeInfoModal.title}
                </h3>
                <button
                  onClick={() => setActiveInfoModal(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeInfoModal.image}
                  alt={activeInfoModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeInfoModal.description}
              </p>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900">
                <strong>Best Practice:</strong> {activeInfoModal.tip}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveInfoModal(null)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
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
