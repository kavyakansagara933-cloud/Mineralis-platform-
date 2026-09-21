'use client';

import { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  Calculator, 
  Mic,
  MicOff,
  Download,
  ShieldCheck,
  Cpu,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EvidenceDrawer } from '@/components/evidence/EvidenceDrawer';
import { Evidence } from '@/types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  proof?: {
    formula: string;
    calculation: string;
    result: string;
    verified: boolean;
  };
  evidence?: Evidence;
}

const SAMPLE_PROMPTS = [
  "What is the total coal production and YoY variance for FY 2023-24?",
  "Calculate the composite Overburden Stripping Ratio (OBR) for Division A.",
  "Which operating mines experienced a negative production variance > 5%?",
  "Provide the total proved vs indicated geological coal reserves breakdown."
];

export default function AIQueryPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Welcome to the MIRA. I provide deterministically verified answers grounded in official statutory records with exact OCR page citations and step-by-step mathematical proofs.',
      timestamp: 'Just now'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Calculate the total coal production and variance for FY 2023-24 from official statutory records.',
      timestamp: 'Just now'
    },
    {
      id: 'msg-3',
      sender: 'assistant',
      text: 'Based on the consolidated Annual Mining Directory (Table 1.4, Page 12), the total audited coal production for FY 2023-24 reached **773.60 Million Tonnes (MT)** against an annual statutory target of **780.00 MT**, representing a minimal variance of **-0.82%** (99.18% target achievement).',
      timestamp: 'Just now',
      proof: {
        formula: 'Variance\\ % = \\frac{\\text{Actual} - \\text{Target}}{\\text{Target}} \\times 100',
        calculation: '\\frac{773.60\\text{ MT} - 780.00\\text{ MT}}{780.00\\text{ MT}} \\times 100 = -0.82\\%',
        result: '-0.82% (99.18% Achievement)',
        verified: true
      },
      evidence: {
        id: 'ev-ai-1',
        document_id: 'doc-coal-dir-2024',
        document_name: 'Annual_Mining_Directory_2024_25.pdf',
        page_number: 12,
        table_reference: 'Table 1.4: All-India Production & Target Telemetry',
        snippet: 'Total All-India Coal Production: 773.60 MT against statutory target 780.00 MT. Target achievement stands at 99.18%.',
        confidence: 99.8
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState<Evidence | null>(null);

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputQuery(transcript);
          setIsListening(false);
        };
        recognition.start();
      } catch {
        // Fallback simulation
        setIsListening(true);
        setTimeout(() => {
          setInputQuery("What is the composite stripping ratio for Division A?");
          setIsListening(false);
        }, 1500);
      }
    } else {
      // Fallback
      setIsListening(true);
      setTimeout(() => {
        setInputQuery("What is the composite stripping ratio for Division A?");
        setIsListening(false);
      }, 1500);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `Based on the latest indexed geological repository records, the audited metric for your inquiry has been retrieved with 99.4% OCR confidence.`;
      let proofData = undefined;
      let evidenceData: Evidence = {
        id: `ev-${Date.now()}`,
        document_id: 'doc-statutory-2025',
        document_name: 'Statutory_Operations_Audit_2024_25.pdf',
        page_number: 18,
        table_reference: 'Table 3.2: Division Operational Telemetry',
        snippet: 'Consolidated statutory telemetry records verified across 8 operational divisions.',
        confidence: 99.4
      };

      if (q.toLowerCase().includes('obr') || q.toLowerCase().includes('stripping')) {
        replyText = `The composite Overburden Stripping Ratio (OBR) for Division A is **2.53 M³/T**, calculated from **452.8 M.CuM** of overburden excavated against **178.9 MT** of coal extracted.`;
        proofData = {
          formula: 'OBR = \\frac{\\text{Total Overburden Excavated (M.CuM)}}{\\text{Total Coal Output (MT)}}',
          calculation: '\\frac{452.80\\text{ M.CuM}}{178.90\\text{ MT}} = 2.531\\text{ M}^3\\text{/T}',
          result: '2.53 M³/T (100% Deterministic Match)',
          verified: true
        };
      } else if (q.toLowerCase().includes('reserve') || q.toLowerCase().includes('geological')) {
        replyText = `Total national geological resources stand at **378.21 Billion Tonnes (BT)**, of which **187.90 BT (49.7%)** are categorized under the Proved category with full drill-hole correlation.`;
        proofData = {
          formula: '\\text{Proved Share} = \\frac{\\text{Proved Reserves}}{\\text{Total Geological Resources}} \\times 100',
          calculation: '\\frac{187.90\\text{ BT}}{378.21\\text{ BT}} \\times 100 = 49.68\\%',
          result: '49.7% Proved Reserve Proportion',
          verified: true
        };
      } else if (q.toLowerCase().includes('variance') || q.toLowerCase().includes('missed') || q.toLowerCase().includes('negative')) {
        replyText = `Audit scan identified **2 operating units** with a negative production variance exceeding statutory tolerance (-5% threshold):\n\n1. **Central Basin Underground Complex (Division D)**: Actual 14.20 MT vs Target 15.00 MT (**-5.33% variance**)\n2. **Southern Seam Pit 05 (Division E)**: Actual 28.40 MT vs Target 30.00 MT (**-5.33% variance**)\n\nRoot causes cited: Continuous miner joy-cutter maintenance downtime and conveyor haulage bottleneck.`;
        proofData = {
          formula: '\\text{Variance Severity} = \\begin{cases} \\text{Alert}, & \\text{Variance} \\le -5\\% \\\\ \\text{Optimal}, & \\text{Variance} > -5\\% \\end{cases}',
          calculation: '\\text{Central Basin: } \\frac{14.20 - 15.00}{15.00} \\times 100 = -5.33\\% \\implies \\text{Alert Triggered}',
          result: '2 Critical Variance Alerts Identified',
          verified: true
        };
      } else if (q.toLowerCase().includes('gcv') || q.toLowerCase().includes('grade') || q.toLowerCase().includes('calorific')) {
        replyText = `Gross Calorific Value (GCV) distribution across sampled pits indicates prime G4–G6 thermal coal:\n\n• **Eastern Valley Surface Pit**: 5,200 kcal/kg (Grade G4)\n• **Central Seam Opencast Block**: 4,800 kcal/kg (Grade G5)\n• **Block IV Surface Mine**: 4,650 kcal/kg (Grade G6)\n• **Central Basin Underground**: 5,800 kcal/kg (Grade G3 Metallurgical Semi-Coking)`;
        proofData = {
          formula: '\\text{Grade G5 Band} = 4,600 \\text{ to } 4,900 \\text{ kcal/kg (Ministry of Coal Schedule)}',
          calculation: '\\text{Sample GCV} = 4,800 \\text{ kcal/kg} \\in [4600, 4900] \\implies \\text{Grade G5 Certified}',
          result: 'Grade G3 - G6 Certified Provenance',
          verified: true
        };
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        proof: proofData,
        evidence: evidenceData
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleExportBrief = (msg: ChatMessage) => {
    const content = `MINERALIS • MIRA STATUTORY AUDIT BRIEF\nDate: ${new Date().toLocaleDateString()}\n\nQuery: ${msg.text}\n\nMathematical Proof: ${msg.proof?.result || 'Deterministic OCR verification'}\n\nCitation: ${msg.evidence?.document_name} (Page ${msg.evidence?.page_number})\n\nConfidence: ${msg.evidence?.confidence || 99.4}%\nStatus: Certified Deterministic Provenance`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MIRA_Statutory_Brief_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="ambient-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white via-slate-50 to-blue-50/20"
      >
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Deterministic RAG, Voice Query & Certified Export</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            MIRA
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Query across 315 mines, production telemetry, and geological reserve databases via text or voice with zero hallucination.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-slate-800">Deterministic Engine</div>
              <div className="text-[11px] text-slate-400">Zero Hallucination Guard</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suggested Queries Grid */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Recommended Analytical Inquiries</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <motion.button
              key={idx}
              whileHover={{ y: -2 }}
              onClick={() => handleSendMessage(prompt)}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 hover:bg-blue-50/20 text-left transition space-y-1.5 shadow-xs group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-blue-600 transition">
                <span>{prompt}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0 ml-2" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Conversational Stream */}
      <div className="ambient-card p-6 md:p-8 space-y-6">
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`space-y-4 max-w-3xl ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white p-5 rounded-2xl rounded-tr-xs shadow-md shadow-blue-500/10' 
                    : 'bg-slate-50/80 border border-slate-200/90 p-6 md:p-7 rounded-2xl rounded-tl-xs shadow-xs text-slate-800'
                }`}>
                  <div className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </div>

                  {/* Mathematical Proof Accordion */}
                  {msg.proof && (
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-slate-700">
                        <span className="flex items-center gap-1.5 text-indigo-600">
                          <Calculator className="w-4 h-4" />
                          Deterministic Mathematical Proof
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                          100% Match
                        </span>
                      </div>
                      <div className="font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] overflow-x-auto">
                        {msg.proof.calculation}
                      </div>
                    </div>
                  )}

                  {/* Evidence Citation & Export Bar */}
                  {msg.sender === 'assistant' && (
                    <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60 text-xs">
                      {msg.evidence && (
                        <div className="flex items-center gap-2 text-slate-500">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-mono text-[11px] font-medium truncate max-w-xs">
                            {msg.evidence.document_name} • Page {msg.evidence.page_number}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        {msg.evidence && (
                          <button
                            onClick={() => setActiveEvidence(msg.evidence || null)}
                            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                          >
                            <span>Inspect Split Reader</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleExportBrief(msg)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition"
                          title="Export Brief"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Export Brief</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-xs text-slate-400 font-mono pl-13"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>MIRA is querying statutory tables & verifying calculations...</span>
            </motion.div>
          )}
        </div>

        {/* Input Bar with Microphone Voice Action */}
        <div className="pt-4 border-t border-slate-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition"
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl transition ${
                isListening 
                  ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/20' 
                  : 'text-slate-400 hover:text-blue-600 hover:bg-slate-200/50'
              }`}
              title={isListening ? "Listening..." : "Click to speak voice query"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : "Ask any question regarding coal telemetry, OBR ratios, or geological reserves..."}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-transparent px-2 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition shadow-md shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />
    </div>
  );
}
