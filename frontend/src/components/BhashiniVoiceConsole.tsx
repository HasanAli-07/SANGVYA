import React, { useState } from 'react';
import { Globe, Mic, Volume2, ArrowRightLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ScheduledLanguage } from '../types/lms';

interface BhashiniVoiceConsoleProps {
  selectedLanguage: ScheduledLanguage;
  onLanguageChange: (lang: ScheduledLanguage) => void;
}

export const BhashiniVoiceConsole: React.FC<BhashiniVoiceConsoleProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const [inputText, setInputText] = useState(
    'PACS Computerization & Common Accounting System (CAS) Day-Book Reconciliation'
  );
  const [translatedOutput, setTranslatedOutput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [asrResult, setAsrResult] = useState<string | null>(null);

  const languages: ScheduledLanguage[] = [
    'Hindi',
    'Marathi',
    'Kannada',
    'Tamil',
    'Telugu',
    'Gujarati',
    'Bengali',
    'Odia',
    'Punjabi',
    'Malayalam',
    'Assamese',
    'English',
  ];

  const localizedSampleMap: Record<string, string> = {
    Hindi: 'पैक्स संगणकीकरण और सामान्य लेखा प्रणाली (CAS) रोजकी समाधान',
    Marathi: 'पॅक्स संगणकीकरण आणि सामायिक लेखा प्रणाली खतावणी मेळ',
    Kannada: 'ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಪತ್ತಿನ ಸಹಕಾರ ಸಂಘಗಳ ಗಣಕೀಕರಣ ಮತ್ತು ಸಾಮಾನ್ಯ ಲೆಕ್ಕಪತ್ರ ವ್ಯವಸ್ಥೆ',
    Tamil: 'தொடக்க வேளாண்மை கூட்டுறவு சங்க கணினிமயமாக்கல் மற்றும் பொது கணக்கியல் முறைமை',
    Telugu: 'ప్రాధమిక వ్యవసాయ సహకార పరపతి సంఘాల కంప్యూటరీకరణ మరియు సామాన్య అకౌంటింగ్ విధానము',
    Gujarati: 'પેક્સ કમ્પ્યુટરાઇઝેશન અને સામાન્ય એકાઉન્ટિંગ સિસ્ટમ મેળવણી',
  };

  const handleTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      const out = localizedSampleMap[selectedLanguage] || `[Bhashini ULCA NMT (${selectedLanguage}) Output for: "${inputText}"]`;
      setTranslatedOutput(out);
    }, 600);
  };

  const handleSimulateAsr = () => {
    setIsListening(true);
    setAsrResult(null);
    setTimeout(() => {
      setIsListening(false);
      setAsrResult('पैक्स रोजकी में प्रविष्टि कैसे सुधारें? (How to edit entry in PACS day-book?)');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 3.2
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              MeitY Bhashini Universal Language Contribution (ULCA) Pipeline
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Provides Automated Neural Machine Translation (NMT), Speech Recognition (ASR), and Text-to-Speech (TTS) across 22 Scheduled Languages.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs px-3.5 py-2 rounded-xl">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-semibold">MeitY Bhashini API Active</span>
        </div>
      </div>

      {/* Language Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-white">Select Target Scheduled Language:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedLanguage === lang
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: NMT Translator & ASR Voice Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NMT Text Translator */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
              <span>Bhashini NMT Text Translation Pipeline</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">/pipeline/compute</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Source Text (English)</label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>

            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isTranslating ? 'Executing Bhashini NMT...' : `Translate to ${selectedLanguage}`}</span>
            </button>

            {translatedOutput && (
              <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40 space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Bhashini NMT Output ({selectedLanguage})
                </span>
                <p className="text-sm font-bold text-white leading-relaxed">{translatedOutput}</p>
              </div>
            )}
          </div>
        </div>

        {/* Spoken Indic ASR & TTS Voice Console */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Indic Speech Recognition (ASR) & TTS Narration</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">16kHz WAV Audio</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* ASR Voice Search Simulator */}
            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 text-center space-y-3">
              <p className="text-xs font-semibold text-slate-300">
                Spoken Voice Query Input (for low-literacy rural learners)
              </p>

              <button
                onClick={handleSimulateAsr}
                disabled={isListening}
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition shadow-lg ${
                  isListening
                    ? 'bg-rose-600 text-white animate-bounce ring-4 ring-rose-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <Mic className="w-6 h-6 fill-current" />
              </button>

              <p className="text-[11px] text-slate-400">
                {isListening ? 'Listening & Transcribing Indic Speech via Bhashini ASR...' : 'Click microphone to simulate spoken Indic voice query'}
              </p>
            </div>

            {asrResult && (
              <div className="bg-emerald-950/80 border border-emerald-800 p-3.5 rounded-xl text-xs space-y-1 text-emerald-200">
                <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ASR Transcription Result (Confidence: 96.8%)</span>
                </div>
                <p className="font-bold text-white text-sm">{asrResult}</p>
              </div>
            )}

            {/* TTS Narration Demo */}
            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-200 font-semibold">
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>Text-to-Speech (TTS) Lesson Audio Narration</span>
              </div>
              <button className="bg-slate-800 hover:bg-slate-750 text-indigo-300 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-700">
                Synthesize Voice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
