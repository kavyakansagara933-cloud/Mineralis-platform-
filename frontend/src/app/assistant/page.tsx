'use client';

import { useState } from 'react';
import { Send, Bot, ShieldCheck, Sparkles, CheckCircle2, Eye, HelpCircle } from 'lucide-react';
import { MiningAPI, AssistantResponse } from '@/lib/api';
import { EvidenceDrawer } from '@/components/evidence/EvidenceDrawer';
import { Evidence } from '@/types';

const SUGGESTED_PROMPTS = [
  "Which mines missed their production target in March 2025?",
  "What is the composite stripping ratio for OpenCast planning?",
  "What are the estimated proved coal reserves in Block IV?",
  "Compare production across Division A, Division B, and Division C."
];

export default function MiningAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; data?: AssistantResponse }>>([
    {
      role: 'assistant',
      text: 'Hello! I am your Mining & Geological Intelligence Assistant. Every response I provide includes verified mathematical formulas, exact document citations, page numbers, and confidence ratings.'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState<Evidence | null>(null);

  const handleSend = async (questionText: string) => {
    const q = questionText || input;
    if (!q.trim()) return;

    const userMsg = { role: 'user' as const, text: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await MiningAPI.askAssistant(q);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: res.answer,
        data: res
      }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Error processing question: ' + err.message
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      <div className="border-b border-[#1e293b] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
          <Bot className="w-6 h-6 text-amber-400" />
          <span>Verified Mining Intelligence Assistant</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1.5">
          Ask domain-specific questions across indexed reports, coal grades, stripping ratios, and boreholes with guaranteed zero hallucination.
        </p>
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-3">
        <p className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Recommended Domain Questions</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs p-4 bg-[#080d16] hover:bg-[#131d2e] border border-[#1e293b] hover:border-amber-500/50 rounded-xl text-zinc-300 transition text-left shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-7 md:p-8 rounded-2xl border transition ${
              msg.role === 'user'
                ? 'bg-[#0f172a] border-[#1e293b] ml-8 md:ml-16 text-zinc-100'
                : 'enterprise-card bg-[#080d16] border-[#1e293b] mr-4 md:mr-10'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono px-2.5 py-1 rounded font-bold uppercase ${
                msg.role === 'user' ? 'bg-zinc-800 text-zinc-200' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {msg.role === 'user' ? 'Data Officer' : 'Grounded AI Assistant'}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap">{msg.text}</p>

            {/* Mathematical Audit Badge */}
            {msg.data && msg.data.calculations && msg.data.calculations.length > 0 && (
              <div className="mt-5 p-4 bg-[#05080f] border border-[#1e293b] rounded-xl">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                  Verified Mathematical Formula:
                </span>
                <p className="font-mono text-xs text-emerald-300 mt-1 font-semibold">
                  {msg.data.calculations[0]}
                </p>
              </div>
            )}

            {/* Evidence Citation Cards */}
            {msg.data && msg.data.evidence && msg.data.evidence.length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#1e293b]">
                <h5 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
                  Traceable Evidence ({msg.data.evidence.length} Sources)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {msg.data.evidence.map((ev) => (
                    <div key={ev.id} className="p-4 bg-[#080d16] border border-[#1e293b] rounded-xl text-xs space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium text-amber-400 mb-1">
                        <span className="truncate max-w-[200px]">{ev.document_name} • P.{ev.page_number}</span>
                        <span className="font-mono text-xs text-emerald-400 font-bold">{ev.confidence}%</span>
                      </div>
                      <p className="text-zinc-400 italic text-xs line-clamp-2">"{ev.snippet}"</p>
                      <button
                        onClick={() => setActiveEvidence(ev)}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Full Evidence</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="p-6 enterprise-card rounded-xl text-xs text-amber-400 flex items-center gap-3">
            <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
            <span>Auditing document evidence and calculating formulas...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="enterprise-card p-4 md:p-5 rounded-xl flex gap-3 sticky bottom-6 z-10 shadow-2xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any question about production, reserves, seams, or target variances..."
          className="flex-1 bg-[#080d16] border border-[#1e293b] rounded-lg px-4 py-3 text-xs md:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/70 transition"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 transition shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>

      <EvidenceDrawer evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />
    </div>
  );
}
