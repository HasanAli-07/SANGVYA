import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';

export const ChatbotGuardrails: React.FC = () => {
  const [testInput, setTestInput] = useState('My name is Ramesh Kumar, Aadhaar 9988-7766-5544, Phone +91 9876543210');
  const [maskedOutput, setMaskedOutput] = useState('');

  const handleTestPiiFilter = () => {
    // Mask 12-digit Aadhaar & Phone
    let masked = testInput.replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, 'XXXX-XXXX-XXXX');
    masked = masked.replace(/\b\+?91[-\s]?[6-9]\d{9}\b/g, '+91 XXXXX-XXXXX');
    setMaskedOutput(masked);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 5.4
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Conversational Safety, PII Guardrails & Statutory Disclaimers
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Enforces automatic PII masking (Aadhaar & phone numbers) and appends mandatory statutory disclosures on employment recommendations.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>PII Masking Active</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PII Masking Tester */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>PII Redaction & Privacy Filter Tester</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Test Input Text (Containing PII)</label>
              <textarea
                rows={3}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 font-mono"
              />
            </div>

            <button
              onClick={handleTestPiiFilter}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Run PII Masking Filter</span>
            </button>

            {maskedOutput && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Redacted Output (Safe for LLM Processing):
                </span>
                <p className="font-mono text-white leading-relaxed">{maskedOutput}</p>
              </div>
            )}
          </div>
        </div>

        {/* Statutory Disclaimer Configuration */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Statutory Employment Guarantee Disclaimer</span>
          </div>

          <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Mandatory Disclosure Notice:</span>
            </div>

            <p className="text-slate-300 leading-relaxed font-sans text-xs italic bg-slate-900 p-3 rounded-lg border border-slate-800">
              "Disclaimer: The NCCT AI Career Counseling Assistant provides guidance based on official cooperative regulations, Model Bye-Laws for PACS, and training catalogs. Career advice and training recommendations do not constitute a direct guarantee of employment or placement."
            </p>

            <span className="text-[11px] text-slate-400 block pt-1 font-mono">
              Auto-appended to 100% of generated conversational responses.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
