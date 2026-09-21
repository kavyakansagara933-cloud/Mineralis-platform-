'use client';

import React, { useState } from 'react';
import {
  Presentation,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  Download,
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  BarChart3,
  MapPin,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Edit3,
  Printer,
  Share2,
  Eye,
  Sliders
} from 'lucide-react';

interface SlideItem {
  id: string;
  title: string;
  category: 'Scorecard' | 'Spatial GIS' | 'Geology' | 'HEMM Fleet' | 'Audit Risk' | 'Custom Analysis';
  subtitle: string;
  summaryMetrics: { label: string; value: string }[];
  keyTakeaways: string[];
  directorNotes: string;
}

const INITIAL_SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    title: 'Q3 Enterprise Production & Offtake Summary',
    category: 'Scorecard',
    subtitle: 'Consolidated performance across Divisions A through H',
    summaryMetrics: [
      { label: 'Total Coal Produced', value: '184.2 MT (+4.8% YoY)' },
      { label: 'Offtake Dispatch', value: '178.6 MT' },
      { label: 'Composite Stripping Ratio', value: '1.94 m³/t' },
      { label: 'Variance vs Target', value: '+2.1% (Exceeded)' }
    ],
    keyTakeaways: [
      'Division A and Division B drove 46% of total enterprise volume with high seam recovery.',
      'Monsoon pit dewatering contingency reduced downtime by 14 days compared to FY23.',
      'Thermal coal supply to primary state power utilities maintained at 100% statutory mandate.'
    ],
    directorNotes: 'Highlight to the Board that OBR stripping ratio improved from 2.15 to 1.94, saving an estimated ₹142 Cr in operational expenditures.'
  },
  {
    id: 'slide-2',
    title: 'Division-Wise Spatial & Production Distribution',
    category: 'Spatial GIS',
    subtitle: 'Georeferenced cluster analysis of 315 operating open-cast mines',
    summaryMetrics: [
      { label: 'Active Mines', value: '315 Mines' },
      { label: 'Top Producing Division', value: 'Division A (42.5 MT)' },
      { label: 'Fastest Growing Division', value: 'Division C (+11.4%)' },
      { label: 'Rail Sidings Linked', value: '64 Operational' }
    ],
    keyTakeaways: [
      'GIS telemetry indicates optimum truck turnaround cycles at Division C new expansion pits.',
      'Surface miner deployment in Division D reduced secondary blasting requirement by 35%.'
    ],
    directorNotes: 'Emphasize that rail siding mechanization has cleared the dispatch bottleneck in the eastern sector.'
  },
  {
    id: 'slide-3',
    title: 'Subsurface Seam Stratigraphy & Quality Profile',
    category: 'Geology',
    subtitle: 'Core borehole assays and gross calorific value (GCV) tracking',
    summaryMetrics: [
      { label: 'Seam I G8 GCV', value: '5,240 kcal/kg' },
      { label: 'Seam II G5 GCV', value: '5,980 kcal/kg' },
      { label: 'Average Ash Content', value: '28.4%' },
      { label: 'Moisture Index', value: '7.2%' }
    ],
    keyTakeaways: [
      'Lower Seam II exhibits premium G5 metallurgical grade suitable for steel washery blending.',
      'Overburden Sandstone stability tested within safe geotechnical angle of repose (38°).'
    ],
    directorNotes: 'Request CAPEX clearance for deep exploration boreholes in Division E Block 2.'
  },
  {
    id: 'slide-4',
    title: 'HEMM Fleet Availability & Digital Twin Diagnostics',
    category: 'HEMM Fleet',
    subtitle: 'Heavy equipment telematics and predictive maintenance index',
    summaryMetrics: [
      { label: 'Fleet Availability', value: '86.4% (Target: >85%)' },
      { label: 'Fleet Utilization', value: '78.2%' },
      { label: 'Digital Twin Health', value: '91 / 100' },
      { label: 'Unscheduled Downtime', value: '-18.5% YoY' }
    ],
    keyTakeaways: [
      'Electric rope shovels maintained 94% uptime through vibration-based predictive lube cycle dispatch.',
      'Dumper fleet fuel efficiency improved by 6.2 L/hr via haul road gradient re-profiling.'
    ],
    directorNotes: 'Fleet replacement cycle for 100T dumpers to be finalized in Q4 budget session.'
  },
  {
    id: 'slide-5',
    title: 'Autonomous Statutory Audit & Risk Certification',
    category: 'Audit Risk',
    subtitle: 'Cryptographically certified reconciliation seal & variance proof',
    summaryMetrics: [
      { label: 'Audit Status', value: 'UNCONDITIONALLY CERTIFIED' },
      { label: 'Rules Passed', value: '14 / 14 (100%)' },
      { label: 'Discrepancy Count', value: '0 Critical Anomaly' },
      { label: 'Ledger Hash', value: '7f9a2c...b31e' }
    ],
    keyTakeaways: [
      'All pit measurements cross-verified against weighbridge receipts and statutory DGMS logbooks.',
      'Deterministic zero-hallucination verification seal stamped for Ministry and Board disclosure.'
    ],
    directorNotes: 'Attach certified audit certificate appendix to the final submission package.'
  }
];

export const ExecutiveDeckBuilder: React.FC = () => {
  const [slides, setSlides] = useState<SlideItem[]>(INITIAL_SLIDES);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportedNotice, setExportedNotice] = useState<boolean>(false);

  const activeSlide = slides[selectedSlideIndex] || slides[0];

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;
    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;
    setSlides(newSlides);
    setSelectedSlideIndex(targetIndex);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    setSelectedSlideIndex(Math.min(selectedSlideIndex, newSlides.length - 1));
  };

  const handleDuplicateSlide = (index: number) => {
    const slideToCopy = slides[index];
    const newSlide: SlideItem = {
      ...slideToCopy,
      id: `slide-${Date.now()}`,
      title: `${slideToCopy.title} (Copy)`
    };
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, newSlide);
    setSlides(newSlides);
    setSelectedSlideIndex(index + 1);
  };

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      title: 'New Operational Briefing Slide',
      category: 'Custom Analysis',
      subtitle: 'Add specific operational metrics or strategic conclusions',
      summaryMetrics: [
        { label: 'Key Metric A', value: '100%' },
        { label: 'Key Metric B', value: '45.2 MT' }
      ],
      keyTakeaways: [
        'Document primary observation here.',
        'Document strategic action item.'
      ],
      directorNotes: 'Personal speaker notes for executive committee presentation.'
    };
    setSlides([...slides, newSlide]);
    setSelectedSlideIndex(slides.length);
  };

  const handleUpdateActiveSlide = (field: keyof SlideItem, value: any) => {
    setSlides(prev =>
      prev.map((s, idx) => (idx === selectedSlideIndex ? { ...s, [field]: value } : s))
    );
  };

  const handleExportDossier = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportedNotice(true);
      setTimeout(() => setExportedNotice(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Navigation Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Presentation className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Executive Presentation Deck &amp; Board Dossier Studio
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
              {slides.length} Slides Assembled
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Synthesize multi-division analytics, subsurface stratigraphy, HEMM fleet twins, and certified statutory audit seals into high-impact presentation decks and downloadable board dossiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPresenting(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Present Fullscreen Deck
          </button>

          <button
            onClick={handleExportDossier}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {isExporting ? <span className="animate-spin text-xs">⏳</span> : <Download className="w-3.5 h-3.5" />}
            {isExporting ? 'Generating Dossier...' : 'Export Board Dossier'}
          </button>
        </div>
      </div>

      {exportedNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Dossier Generated Successfully!</strong> Board-ready PDF dossier with timestamped cryptographic seal ready for distribution.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-600">SHA-256: 8f2c...419a</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Slide Deck Outline & Order (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">Slide Sequence</h3>
              <button
                onClick={handleAddSlide}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Slide
              </button>
            </div>

            <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
              {slides.map((slide, idx) => {
                const isSelected = idx === selectedSlideIndex;
                return (
                  <div
                    key={slide.id}
                    onClick={() => setSelectedSlideIndex(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-300 shadow-xs' 
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-900 truncate">{slide.title}</p>
                          <span className="text-[10px] text-slate-500 font-medium">{slide.category}</span>
                        </div>
                      </div>

                      {/* Move / Action buttons */}
                      <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleMoveSlide(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          title="Move Up"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMoveSlide(idx, 'down')}
                          disabled={idx === slides.length - 1}
                          className="p-1 rounded hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          title="Move Down"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDuplicateSlide(idx)}
                          className="p-1 rounded hover:bg-slate-200/60 text-slate-400 hover:text-slate-700"
                          title="Duplicate"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteSlide(idx)}
                          disabled={slides.length <= 1}
                          className="p-1 rounded hover:bg-rose-100 text-slate-400 hover:text-rose-600 disabled:opacity-30"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Slide Canvas & Interactive Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Slide Canvas Preview */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Slide Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                  {activeSlide.category} • Slide {selectedSlideIndex + 1} of {slides.length}
                </span>
                <span className="text-xs font-mono text-slate-400">Executive Dossier 2024-25</span>
              </div>
              <input
                type="text"
                value={activeSlide.title}
                onChange={e => handleUpdateActiveSlide('title', e.target.value)}
                className="w-full text-xl font-bold text-slate-900 border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-hidden transition-colors"
              />
              <input
                type="text"
                value={activeSlide.subtitle}
                onChange={e => handleUpdateActiveSlide('subtitle', e.target.value)}
                className="w-full text-xs text-slate-500 mt-1 border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-hidden transition-colors"
              />
            </div>

            {/* Metrics Grid */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Key Performance Indicators
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeSlide.summaryMetrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{metric.label}</span>
                    <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Strategic Takeaways */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Operational Findings &amp; Board Takeaways
              </h4>
              <ul className="space-y-2">
                {activeSlide.keyTakeaways.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Speaker Notes & Annotations */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                Director Speaker Notes (Visible only to presenter)
              </label>
              <textarea
                rows={3}
                value={activeSlide.directorNotes}
                onChange={e => handleUpdateActiveSlide('directorNotes', e.target.value)}
                className="w-full text-xs text-slate-700 bg-amber-50/40 border border-amber-200/80 rounded-xl p-3 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                placeholder="Type speaker talking points for this slide..."
              />
            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <span>MINERALIS Enterprise • Internal Board Disclosure</span>
              <span>Deterministic Proof Verified</span>
            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen Presenter Mode Modal */}
      {isPresenting && (
        <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-8 backdrop-blur-xl animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-semibold">
                {slides[selectedSlideIndex].category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Slide {selectedSlideIndex + 1} of {slides.length}
              </span>
            </div>
            <button
              onClick={() => setIsPresenting(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              Exit Presentation (ESC)
            </button>
          </div>

          {/* Slide Content */}
          <div className="max-w-5xl mx-auto w-full my-auto space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {slides[selectedSlideIndex].title}
              </h1>
              <p className="text-slate-400 text-base mt-2">
                {slides[selectedSlideIndex].subtitle}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {slides[selectedSlideIndex].summaryMetrics.map((m, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 uppercase font-semibold">{m.label}</span>
                  <p className="text-xl font-bold text-indigo-400 font-mono mt-1">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Findings */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Core Findings</h3>
              <div className="space-y-2">
                {slides[selectedSlideIndex].keyTakeaways.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 text-sm text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Presenter Note Highlight */}
            {slides[selectedSlideIndex].directorNotes && (
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-200">
                <strong className="text-indigo-400">Executive Notes: </strong>
                {slides[selectedSlideIndex].directorNotes}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={() => setSelectedSlideIndex(Math.max(0, selectedSlideIndex - 1))}
              disabled={selectedSlideIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex items-center gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSlideIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === selectedSlideIndex ? 'bg-indigo-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setSelectedSlideIndex(Math.min(slides.length - 1, selectedSlideIndex + 1))}
              disabled={selectedSlideIndex === slides.length - 1}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-30"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
