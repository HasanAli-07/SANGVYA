import React, { useState } from 'react';
import { Mic, X, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { SdsButton } from './ui/SdsButton';

interface SahkarVaniFloatingAssistantProps {
  selectedLanguage: string;
  onNavigateTab: (tabId: string) => void;
}

export const SahkarVaniFloatingAssistant: React.FC<SahkarVaniFloatingAssistantProps> = ({
  selectedLanguage,
  onNavigateTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [spokenResponse, setSpokenResponse] = useState<string | null>(null);

  const quickPrompts = [
    { label: 'PACS Accountant Course', query: 'PACS Accounting Course Kahan Hai?', targetTab: 'catalog' },
    { label: 'Verify Attendance', query: 'Mera Attendance Verify Karo', targetTab: 'face_kiosk' },
    { label: 'DigiLocker Certificate', query: 'Mera NCCT Certificate DigiLocker me dalo', targetTab: 'w3c_compiler' },
    { label: 'District PACS Jobs', query: 'Pune District PACS me kon se jobs hain?', targetTab: 'recruiter_portal' },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript(null);
    setSpokenResponse(null);

    setTimeout(() => {
      setIsListening(false);
      setTranscript(`"PACS Accounting Certificate aur Pune Jobs batao" (${selectedLanguage})`);
      setSpokenResponse('Sahkar Vani: PACS Accounting Course VAMNICOM Pune me uplabdh hai. Passing Score 75% hai. Certificate DigiLocker me export kar sakte hain.');
    }, 2000);
  };

  const handleSelectPrompt = (prompt: typeof quickPrompts[0]) => {
    setTranscript(`"${prompt.query}"`);
    setSpokenResponse(`Sahkar Vani: Navigating you to ${prompt.label}...`);
    setTimeout(() => {
      onNavigateTab(prompt.targetTab);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Voice Drawer Floating Sheet */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 rounded-3xl p-5 shadow-2xl space-y-4 text-xs animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-indigo-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">सहकार वाणी (Sahkar Vani)</h3>
                <p className="text-[10px] text-amber-300 font-mono">MeitY Bhashini AI • {selectedLanguage}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Listening Wave animation box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-3">
            {isListening ? (
              <div className="space-y-3 py-2">
                <div className="flex justify-center items-center space-x-1.5 h-8">
                  <span className="w-1.5 bg-amber-400 h-4 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 bg-amber-400 h-8 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 bg-indigo-500 h-6 rounded-full animate-bounce"></span>
                  <span className="w-1.5 bg-amber-400 h-8 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 bg-amber-400 h-4 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                </div>
                <p className="text-amber-300 font-semibold font-mono animate-pulse">
                  Listening in {selectedLanguage}... Speak your question
                </p>
              </div>
            ) : transcript ? (
              <div className="space-y-2 text-left">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-slate-300 font-mono text-[11px]">
                  {transcript}
                </div>
                {spokenResponse && (
                  <div className="bg-indigo-950/80 border border-indigo-800/60 p-3 rounded-xl space-y-1 text-indigo-200">
                    <div className="flex items-center space-x-1 text-amber-300 font-bold text-[10px]">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio Response Playing...</span>
                    </div>
                    <p className="text-xs leading-relaxed">{spokenResponse}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1 py-1">
                <p className="text-slate-300 font-medium">Tap mic to ask questions in your language</p>
                <p className="text-[10px] text-slate-500 font-mono">Bhashini ASR/TTS Engine Ready</p>
              </div>
            )}

            <button
              onClick={handleStartListening}
              disabled={isListening}
              className="w-full bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-xs"
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-spin' : ''}`} />
              <span>{isListening ? 'Listening...' : 'Tap to Speak (बोलिए)'}</span>
            </button>
          </div>

          {/* Quick Vernacular Suggestions */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Voice Suggestions:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectPrompt(p)}
                  className="bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-slate-300 hover:text-white p-2 rounded-xl text-left transition flex items-center justify-between group text-[11px]"
                >
                  <span className="truncate">{p.label}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-indigo-600 to-teal-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20 relative"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
        <Mic className="w-6 h-6" />
      </button>
    </div>
  );
};
